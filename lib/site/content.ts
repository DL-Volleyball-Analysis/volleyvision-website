// All copy and claims for the page. Every number carries its source and what kind of evidence
// it is; a claim without a source does not type-check. Copy states what exists today and marks
// the rest with its milestone.

export type Lang = 'en' | 'zh'
export type T = Record<Lang, string>

export const ORG = 'https://github.com/DL-Volleyball-Analysis'
export const CORE_REPO = `${ORG}/volleyball-analysis`
export const WEBAPP_REPO = `${CORE_REPO}/tree/main/webapp`
export const REPORT_REPO = `${ORG}/capstone-report`
export const UPSTREAM_BALL = 'https://github.com/asigatchov/fast-volleyball-tracking-inference'

export type Claim = {
  value: string
  label: T
  /** labelled: measured against labels; proxy: no labels; benchmark: someone else's published number */
  kind: 'labelled' | 'proxy' | 'benchmark'
  source: { href: string; text: T }
}

export const CLAIMS: Claim[] = [
  {
    value: '2.7×',
    label: {
      en: 'fewer false ball jumps after switching to VballNet V4c (8.37 → 3.08 per 100 frames, 5 broadcast clips)',
      zh: '換成 VballNet V4c 後，球軌跡的假跳點減少（每百幀 8.37 → 3.08，5 段轉播片段）',
    },
    kind: 'proxy',
    source: { href: `${CORE_REPO}/blob/main/docs/results/ball-tracking.md`, text: { en: 'ball-tracking results', zh: '球追蹤結果' } },
  },
  {
    value: '0.902',
    label: {
      en: 'F1 of the VballNet V4c ball detector on its authors’ test set',
      zh: 'VballNet V4c 球偵測模型在原作者測試集上的 F1',
    },
    kind: 'benchmark',
    source: { href: UPSTREAM_BALL, text: { en: 'upstream benchmark', zh: '上游公開基準' } },
  },
  {
    value: '0.49 m',
    label: {
      en: 'median court position error on held-out labelled images, court model v2 (target 0.3 m; v3 training)',
      zh: '場地模型 v2 在未參與訓練的標註影像上，場地座標誤差中位數（目標 0.3 m；v3 訓練中）',
    },
    kind: 'labelled',
    source: { href: `${CORE_REPO}/blob/main/docs/results/court-keypoints.md`, text: { en: 'court model results', zh: '場地模型結果' } },
  },
]

export const KIND: Record<Claim['kind'], T> = {
  labelled: { en: 'measured on labels', zh: '標註資料量測' },
  proxy: { en: 'no labels: a proxy', zh: '無標註：代理指標' },
  benchmark: { en: 'published benchmark', zh: '公開基準' },
}

export type Status = 'works' | 'building' | 'planned'
export const STATUS: Record<Status, T> = {
  works: { en: 'Works today', zh: '已可使用' },
  building: { en: 'In progress', zh: '進行中' },
  planned: { en: 'Planned', zh: '規劃中' },
}

export const PIPELINE: { name: T; what: T; status: Status }[] = [
  {
    name: { en: 'Read the video', zh: '讀取影片' },
    what: { en: 'Metadata and camera cuts, so each shot gets its own court.', zh: '影片資訊與鏡頭切換，每個鏡頭各自對應場地。' },
    status: 'works',
  },
  {
    name: { en: 'Find the court', zh: '找出場地' },
    what: {
      en: '14 keypoints, including the net band, mapped to court metres. Any camera angle is the goal; accuracy is still being improved.',
      zh: '偵測 14 個關鍵點（含網子上下緣），換算成場地公尺座標。目標是任何角度都能用，準確度仍在改善。',
    },
    status: 'building',
  },
  {
    name: { en: 'Track the ball', zh: '追蹤球' },
    what: { en: 'VballNet V4c on every frame; misses stay misses, never invented.', zh: '每一幀都用 VballNet V4c 偵測；沒偵測到就標示缺失，不補假值。' },
    status: 'works',
  },
  {
    name: { en: 'Track the players', zh: '追蹤球員' },
    what: { en: 'Detection and tracking measured on labelled volleyball sequences before any training.', zh: '先在有標註的排球序列上量測現成模型，不夠好才訓練。' },
    status: 'planned',
  },
  {
    name: { en: '3D ball path', zh: '3D 球軌跡' },
    what: {
      en: 'One camera, calibrated from the court and net; each flight fitted to physics, with its error shown.',
      zh: '單機位，用場地和網子校正攝影機；每段飛行用物理模型擬合，並顯示誤差。',
    },
    status: 'planned',
  },
  {
    name: { en: 'Rallies and score', zh: '回合與比分' },
    what: {
      en: 'Landing, in or out, who won the point. Unsure calls are flagged for a one-key correction.',
      zh: '落點、界內外、誰得分。不確定的判斷會標出來，按一個鍵就能修正。',
    },
    status: 'planned',
  },
]

export const APP_FEATURES: { name: T; what: T }[] = [
  {
    name: { en: 'Live analysis progress', zh: '即時分析進度' },
    what: { en: 'Drop a match in; each stage reports as it runs.', zh: '把比賽影片拖進來，每個分析階段的進度即時更新。' },
  },
  {
    name: { en: 'An editor for a match', zh: '像剪輯軟體一樣看比賽' },
    what: {
      en: 'Video with the ball trail, a rally inspector, and lanes for rallies, ball, landings and review.',
      zh: '影片疊上球軌跡、回合屬性面板，以及回合、球、落點、待檢查四條分軌。',
    },
  },
  {
    name: { en: 'Review with the keyboard', zh: '用鍵盤檢查整場' },
    what: { en: 'J / K between rallies, 1 / 2 to set the winner. Corrections become labels for measuring accuracy.', zh: 'J / K 切換回合，1 / 2 指定得分方。修正紀錄會成為評估準確率的標註。' },
  },
  {
    name: { en: 'Honest status', zh: '誠實的狀態' },
    what: { en: 'Every stage says whether it ran, is unavailable, or is not built yet. Demo data is always labelled.', zh: '每個階段都會說明是否完成、尚未就緒或尚未實作；示範資料一定會標示。' },
  },
]

export const COPY = {
  nav: { how: { en: 'How it works', zh: '運作方式' }, research: { en: 'Research', zh: '研究' }, code: { en: 'Code', zh: '程式碼' } },
  hero: {
    title: { en: 'Volleyball, point by point.', zh: '排球，一分一分看清楚。' },
    sub: {
      en: 'One camera’s recording of a match becomes a record you can review: the ball’s path, the court, every rally and the score.',
      zh: '把一台攝影機錄下的比賽，變成可以逐分檢討的紀錄：球的路徑、場地、每一個回合與比分。',
    },
    status: {
      en: 'Work in progress. Ball tracking and the review app work today; court detection, scoring and 3D trajectories are being built.',
      zh: '開發中。球追蹤與比賽回顧介面已可使用；場地偵測、自動計分與 3D 軌跡正在進行。',
    },
    primary: { en: 'Read the research', zh: '看研究內容' },
    secondary: { en: 'View the code', zh: '看程式碼' },
    caption: {
      en: 'An illustration of the match review app with synthetic data — press play, click a rally, drag the timeline.',
      zh: '比賽回顧介面的示意圖，資料為合成 — 按播放、點選回合、拖曳時間軸試試看。',
    },
  },
  numbers: {
    title: { en: 'Numbers, with where they come from', zh: '每個數字都附上出處' },
    sub: {
      en: 'Only numbers with a source. Proxies are named as proxies; a metric without labelled data is not shown.',
      zh: '只列有來源的數字。代理指標會標明；沒有標註資料的指標不列出。',
    },
  },
  how: {
    title: { en: 'How a match is analysed', zh: '一場比賽怎麼被分析' },
    sub: { en: 'A staged pipeline: a new model reruns only the stages after it.', zh: '分階段的分析流程：換了某個模型，只需要重跑它之後的階段。' },
  },
  app: { title: { en: 'The review app', zh: '比賽回顧介面' } },
  research: {
    title: { en: 'Research', zh: '研究' },
    items: [
      {
        name: { en: 'Single-camera 3D ball trajectory', zh: '單機位 3D 球軌跡' },
        what: {
          en: 'The court keypoints include the net band, which calibrates the camera fully. Between touches the ball follows a ballistic arc, so one camera’s rays plus gravity fix where the ball is in 3D — with an error per flight, and flights the camera cannot resolve marked as such.',
          zh: '場地關鍵點包含網子上下緣，可以完整校正攝影機。兩次觸球之間球走拋物線，所以一台攝影機的視線加上重力，就能定出球的 3D 位置；每段飛行都附上誤差，攝影機無法判斷深度的段落會標示出來。',
        },
      },
      {
        name: { en: 'Landing calls from one camera', zh: '單機位判斷落地' },
        what: {
          en: 'Tennis and professional volleyball use 10-19 synchronised cameras. With one, the plan combines the 3D fit, learned event spotting and the sound of the bounce, and reports uncertainty near the lines.',
          zh: '網球與職業排球使用 10 到 19 台同步攝影機。只有一台時，計畫結合 3D 擬合、學習式事件偵測與落地的聲音，並在邊線附近回報不確定度。',
        },
      },
      {
        name: { en: 'Measured, not claimed', zh: '量測，而不是宣稱' },
        what: {
          en: 'Each component is scored on labelled data with standard metrics (court error in metres; HOTA / IDF1 for players; F1 for the ball). Results live next to the code.',
          zh: '每個元件都在標註資料上用標準指標評分（場地誤差用公尺；球員用 HOTA / IDF1；球用 F1），結果與程式碼放在一起。',
        },
      },
    ],
    links: {
      en: 'Product requirements, behaviour specifications and results are in the repository.',
      zh: '產品需求、行為規格與量測結果都在 repository 中。',
    },
  },
  team: {
    title: { en: 'Team', zh: '團隊' },
    body: {
      en: 'Started as a senior capstone at National Taiwan Ocean University, Department of Computer Science and Engineering: Liang Yu-Jia (lead), Tsai Pei-Ying, Chung Chia-Hsin; advisor Professor Ting Pei-Yi. The current rebuild is by Liang Yu-Jia.',
      zh: '源自國立臺灣海洋大學資訊工程學系專題：梁祐嘉（組長）、蔡佩穎、鍾佳芯；指導教授丁培毅。目前的重建由梁祐嘉進行。',
    },
    report: { en: 'Capstone report', zh: '專題報告' },
  },
  footer: { en: 'Code under MIT. Court keypoint data from Roboflow Universe (CC BY 4.0).', zh: '程式碼採 MIT 授權。場地關鍵點資料來自 Roboflow Universe（CC BY 4.0）。' },
} satisfies Record<string, unknown>
