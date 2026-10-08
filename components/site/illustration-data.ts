// Synthetic rallies for the hero illustration. Nothing here was measured: positions are in court
// metres (x along the 18 m length, net at x = 9; y across the 9 m width; z up), times in seconds.

export type Team = 'A' | 'B'
export type Flight = { t0: number; t1: number; from: [number, number, number]; to: [number, number, number]; apex: number }
export type Rally = {
  start: number
  end: number
  winner: Team
  reason: 'Landed in' | 'Out' | 'Net' | 'Fault'
  confidence: number
  landing: [number, number] | null
  flights: Flight[]
}

/** A rally as serve → pass → set → attack (or a shorter variant), with the last flight's end as landing. */
function rally(start: number, serveFromA: boolean, attackTo: [number, number], winner: Team,
               reason: Rally['reason'], confidence: number): Rally {
  const s = serveFromA ? 1 : -1 // A serves from x = -1 towards x = 18
  const sx = serveFromA ? -1 : 19
  const recv: [number, number, number] = [9 + s * 4.5, 4.5, 0.8]
  const set: [number, number, number] = [9 + s * 1.2, 5.5, 2.4]
  const hit: [number, number, number] = [9 + s * 1.0, 3.0, 3.1]
  const land: [number, number, number] = [attackTo[0], attackTo[1], 0]
  const flights: Flight[] = [
    { t0: start, t1: start + 1.6, from: [sx, 2.5, 2.6], to: recv, apex: 4.6 },
    { t0: start + 1.6, t1: start + 3.0, from: recv, to: set, apex: 5.2 },
    { t0: start + 3.0, t1: start + 4.1, from: set, to: hit, apex: 4.4 },
    { t0: start + 4.1, t1: start + 4.9, from: hit, to: land, apex: 3.1 },
  ]
  return {
    start, end: start + 5.6, winner, reason, confidence,
    landing: reason === 'Landed in' || reason === 'Out' ? [land[0], land[1]] : null,
    flights: reason === 'Net' ? flights.slice(0, 3) : flights,
  }
}

export const RALLIES: Rally[] = [
  rally(1, true, [15.5, 7.2], 'A', 'Landed in', 0.91),
  rally(10, true, [14.0, 1.4], 'A', 'Landed in', 0.86),
  rally(19, true, [19.2, 4.0], 'B', 'Out', 0.74),
  rally(28, false, [2.6, 6.8], 'B', 'Landed in', 0.88),
  rally(37, false, [4.2, 0.6], 'B', 'Landed in', 0.52),
  rally(46, false, [9, 4.5], 'A', 'Net', 0.81),
  rally(55, true, [16.8, 8.6], 'A', 'Landed in', 0.93),
  rally(64, true, [12.4, 9.6], 'B', 'Out', 0.47),
]
export const DURATION = 72

/** Score after each rally (one set, so no set logic). */
export function scoreAfter(i: number): { a: number; b: number } {
  let a = 0
  let b = 0
  for (let k = 0; k <= i; k++) RALLIES[k].winner === 'A' ? a++ : b++
  return { a, b }
}

/** Ball position at time t (court metres), or null between flights. Height follows a parabola
 *  through the endpoints with the given apex, the shape a ball takes between touches. */
export function ballAt(t: number): [number, number, number] | null {
  for (const r of RALLIES) {
    for (const f of r.flights) {
      if (t >= f.t0 && t <= f.t1) {
        const u = (t - f.t0) / (f.t1 - f.t0)
        const x = f.from[0] + u * (f.to[0] - f.from[0])
        const y = f.from[1] + u * (f.to[1] - f.from[1])
        const base = f.from[2] + u * (f.to[2] - f.from[2])
        const peak = Math.max(0, f.apex - Math.max(f.from[2], f.to[2]))
        return [x, y, base + 4 * peak * u * (1 - u)]
      }
    }
  }
  return null
}

export function rallyIndexAt(t: number): number {
  let idx = -1
  RALLIES.forEach((r, i) => { if (r.start <= t) idx = i })
  return idx
}

/** Pinhole camera high behind one end line, like a broadcast end camera, drawn into 640 × 360.
 *  Framed so the court fills the lower half and the highest sets (≈ 5 m) stay inside the frame. */
const C = [-10, 4.5, 7]
const T = [9, 4.5, 0.8]
const F = 520
const W = 640
const H = 360
const sub = (p: number[], q: number[]) => p.map((v, i) => v - q[i])
const dot = (p: number[], q: number[]) => p.reduce((s, v, i) => s + v * q[i], 0)
const norm = (p: number[]) => { const l = Math.hypot(...p); return p.map((v) => v / l) }
const cross = (p: number[], q: number[]) => [p[1] * q[2] - p[2] * q[1], p[2] * q[0] - p[0] * q[2], p[0] * q[1] - p[1] * q[0]]
const FWD = norm(sub(T, C))
const RIGHT = norm(cross(FWD, [0, 0, 1]))
const UP = cross(RIGHT, FWD)

export function project(p: [number, number, number]): [number, number] {
  const d = sub(p, C)
  const z = dot(d, FWD)
  return [W / 2 + (F * dot(d, RIGHT)) / z, H / 2 - (F * dot(d, UP)) / z]
}

export const VIEW = { width: W, height: H }
