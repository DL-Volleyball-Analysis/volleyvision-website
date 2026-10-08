'use client'

// A working drawing of the match review app (synthetic data): camera view with the ball and its
// floor shadow, a rally inspector, and timeline lanes. Visitors who prefer reduced motion get a
// still frame; nothing plays on its own.
import { useEffect, useRef, useState, type PointerEvent } from 'react'
import { DURATION, RALLIES, VIEW, ballAt, project, rallyIndexAt, scoreAfter } from './illustration-data'

const COURT_LINES: [number, number, number, number][] = [
  [0, 0, 18, 0], [0, 9, 18, 9], [0, 0, 0, 9], [18, 0, 18, 9], [6, 0, 6, 9], [12, 0, 12, 9],
]

const fmt = (t: number) => `${Math.floor(t / 60)}:${(t % 60).toFixed(1).padStart(4, '0')}`
const pct = (t: number) => `${(100 * t) / DURATION}%`

function polyline(points: [number, number][]): string {
  return points.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(' ')
}

function CameraView({ t }: { t: number }) {
  const ball = ballAt(t)
  // the last 0.6 s of flight, like the app's ball trail
  const trail: [number, number][] = []
  for (let k = 12; k >= 0; k--) {
    const p = ballAt(t - k * 0.05)
    if (p) trail.push(project(p))
  }
  const line = (a: [number, number, number], b: [number, number, number]) => {
    const [p, q] = [project(a), project(b)]
    return `M${p[0]},${p[1]}L${q[0]},${q[1]}`
  }
  return (
    <svg viewBox={`0 0 ${VIEW.width} ${VIEW.height}`} className="mi-view" role="img" aria-label="Drawing of a court with the ball's path">
      <rect width={VIEW.width} height={VIEW.height} className="mi-floor" />
      <path className="mi-court" d={`M${polyline([project([0, 0, 0]), project([18, 0, 0]), project([18, 9, 0]), project([0, 9, 0])])}Z`} />
      {COURT_LINES.map(([x1, y1, x2, y2]) => (
        <path key={`${x1}${y1}${x2}${y2}`} className="mi-line" d={line([x1, y1, 0], [x2, y2, 0])} />
      ))}
      {/* net: posts and the top and bottom band */}
      <path className="mi-net" d={`${line([9, -0.5, 0], [9, -0.5, 2.43])}${line([9, 9.5, 0], [9, 9.5, 2.43])}`} />
      <path className="mi-net-band" d={`${line([9, -0.5, 2.43], [9, 9.5, 2.43])}${line([9, -0.5, 1.43], [9, 9.5, 1.43])}`} />
      {trail.length > 1 && <polyline className="mi-trail" points={polyline(trail)} />}
      {ball && (
        <>
          <line className="mi-drop" x1={project(ball)[0]} y1={project(ball)[1]} x2={project([ball[0], ball[1], 0])[0]} y2={project([ball[0], ball[1], 0])[1]} />
          <circle className="mi-shadow" cx={project([ball[0], ball[1], 0])[0]} cy={project([ball[0], ball[1], 0])[1]} r={3} />
          <circle className="mi-ball" cx={project(ball)[0]} cy={project(ball)[1]} r={5.5} />
        </>
      )}
    </svg>
  )
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mi-row">
      <dt>{label}</dt>
      <dd>{children}</dd>
    </div>
  )
}

export function MatchIllustration() {
  const [t, setT] = useState(3.2)
  const [playing, setPlaying] = useState(false)
  const [still, setStill] = useState(false)
  const track = useRef<HTMLDivElement>(null)
  const dragging = useRef(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setStill(mq.matches)
    const on = () => setStill(mq.matches)
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])

  useEffect(() => {
    if (!playing || still) return
    let frame = 0
    let last = performance.now()
    const tick = (now: number) => {
      setT((v) => (v + (now - last) / 1000) % DURATION)
      last = now
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [playing, still])

  const i = rallyIndexAt(t)
  const r = RALLIES[i]
  const score = i >= 0 ? scoreAfter(i) : { a: 0, b: 0 }
  const seek = (e: PointerEvent) => {
    const box = track.current?.getBoundingClientRect()
    if (box?.width) setT(Math.min(DURATION, Math.max(0, ((e.clientX - box.left) / box.width) * DURATION)))
  }

  return (
    <div className="mi-window">
      <div className="mi-titlebar">
        <span className="mono">final_set3.mp4</span>
        <span className="mi-score" aria-label={`Score ${score.a} to ${score.b}`}>
          <span className="team-a">A</span> {score.a} – {score.b} <span className="team-b">B</span>
        </span>
      </div>
      <div className="mi-body">
        <div className="mi-stage">
          <CameraView t={t} />
          <div className="mi-transport">
            <button type="button" onClick={() => setPlaying((p) => !p)} disabled={still} aria-label={playing ? 'Pause' : 'Play'}>
              {playing ? '❚❚' : '▶'}
            </button>
            <span className="mono">{fmt(t)} / {fmt(DURATION)}</span>
            {still && <span className="mi-note">Reduced motion: still frame</span>}
          </div>
        </div>
        <dl className="mi-inspector">
          {r ? (
            <>
              <Row label="Rally"><span>{i + 1} of {RALLIES.length}</span></Row>
              <Row label="Time"><span className="mono">{fmt(r.start)} – {fmt(r.end)}</span></Row>
              <Row label="Winner"><span className={r.winner === 'A' ? 'team-a' : 'team-b'}>{r.winner}</span></Row>
              <Row label="End">{r.reason}</Row>
              <Row label="Confidence">
                <span className={r.confidence < 0.6 ? 'review' : undefined}>
                  {Math.round(r.confidence * 100)}%{r.confidence < 0.6 && ' ▲ check'}
                </span>
              </Row>
              <Row label="Landing">
                {r.landing ? <span className="mono">x {r.landing[0].toFixed(1)} m, y {r.landing[1].toFixed(1)} m</span> : '–'}
              </Row>
            </>
          ) : (
            <p className="mi-empty">Before the first rally.</p>
          )}
        </dl>
      </div>
      <div className="mi-lanes" aria-label="Timeline">
        <div className="mi-gutter">
          <span>Rallies</span><span>Ball</span><span>Landings</span><span>Review</span>
        </div>
        <div
          ref={track}
          className="mi-track"
          onPointerDown={(e) => {
            if ((e.target as HTMLElement).closest('button')) return
            dragging.current = true
            e.currentTarget.setPointerCapture?.(e.pointerId)
            seek(e)
          }}
          onPointerMove={(e) => dragging.current && seek(e)}
          onPointerUp={() => { dragging.current = false }}
        >
          <div className="mi-lane">
            {RALLIES.map((ra, k) => (
              <button
                key={ra.start}
                type="button"
                className={`mi-rally ${ra.winner === 'A' ? 'a' : 'b'}${k === i ? ' current' : ''}`}
                style={{ left: pct(ra.start), width: pct(ra.end - ra.start) }}
                onClick={() => setT(ra.start)}
                aria-label={`Rally ${k + 1}, won by ${ra.winner}`}
              />
            ))}
          </div>
          <div className="mi-lane">
            {RALLIES.flatMap((ra) => ra.flights).map((f) => (
              <span key={f.t0} className="mi-ball-seg" style={{ left: pct(f.t0), width: pct(f.t1 - f.t0) }} />
            ))}
          </div>
          <div className="mi-lane">
            {RALLIES.filter((ra) => ra.landing).map((ra) => {
              const [x, y] = ra.landing!
              const inside = x >= 0 && x <= 18 && y >= 0 && y <= 9
              return <span key={ra.start} className="mi-mark landing" style={{ left: pct(ra.end - 0.7) }}>{inside ? '●' : '×'}</span>
            })}
          </div>
          <div className="mi-lane">
            {RALLIES.filter((ra) => ra.confidence < 0.6).map((ra) => (
              <span key={ra.start} className="mi-mark review" style={{ left: pct((ra.start + ra.end) / 2) }}>▲</span>
            ))}
          </div>
          <span className="mi-playhead" style={{ left: pct(t) }} aria-hidden />
        </div>
      </div>
    </div>
  )
}
