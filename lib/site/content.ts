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
  /** labelled: measured against labels; proxy: no labels; synthetic: simulated data with known truth;
   * benchmark: someone else's published number */
  kind: 'labelled' | 'proxy' | 'synthetic' | 'benchmark'
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
      en: 'median court position error on held-out labelled images, court model v2 (target 0.3 m; v3b training)',
      zh: '場地模型 v2 在未參與訓練的標註影像上，場地座標誤差中位數（目標 0.3 m；v3b 訓練中）',
    },
    kind: 'labelled',
    source: { href: `${CORE_REPO}/blob/main/docs/results/court-keypoints.md`, text: { en: 'court model results', zh: '場地模型結果' } },
  },
  {
    value: '0.484',
    label: {
      en: 'IDF1 of player tracking (YOLO26s + BoT-SORT, on-court filter) on SportsMOT volleyball (target 0.70)',
      zh: '球員追蹤（YOLO26s + BoT-SORT，過濾場外人員）在 SportsMOT 排球序列上的 IDF1（目標 0.70）',
    },
    kind: 'labelled',
    source: { href: `${CORE_REPO}/blob/main/docs/results/player-tracking.md`, text: { en: 'player tracking results', zh: '球員追蹤結果' } },
  },
  {
    value: '0.05 m',
    label: {
      en: 'median 3D error of a fitted serve from one camera, on synthetic rallies with 2 px noise; spikes are flagged low quality',
      zh: '單機位擬合發球的 3D 誤差中位數（合成回合、2 像素雜訊）；扣球會標示為低品質',
    },
    kind: 'synthetic',
    source: { href: `${CORE_REPO}/blob/main/docs/results/trajectory.md`, text: { en: '3D trajectory results', zh: '3D 軌跡結果' } },
  },
  {
    value: '0.957',
    label: {
      en: 'mAP@0.5 of the capstone action recogniser on its test split; test frames come from the same matches as training',
      zh: '專題的動作辨識模型在測試集上的 mAP@0.5；測試集與訓練集來自同一批比賽',
    },
    kind: 'labelled',
    source: { href: `${CORE_REPO}/blob/main/docs/results/actions.md`, text: { en: 'action results', zh: '動作辨識結果' } },
  },
]

export const KIND: Record<Claim['kind'], T> = {
  labelled: { en: 'measured on labels', zh: '標註資料量測' },
  proxy: { en: 'no labels: a proxy', zh: '無標註：代理指標' },
  synthetic: { en: 'synthetic data', zh: '合成資料' },
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
      en: '14 keypoints, including the net band, mapped to court metres per camera shot. A floor–net consistency check flags doubtful courts, which later stages do not use. Accuracy is still being improved.',
      zh: '偵測 14 個關鍵點（含網子上下緣），逐鏡頭換算成場地公尺座標。地面與網子關鍵點不一致的場地會被標為可疑，後續階段不採用。準確度仍在改善。',
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
    what: {
      en: 'YOLO26s + BoT-SORT, placed in court metres; people off court are dropped. Labels are tracking ids, not shirt numbers yet.',
      zh: 'YOLO26s + BoT-SORT，換算成場地公尺座標，並過濾場外人員。目前標示的是追蹤編號，還不是背號。',
    },
    status: 'works',
  },
  {
    name: { en: 'Actions and shirt numbers', zh: '球員動作與背號' },
    what: {
      en: 'Serve, receive, set, spike and block per player, and shirt numbers read from the jersey, turned into suggested tags.',
      zh: '辨識每位球員的發球、接球、舉球、扣球、攔網，並讀出背號，轉成建議標記。',
    },
    status: 'planned',
  },
  {
    name: { en: '3D ball path', zh: '3D 球軌跡' },
    what: {
      en: 'One camera, calibrated from the court and net; each flight fitted to physics, with its error shown and impossible fits dropped. Waits for a more accurate court model on real footage.',
      zh: '單機位，用場地和網子校正攝影機；每段飛行用物理模型擬合，顯示誤差並剔除不合物理的結果。真實影片上還在等更準的場地模型。',
    },
    status: 'building',
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
    name: { en: 'Tactics board', zh: '戰術板' },
    what: { en: 'Each rally’s ball flights on a 2D court and in 3D, with low-quality and unseen parts drawn as such.', zh: '每個回合的球飛行畫在 2D 場地與 3D 視角上，低品質與攝影機看不到的段落會另外標示。' },
  },
  {
    name: { en: 'Player statistics', zh: '球員統計' },
    what: { en: 'Attack and serve tags become attack efficiency, kill rate, aces and serve errors per player, exported as CSV.', zh: '攻擊與發球標記換算成每位球員的攻擊效率、得分率、發球得分與失誤，可匯出 CSV。' },
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
      en: 'Work in progress. Ball tracking, player tracking and the review app work today; court detection is being improved; 3D trajectories, actions and scoring are being built.',
      zh: '開發中。球追蹤、球員追蹤與比賽回顧介面已可使用；場地偵測持續改善中；3D 軌跡、動作辨識與自動計分正在進行。',
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
  output: {
    title: { en: 'What it produces today', zh: '目前實際的分析結果' },
    sub: {
      en: 'Real output, not a drawing: a 6 s broadcast clip analysed end to end, and the review app.',
      zh: '這是真實輸出，不是示意圖：一段 6 秒的轉播片段完整分析的結果，以及比賽回顧介面。',
    },
    video: {
      en: 'Ball trail (VballNet), player tracks (YOLO26s + BoT-SORT; labels are tracking ids), court lines from the keypoint model, and players on a top-down court map. Footage: Volleyball World broadcast, for research only.',
      zh: '球的軌跡（VballNet）、球員追蹤（YOLO26s + BoT-SORT；標示為追蹤編號）、關鍵點模型找到的場地線，以及右下角俯視場地圖上的球員位置。畫面來源：Volleyball World 轉播，僅供研究。',
    },
    app: {
      en: 'Match review with overlays, rally list and timeline lanes. Rallies here are demo data until rally detection lands.',
      zh: '比賽回顧：影片疊加、回合清單與時間軸分軌。回合偵測完成前，此處的回合為示範資料。',
    },
    boards: {
      en: '2D and 3D tactics board (demo flights) and player statistics from coach tags.',
      zh: '2D／3D 戰術板（示範飛行）與教練標記產生的球員統計。',
    },
  },
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
        name: { en: 'Every number has a measurement behind it', zh: '每個數字都有量測依據' },
        what: {
          en: 'Each component is scored with standard metrics (court error in metres; HOTA / IDF1 for players; mAP for actions; F1 for the ball). Results and the scripts that produce them live next to the code, and corrections are published when an earlier number turns out wrong.',
          zh: '每個元件都用標準指標評分（場地誤差用公尺；球員用 HOTA / IDF1；動作用 mAP；球用 F1）。結果與產生它的程式放在一起；發現先前的數字有誤時，也會公開更正。',
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
    archive: { en: 'Capstone repositories (archived)', zh: '專題時期的 repository（已封存）' },
  },
  footer: { en: 'Code under MIT. Court keypoint data from Roboflow Universe (CC BY 4.0).', zh: '程式碼採 MIT 授權。場地關鍵點資料來自 Roboflow Universe（CC BY 4.0）。' },
} satisfies Record<string, unknown>
