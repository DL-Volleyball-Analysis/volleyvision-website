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
    value: '0.10 m',
    label: {
      en: 'median court-position error on held-out broadcast clips (96% within 0.3 m); 0.49 m on held-out gym images',
      zh: '未參與訓練的轉播片段上，場地座標誤差中位數（96% 在 0.3 m 內）；體育館影像上為 0.49 m',
    },
    kind: 'labelled',
    source: { href: `${CORE_REPO}/blob/main/docs/results/court-keypoints.md`, text: { en: 'court results', zh: '場地結果' } },
  },
  {
    value: '6 / 6',
    label: {
      en: 'arenas where the court fitted to the painted lines of a fixed end-line camera is right (by eye; both keypoint models fail on this view)',
      zh: '端線後方固定鏡頭以地面白線配對場地，6 座球館都正確（肉眼判斷；兩個關鍵點模型在這種視角都失敗）',
    },
    kind: 'proxy',
    source: { href: `${CORE_REPO}/blob/main/docs/results/court-keypoints.md`, text: { en: 'court results', zh: '場地結果' } },
  },
  {
    value: '0.690',
    label: {
      en: 'IDF1 of player tracking on SportsMOT volleyball, with a detector fine-tuned to box players only (precision 0.970: no referees or spectators)',
      zh: '球員追蹤在 SportsMOT 排球序列上的 IDF1；偵測器微調為只框場上球員（精確度 0.970，不框裁判與觀眾）',
    },
    kind: 'labelled',
    source: { href: `${CORE_REPO}/blob/main/docs/results/player-tracking.md`, text: { en: 'player tracking results', zh: '球員追蹤結果' } },
  },
  {
    value: '0.946',
    label: {
      en: 'ball detection F1 (10 px) of WASB fine-tuned on gym footage, on held-out gym matches; VballNet V4c, in the pipeline today, scores 0.859',
      zh: '以體育館影片微調的 WASB 在保留的體育館比賽上的球偵測 F1（10 像素）；目前流程使用的 VballNet V4c 為 0.859',
    },
    kind: 'labelled',
    source: { href: `${CORE_REPO}/blob/main/docs/results/ball-tracking.md`, text: { en: 'ball results', zh: '球偵測結果' } },
  },
  {
    value: '0.678',
    label: {
      en: 'macro F1 of block / receive / set / spike per player on 16 unseen matches of the Volleyball dataset (the capstone detector: 0.303)',
      zh: '在 Volleyball 資料集 16 場未見過的比賽上，每位球員的攔網／接球／舉球／扣球 macro F1（專題的偵測器為 0.303）',
    },
    kind: 'labelled',
    source: { href: `${CORE_REPO}/blob/main/docs/results/actions.md`, text: { en: 'action results', zh: '動作結果' } },
  },
  {
    value: '0.31 m',
    label: {
      en: 'median 3D error of an attack from one camera with the touches anchored to the players (0.76 m without), on synthetic rallies with realistic detection errors',
      zh: '單機位重建扣球的 3D 誤差中位數，觸球點以球員位置為錨點（不用時 0.76 m）；合成回合、真實比例的偵測誤差',
    },
    kind: 'synthetic',
    source: { href: `${CORE_REPO}/blob/main/docs/results/trajectory.md`, text: { en: '3D trajectory results', zh: '3D 軌跡結果' } },
  },
  {
    value: '0.742',
    label: {
      en: 'rally detection F1 on two held-out broadcast matches; 0.76 on six fixed end-line clips with a model trained on labels read from the score bug',
      zh: '兩場保留的轉播比賽上的回合偵測 F1；固定端線鏡頭以比分條讀出的標註另訓練一個模型，在 6 段片段上為 0.76',
    },
    kind: 'labelled',
    source: { href: `${CORE_REPO}/blob/main/docs/results/rallies.md`, text: { en: 'rally results', zh: '回合結果' } },
  },
  {
    value: '0.824',
    label: {
      en: 'shirt digit mAP@0.5 on teams the model never saw; numbers are voted per player over time',
      zh: '在模型沒看過的隊伍上，背號數字的 mAP@0.5；每位球員的號碼依時間投票決定',
    },
    kind: 'labelled',
    source: { href: `${CORE_REPO}/blob/main/docs/results/actions.md`, text: { en: 'shirt number results', zh: '背號結果' } },
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
    what: { en: 'Camera cuts and frame-to-frame camera motion, so the court follows pans and zooms.', zh: '鏡頭切換與逐幀的鏡頭運動，場地會跟著鏡頭平移與縮放。' },
    status: 'works',
  },
  {
    name: { en: 'Find the court', zh: '找出場地' },
    what: {
      en: '14 keypoints (net band included) per camera shot, the better of two models; a still end-line camera gets its court from the painted lines of an empty-court background plate. Doubtful courts are flagged and not used.',
      zh: '逐鏡頭偵測 14 個關鍵點（含網子上下緣），在兩個模型中選較好的；端線後方的固定鏡頭改以空場背景圖上的地面白線配對。可疑的場地會被標出，後續不採用。',
    },
    status: 'works',
  },
  {
    name: { en: 'Track the ball', zh: '追蹤球' },
    what: { en: 'VballNet V4c on every frame; misses stay misses. A gym-tuned WASB replaces it after its broadcast test.', zh: '每一幀都用 VballNet V4c 偵測，沒偵測到就標示缺失。以體育館影片微調的 WASB 通過轉播測試後換入。' },
    status: 'works',
  },
  {
    name: { en: 'Track the players', zh: '追蹤球員' },
    what: {
      en: 'YOLO26s fine-tuned to box players only, BoT-SORT tracking, positions in court metres; referees, line judges and spectators are left out.',
      zh: 'YOLO26s 微調為只框場上球員，BoT-SORT 追蹤，換算成場地公尺座標；裁判、司線員與觀眾不會被框。',
    },
    status: 'works',
  },
  {
    name: { en: 'Actions and shirt numbers', zh: '球員動作與背號' },
    what: {
      en: 'Block, receive, set and spike per player from a classifier weighted by where the ball is, serves from a detector, shirt numbers voted over time; they become suggested tags the coach accepts.',
      zh: '每位球員的攔網、接球、舉球、扣球由分類器判斷並以球的位置加權，發球由偵測器判斷，背號依時間投票；轉成教練確認的建議標記。',
    },
    status: 'works',
  },
  {
    name: { en: '3D ball path', zh: '3D 球軌跡' },
    what: {
      en: 'One camera, calibrated from the court and the net; each flight fitted to physics with the touches anchored to the players, its error shown and impossible fits dropped. Real flights are often low quality: the 2D ball track is the limit.',
      zh: '單機位，用場地和網子校正攝影機；每段飛行以物理模型擬合，觸球點以球員位置為錨點，顯示誤差並剔除不合物理的結果。真實影片上的飛行常為低品質，瓶頸在二維球偵測。',
    },
    status: 'building',
  },
  {
    name: { en: 'Rallies', zh: '回合' },
    what: {
      en: 'Play or no play from the system’s own cues, with one model for broadcasts and one for still end-line cameras.',
      zh: '以系統自己的線索判斷比賽中或非比賽中；轉播與端線固定鏡頭各有一個模型。',
    },
    status: 'works',
  },
  {
    name: { en: 'Landing and score', zh: '落點與比分' },
    what: {
      en: 'Landing, in or out and who won the point, with unsure calls flagged for a one-key correction. Until then the coach sets each rally’s winner.',
      zh: '落點、界內外與誰得分，不確定的判斷會標出來、按一個鍵就能修正。在那之前，由教練指定每個回合的得分方。',
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
      en: 'Video with the court, players and ball trail, a rally inspector, and lanes for rallies, ball, landings, actions, tags and review.',
      zh: '影片疊上場地、球員與球軌跡，搭配回合屬性面板，以及回合、球、落點、動作、標記與待檢查分軌。',
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
      en: 'Court, ball, players, actions, rallies and the review app work today, including on a fixed camera behind the end line; 3D flights work but are limited by the 2D ball track; automatic scoring is next.',
      zh: '場地、球、球員、動作、回合與比賽回顧介面已可使用，端線後方的固定鏡頭也可以；3D 飛行可用，但受限於二維球偵測；下一步是自動計分。',
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
      en: 'Real output, not a drawing: a fixed camera behind the end line (GCU vs UCLA) analysed end to end, and the review app.',
      zh: '這是真實輸出，不是示意圖：端線後方一台固定攝影機（GCU vs UCLA）完整分析的結果，以及比賽回顧介面。',
    },
    video: {
      en: 'The court fitted to the painted lines of an empty-court background plate (the volleyball lines are black on this multi-sport floor), players tracked and coloured by side, the ball trail (VballNet), a top-down map and a 3D view with the current 3D flight. Footage: NCAA men’s volleyball (VolleyballWatchdog), for research only.',
      zh: '以空場背景圖上的地面白線配對出的場地（這座多用途球館的排球線是黑色的）、依半場上色的球員追蹤、球的軌跡（VballNet），以及俯視圖與這一球的 3D 視圖。畫面來源：NCAA 男子排球（VolleyballWatchdog），僅供研究。',
    },
    app: {
      en: 'Match review on a fixed end-line clip: court lines and players on the video, the rally inspector and list (13 rallies found by the fixed-camera rally model), and timeline lanes for rallies, ball, actions and tags.',
      zh: '固定端線鏡頭的比賽回顧：影片上的場地線與球員、回合屬性與列表（固定鏡頭回合模型找到的 13 個回合），以及回合、球、動作與標記的時間軸分軌。',
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
          en: 'Tennis and professional volleyball rely on several synchronised cameras. With one, the plan combines the 3D fit, learned event spotting and the sound of the bounce, and reports uncertainty near the lines.',
          zh: '網球與職業排球依靠多台同步攝影機。只有一台時，計畫結合 3D 擬合、學習式事件偵測與落地的聲音，並在邊線附近回報不確定度。',
        },
      },
      {
        name: { en: 'Free labels from the score on screen', zh: '從畫面上的比分取得免費標註' },
        what: {
          en: 'Match video carries its own answer key: the score bug changes after every point. Read with OCR and filtered by the rules of the game (one point at a time), it gives each rally’s end and winner, which trained the fixed-camera rally model and will measure automatic scoring.',
          zh: '比賽影片本身就帶著答案：每一分之後畫面上的比分都會改變。以 OCR 讀取並用比賽規則（每次只加一分）過濾誤讀，就得到每個回合的結束與得分方，用來訓練固定鏡頭的回合模型，之後也用來評估自動計分。',
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
