const STORAGE_KEY = "waterdeep-shadow-lord-solo-v1";

const cards = window.WATERDEEP_CARD_DATA.cards;

const resourceDefs = [
  ["vp", "胜点", "res-vp.png"],
  ["g", "金币", "res-gold.png"],
  ["c", "牧师", "res-cleric.png"],
  ["f", "战士", "res-fighter.png"],
  ["r", "盗贼", "res-rogue.png"],
  ["w", "法师", "res-wizard.png"],
  ["x", "腐化", "res-corruption.png"],
  ["intrigue", "隐藏阴谋", "icon-intrigue.png"],
  ["completed", "完成任务", "icon-quest-completed.png"],
];

const advTypes = ["c", "f", "r", "w"];

const targetNames = {
  cliffwatch: "崖望旅馆",
  advanced: "高级建筑",
  custom: "高级建筑",
  grinning: "笑狮酒馆",
  plinth: "尖碑塔",
  aurora: "极光领域商店",
  builder: "建造者大厅",
  harbor: "深水港",
  castle: "深水城城堡",
  blackstaff: "黑杖塔",
  field: "凯旋角斗场",
  entryWell: "入口井道",
  hallMirrors: "镜厅",
  grimStatue: "无首石像",
  hallVoice: "声言之庭",
  skullIsland: "骷髅岛",
  slaversMarket: "奴隶市场",
};

const buildingNameZh = {
  "Caravan Court": "商队庭院",
  "Dragon Tower": "龙塔",
  "Fetlock Court": "费特洛克庭院",
  "The Golden Horn": "金角楼",
  "Helmstar Warehouse": "赫姆星仓库",
  "Heroes' Garden": "英雄花园",
  "House of Good Spirits": "善灵之家",
  "House of Heroes": "英雄之家",
  "House of the Moon": "月之屋",
  "House of Wonder": "奇迹之屋",
  "Jesters' Court": "弄臣庭院",
  "New Olamn": "新奥拉姆",
  "Northgate": "北门",
  "The Palace of Waterdeep": "深水城宫殿",
  "The Skulkway": "潜行道",
  "Spires of the Morning": "晨曦尖塔",
  "Smuggler's Dock": "走私者码头",
  "The Stone House": "石屋",
  "The Three Pearls": "三颗珍珠",
  "The Tower of Luck": "幸运塔",
  "Tower of the Order": "秩序高塔",
  "The Waymoot": "道路议集",
  "The Yawning Portal": "哈欠传送门旅店",
  "The Zoarstar": "佐阿星",
  "Aurora's Realms Shop": "极光领域商店",
  "Blackstaff Tower": "黑杖塔",
  "Builder's Hall": "建造者大厅",
  "Castle Waterdeep": "深水城城堡",
  "Cliffwatch Inn A": "崖望旅馆 A",
  "Cliffwatch Inn B": "崖望旅馆 B",
  "Cliffwatch Inn C": "崖望旅馆 C",
  "Field of Triumph": "凯旋角斗场",
  "The Grinning Lion Tavern": "笑狮酒馆",
  "The Plinth": "尖碑塔",
  "Waterdeep Harbor": "深水港",
  "Cryptkey Facilitations": "墓钥事务所",
  "The Deepfires": "深火工坊",
  "Delver's Folly": "探险者愚行",
  "The Frontal Lobe": "前额叶",
  "The Hell Hound's Muzzle": "地狱犬口套",
  "Monsters Made to Order": "定制怪物",
  "The Poisoned Quill": "淬毒羽笔",
  "Promenade of the Dark Maiden": "幽暗少女长廊",
  "Secret Shrine": "秘密神龛",
  "Shradin's Excellent Zombies": "什拉丁优质僵尸",
  "Thimblewine's Pawnshop": "顶针酒当铺",
  "The Thrown Gauntlet": "掷手套",
  "Hall of the Voice": "声言之庭",
  "Slavers' Market": "奴隶市场",
  "Skull Island": "骷髅岛",
  "Belkram's Tomb": "贝尔克拉姆之墓",
  "Citadel of the Bloody Hand": "血手堡垒",
  "The Eye's Lair": "眼魔巢穴",
  "Hall of Many Pillars": "万柱大厅",
  "Hall of Sleeping Kings": "沉睡诸王大厅",
  "Hall of Three Lords": "三领主大厅",
  "The Librarium": "藏书馆",
  "The Lost Cavern": "失落洞窟",
  "Shadowdusk Hold": "暗暮堡",
  "Trobriand's Graveyard": "特罗布里安德墓园",
  "High Duke's Tomb": "大公墓",
  "Room of Wisdom": "智慧室",
  "Entry Well": "入口井道",
  "Hall of Mirrors": "镜厅",
  "The Grim Statue": "无首石像",
};

const quests = cards
  .filter((card) => card.type === "quest")
  .sort((a, b) => labelForCard(a).localeCompare(labelForCard(b), "zh-CN"));
const buildings = cards
  .filter((card) => card.type === "building")
  .sort((a, b) => labelForCard(a).localeCompare(labelForCard(b), "zh-CN"));
const purchasableBuildings = buildings.filter((card) => typeof card.cost === "number");
const cardById = new Map(cards.map((card) => [card.id, card]));

const targetArt = {
  cliffwatch: "art-cliffwatch.webp",
  advanced: "ui-building-card.webp",
  custom: "ui-building-card.webp",
  grinning: "art-grinning.webp",
  plinth: "art-plinth.webp",
  aurora: "art-aurora.webp",
  builder: "art-builder.webp",
  harbor: "art-harbor.webp",
  castle: "art-castle.webp",
  blackstaff: "art-blackstaff.webp",
  field: "art-field.webp",
  entryWell: "art-entry-well.webp",
  hallMirrors: "art-hall-mirrors.webp",
  grimStatue: "art-grim-statue.webp",
  hallVoice: "art-hall-voice.webp",
  skullIsland: "art-skull-island.webp",
  slaversMarket: "art-slavers-market.webp",
};

const boardImageAssets = Array.from(new Set([
  "ui-board-space.webp",
  "ui-building-card.webp",
  ...Object.values(targetArt),
  "icon-arrow.png",
  "icon-building.png",
  "icon-first-player.png",
  "icon-intrigue.png",
  "icon-quest.png",
  "res-any.png",
  "res-cleric.png",
  "res-corruption.png",
  "res-fighter.png",
  "res-gold.png",
  "res-rogue.png",
  "res-vp.png",
  "res-wizard.png",
  "icon-ambassador.png",
  "icon-lieutenant.png",
]));

const MIN_CUSTOM_ACTION_SLOTS = 0;

function customSlotId(number) {
  return `custom${number}`;
}

function customSlotNumber(spaceId) {
  const match = String(spaceId || "").match(/^custom(\d+)$/);
  return match ? Number(match[1]) : 0;
}

function isCustomActionSpace(spaceId) {
  return customSlotNumber(spaceId) > 0;
}

function normalizeCustomSlotCount(count, occupied = {}) {
  const occupiedMax = Object.keys(occupied || {}).reduce((max, spaceId) => Math.max(max, customSlotNumber(spaceId)), 0);
  return Math.max(MIN_CUSTOM_ACTION_SLOTS, Number(count) || 0, occupiedMax);
}

function customActionSpaces() {
  const count = normalizeCustomSlotCount(state?.customSlotCount, state?.occupied);
  return Array.from({ length: count }, (_, index) => customSlotId(index + 1));
}

function customSlotNames() {
  if (!state.customSlotNames || typeof state.customSlotNames !== "object") state.customSlotNames = {};
  return state.customSlotNames;
}

function customSlotName(spaceId) {
  return customSlotNames()[spaceId]?.trim() || `高级建筑 ${customSlotNumber(spaceId)}`;
}

function customNamesSignature() {
  const names = customSlotNames();
  return customActionSpaces().map((spaceId) => `${spaceId}:${names[spaceId] || ""}`).join("|");
}

function advancedGroupSignature() {
  return `${customNamesSignature()}::edit=${state?.editingCustomName || ""}`;
}

const spaceDefs = {
  cliffA: { target: "cliffwatch", name: "崖望旅馆 A", detail: "拿 1 任务 + 2 金币", effects: ["quest", "g", "g"] },
  cliffB: { target: "cliffwatch", name: "崖望旅馆 B", detail: "拿 1 任务 + 1 阴谋", effects: ["quest", "intrigue"] },
  cliffC: { target: "cliffwatch", name: "崖望旅馆 C", detail: "刷新后拿 1 任务", effects: ["refresh", "quest"] },
  grinning: { target: "grinning", name: "笑狮酒馆", detail: "2 盗贼", effects: ["r", "r"] },
  plinth: { target: "plinth", name: "尖碑塔", detail: "1 牧师", effects: ["c"] },
  aurora: { target: "aurora", name: "极光领域商店", detail: "4 金币", effects: ["g", "g", "g", "g"] },
  builder: { target: "builder", name: "建造者大厅", detail: "购买建筑", effects: ["building"] },
  harbor1: { target: "harbor", name: "深水港 1", detail: "阴谋 + 重指派", effects: ["intrigue", "arrow"] },
  harbor2: { target: "harbor", name: "深水港 2", detail: "阴谋 + 重指派", effects: ["intrigue", "arrow"] },
  harbor3: { target: "harbor", name: "深水港 3", detail: "阴谋 + 重指派", effects: ["intrigue", "arrow"] },
  castle: { target: "castle", name: "深水城城堡", detail: "先手标记 + 1 阴谋", effects: ["first", "intrigue"] },
  blackstaff: { target: "blackstaff", name: "黑杖塔", detail: "1 法师", effects: ["w"] },
  field: { target: "field", name: "凯旋角斗场", detail: "2 战士", effects: ["f", "f"] },
  entryWell: { target: "entryWell", name: "入口井道", detail: "任务 + 阴谋", effects: ["quest", "intrigue"] },
  hallMirrors: { target: "hallMirrors", name: "镜厅", detail: "任意，或盗贼+战士", effects: ["any", "r", "f"] },
  grimStatue: { target: "grimStatue", name: "无首石像", detail: "抽 2 阴谋", effects: ["intrigue", "intrigue"] },
  hallVoice: { target: "hallVoice", name: "声言之庭", detail: "任务/阴谋/金币/腐化", effects: ["quest", "intrigue", "g", "g", "g", "g", "g", "x"] },
  skullIsland: { target: "skullIsland", name: "骷髅岛", detail: "2 任意冒险者 + 腐化", effects: ["any", "any", "x"] },
  slaversMarket: { target: "slaversMarket", name: "奴隶市场", detail: "2 战士、2 盗贼、腐化", effects: ["f", "f", "r", "r", "x"] },
  custom1: { target: "custom", name: "高级建筑 1", detail: "按高级建筑牌面执行", effects: ["building"] },
  custom2: { target: "custom", name: "高级建筑 2", detail: "按高级建筑牌面执行", effects: ["building"] },
  custom3: { target: "custom", name: "高级建筑 3", detail: "按高级建筑牌面执行", effects: ["building"] },
};

const clockwiseOrder = [
  "cliffA",
  "cliffB",
  "cliffC",
  "grinning",
  "hallMirrors",
  "plinth",
  "entryWell",
  "grimStatue",
  "aurora",
  "builder",
  "castle",
  "harbor1",
  "harbor2",
  "harbor3",
  "skullIsland",
  "slaversMarket",
  "hallVoice",
  "blackstaff",
  "field",
];

const moduleSpaces = {
  base: new Set(["cliffA", "cliffB", "cliffC", "grinning", "plinth", "aurora", "builder", "castle", "harbor1", "harbor2", "harbor3", "blackstaff", "field"]),
  undermountain: new Set(["cliffA", "cliffB", "cliffC", "grinning", "hallMirrors", "plinth", "entryWell", "grimStatue", "aurora", "builder", "castle", "harbor1", "harbor2", "harbor3", "blackstaff", "field"]),
  skullport: new Set(["cliffA", "cliffB", "cliffC", "grinning", "plinth", "aurora", "builder", "castle", "harbor1", "harbor2", "harbor3", "skullIsland", "slaversMarket", "hallVoice", "blackstaff", "field"]),
};

const actionTables = {
  base: {
    die: 12,
    rolls: {
      1: "cliffwatch",
      2: "advanced",
      3: "grinning",
      4: "plinth",
      5: "aurora",
      6: "builder",
      7: "harbor",
      8: "castle",
      9: "blackstaff",
      10: "field",
      11: "advanced",
      12: "cliffwatch",
    },
  },
  undermountain: {
    die: 20,
    rolls: {
      1: "cliffwatch",
      2: "cliffwatch",
      3: "advanced",
      4: "advanced",
      5: "entryWell",
      6: "grinning",
      7: "plinth",
      8: "aurora",
      9: "builder",
      10: "harbor",
      11: "castle",
      12: "blackstaff",
      13: "field",
      14: "hallMirrors",
      15: "grimStatue",
      16: "entryWell",
      17: "advanced",
      18: "advanced",
      19: "cliffwatch",
      20: "cliffwatch",
    },
  },
  skullport: {
    die: 20,
    rolls: {
      1: "cliffwatch",
      2: "cliffwatch",
      3: "advanced",
      4: "advanced",
      5: "hallVoice",
      6: "grinning",
      7: "plinth",
      8: "aurora",
      9: "builder",
      10: "harbor",
      11: "castle",
      12: "blackstaff",
      13: "field",
      14: "skullIsland",
      15: "slaversMarket",
      16: "hallVoice",
      17: "advanced",
      18: "advanced",
      19: "cliffwatch",
      20: "cliffwatch",
    },
  },
};

let state = loadState() || defaultState();

const els = {
  stepTitle: document.getElementById("stepTitle"),
  phasePill: document.getElementById("phasePill"),
  stateStrip: document.getElementById("stateStrip"),
  nextCard: document.getElementById("nextCard"),
  nextBtn: document.getElementById("nextBtn"),
  setupPanel: document.getElementById("setupPanel"),
  moduleSelect: document.getElementById("moduleSelect"),
  longGameToggle: document.getElementById("longGameToggle"),
  firstPlayToggle: document.getElementById("firstPlayToggle"),
  boardGrid: document.getElementById("boardGrid"),
  boardLockBtn: document.getElementById("boardLockBtn"),
  specialAgentTools: document.getElementById("specialAgentTools"),
  shadowResources: document.getElementById("shadowResources"),
  activeQuestList: document.getElementById("activeQuestList"),
  questSearch: document.getElementById("questSearch"),
  questOptions: document.getElementById("questOptions"),
  cliffwatchSlots: document.getElementById("cliffwatchSlots"),
  builderSlots: document.getElementById("builderSlots"),
  advancedBuildings: document.getElementById("advancedBuildings"),
  questCompletionBox: document.getElementById("questCompletionBox"),
  finalScoreBox: document.getElementById("finalScoreBox"),
  logList: document.getElementById("logList"),
};

fillCardOptions();
bindEvents();
preloadAssets(boardImageAssets);
render();

function defaultState() {
  return {
    configured: false,
    module: "base",
    decisionMode: "quick",
    longGame: false,
    firstPlay: false,
    shadowNeedsQuest: false,
    round: 1,
    phase: "setup",
    firstPlayer: "shadow",
    currentTurn: "shadow",
    agents: { shadow: 0, human: 0 },
    occupied: {},
    coOccupied: {},
    boardUnlocked: false,
    boardEditSpace: null,
    freeEditMode: "cycle",
    harborQueue: [],
    pendingHumanSpace: null,
    pendingHarborTarget: null,
    pendingAmbassadorSpace: null,
    pending: null,
    customSlotCount: MIN_CUSTOM_ACTION_SLOTS,
    customSlotNames: {},
    editingCustomName: null,
    specialAdjust: false,
    specialPlaceOwner: null,
    pendingSpecialMove: null,
    special: {
      lieutenantOwner: "none",
      ambassadorOwner: "none",
      ambassadorSpace: null,
    },
    corruptionTrack: makeCorruptionTrack(),
    shadow: {
      vp: 0,
      g: 4,
      c: 0,
      f: 0,
      r: 0,
      w: 0,
      x: 0,
      intrigue: 2,
      completed: 0,
      activeQuests: [],
    },
    cliffwatch: [null, null, null, null],
    builder: [
      { id: null, vp: 0 },
      { id: null, vp: 0 },
      { id: null, vp: 0 },
    ],
    advanced: [],
    quickQuestSerial: 0,
    quickBuildingSerial: 0,
    finalScore: defaultFinalScore(),
    log: [],
  };
}

function defaultFinalScore() {
  return {
    corruptionValue: 0,
    human: { vp: 0, c: 0, f: 0, r: 0, w: 0, g: 0, lord: 0, x: 0, extra: 0 },
    shadow: { vp: 0, c: 0, f: 0, r: 0, w: 0, g: 0, completed: 0, x: 0, extra: 0 },
  };
}

function normalizeFinalScore(score) {
  const defaults = defaultFinalScore();
  return {
    ...defaults,
    ...(score || {}),
    human: { ...defaults.human, ...(score?.human || {}) },
    shadow: { ...defaults.shadow, ...(score?.shadow || {}) },
  };
}

function normalizeSpecialAgents(special) {
  const lieutenantOwner = special?.lieutenantOwner || (special?.lieutenant ? "human" : "none");
  const ambassadorOwner = special?.ambassadorOwner || (special?.ambassadorReady ? "human" : "none");
  return {
    lieutenantOwner: normalizeOwner(lieutenantOwner),
    ambassadorOwner: normalizeOwner(ambassadorOwner),
    ambassadorSpace: special?.ambassadorSpace || null,
  };
}

function normalizeOwner(owner) {
  return ["none", "human", "shadow"].includes(owner) ? owner : "none";
}

function normalizePlayer(owner) {
  return ["human", "shadow"].includes(owner) ? owner : "shadow";
}

function normalizeCoOccupied(coOccupied) {
  const normalized = {};
  Object.entries(coOccupied || {}).forEach(([spaceId, owner]) => {
    const occupant = normalizeOccupantOwner(owner);
    if (spaceId && occupant) normalized[spaceId] = occupant;
  });
  return normalized;
}

function normalizeFreeEditMode(mode) {
  return ["cycle", "coHuman", "coShadow", "coAmbassador", "clearCo"].includes(mode) ? mode : "cycle";
}

function visibleBoardSpaces() {
  return [...currentOrder(), ...customActionSpaces()];
}

function normalizeBoardEditSpace(spaceId) {
  return visibleBoardSpaces().includes(spaceId) ? spaceId : null;
}

function makeCorruptionTrack() {
  return { "-1": 1, "-2": 3, "-3": 3, "-4": 3, "-5": 3, "-6": 3, "-7": 3, "-8": 3, "-9": 3 };
}

function bindEvents() {
  onClick("newGameBtn", startGame);
  onClick("resetBtn", resetGame);
  onClick("saveBtn", () => {
    saveState();
    addLog("已保存当前局面。");
  });
  onClick("nextBtn", nextStep);
  onClick("boardLockBtn", toggleBoardUnlocked);
  onClick("clearOccupiedBtn", () => {
    state.occupied = {};
    state.coOccupied = {};
    state.harborQueue = [];
    state.pendingHumanSpace = null;
    state.pendingHarborTarget = null;
    state.pendingAmbassadorSpace = null;
    state.special.ambassadorSpace = null;
    state.boardEditSpace = null;
    addLog("已清空本轮行动格占用。");
    render();
  });
  onClick("clearLogBtn", () => {
    state.log = [];
    render();
  });

  document.addEventListener("click", (event) => {
    const source = event.target instanceof Element ? event.target : event.target.parentElement;
    const target = source?.closest("[data-action]");
    if (!target) return;
    const action = target.dataset.action;
    if (!action) return;
    handleAction(action, target);
  });

  document.addEventListener("keydown", (event) => {
    const target = event.target;
    if (!target?.dataset?.customName) return;
    if (event.key === "Enter") {
      event.preventDefault();
      setCustomSlotName(target.dataset.customName, target.value, true, true);
    }
    if (event.key === "Escape") {
      event.preventDefault();
      state.editingCustomName = null;
      render();
    }
  });

  document.addEventListener("change", (event) => {
    const target = event.target;
    if (target.dataset.customName) {
      setCustomSlotName(target.dataset.customName, target.value, true, true);
      return;
    }
    if (target.dataset.cliffSlot) {
      state.cliffwatch[Number(target.dataset.cliffSlot)] = target.value || null;
      render();
    }
    if (target.dataset.builderSlot) {
      state.builder[Number(target.dataset.builderSlot)].id = target.value || null;
      render();
    }
    if (target.dataset.builderVp) {
      state.builder[Number(target.dataset.builderVp)].vp = Math.max(0, Number(target.value || 0));
      render();
    }
    if (target.dataset.advancedOwner) {
      const item = state.advanced[Number(target.dataset.advancedOwner)];
      if (item) item.owner = target.value;
      render();
    }
    if (target.dataset.advancedId) {
      const item = state.advanced[Number(target.dataset.advancedId)];
      if (item) item.id = target.value || null;
      render();
    }
    if (isScoreInputTarget(target)) {
      applyScoreInput(target);
      refreshFinalScoreNumbers();
      saveState();
    }
  });

  document.addEventListener("input", (event) => {
    const target = event.target;
    if (target.dataset.customName) {
      setCustomSlotName(target.dataset.customName, target.value, false);
      return;
    }
    if (!isScoreInputTarget(target)) return;
    applyScoreInput(target);
    refreshFinalScoreNumbers();
    saveState();
  });
}

function onClick(id, handler) {
  document.getElementById(id)?.addEventListener("click", handler);
}

function isScoreInputTarget(target) {
  return Boolean(target?.dataset?.scoreGlobal || (target?.dataset?.scoreSide && target?.dataset?.scoreField));
}

function applyScoreInput(target) {
  state.finalScore = normalizeFinalScore(state.finalScore);
  if (target.dataset.scoreGlobal) {
    state.finalScore[target.dataset.scoreGlobal] = readScoreInput(target.value);
    return;
  }
  const side = target.dataset.scoreSide;
  const signed = target.dataset.scoreSigned === "1";
  state.finalScore[side][target.dataset.scoreField] = readScoreInput(target.value, signed);
}

function startGame() {
  const next = defaultState();
  next.configured = true;
  next.module = els.moduleSelect.value;
  next.decisionMode = "quick";
  next.firstPlayer = normalizePlayer(state.firstPlayer);
  next.currentTurn = next.firstPlayer;
  next.longGame = els.longGameToggle.checked;
  next.firstPlay = els.firstPlayToggle.checked;
  next.phase = "startRound";
  next.shadowNeedsQuest = false;
  state = next;
  addLog(`开局：${moduleName(state.module)}。暗影领主 2 张公开任务，首次行动照常掷骰。`);
  render();
}

function resetGame() {
  if (!confirm("确定要清空当前单人局面吗？")) return;
  localStorage.removeItem(STORAGE_KEY);
  state = defaultState();
  render();
}

function nextStep() {
  if (!state.configured) {
    startGame();
    return;
  }
  if (state.pending?.kind === "quickQuest") {
    state.shadowNeedsQuest = false;
    addLog(`${state.pending?.source || "任务判定"}：任务已处理并补牌。`);
    finishQuickDecision();
    return;
  }
  if (state.pending?.kind === "shadowAction") {
    confirmShadowAction();
    return;
  }
  if (state.phase === "startRound") resolveStartRound();
  else if (state.phase === "ambassador") finishAmbassadorAssignment();
  else if (state.phase === "shadowTurn") planShadowAction();
  else if (state.phase === "humanTurn") finishHumanTurn();
  else if (state.phase === "harbor") resolveNextHarbor();
  else if (state.phase === "endRound") finishRound();
}

function resolveStartRound() {
  if (!state.configured) return;
  if (state.phase !== "startRound") return;
  state.pending = null;
  state.pendingHumanSpace = null;
  state.pendingHarborTarget = null;
  state.pendingAmbassadorSpace = null;
  if (state.round === 5) addLog("第 5 轮：双方 +1 代理人。");
  addLog(`第 ${state.round} 轮：建筑 +1 胜点；暗影领主拿 ${state.round} 金币。`);
  state.currentTurn = state.firstPlayer;
  if (state.special.ambassadorOwner === "human") {
    state.phase = "ambassador";
    addLog("大使归你：先指派大使。");
    render();
    return;
  }
  if (state.special.ambassadorOwner === "shadow") {
    state.phase = "shadowTurn";
    addLog("大使归暗影领主：先判定大使行动。");
    planShadowAction({ ambassadorAction: true });
    return;
  }
  setTurnPhase();
  continueAfterTurnTransition();
}

function setTurnPhase() {
  const shadowTotal = totalAgentsFor("shadow");
  const humanTotal = totalAgentsFor("human");
  if (state.agents.shadow >= shadowTotal && state.agents.human >= humanTotal) {
    state.phase = state.harborQueue.length ? "harbor" : "endRound";
    return;
  }
  if (state.currentTurn === "shadow" && state.agents.shadow >= shadowTotal) state.currentTurn = "human";
  if (state.currentTurn === "human" && state.agents.human >= humanTotal) state.currentTurn = "shadow";
  if (state.agents.shadow >= shadowTotal && state.agents.human >= humanTotal) {
    state.phase = state.harborQueue.length ? "harbor" : "endRound";
  } else {
    state.phase = state.currentTurn === "shadow" ? "shadowTurn" : "humanTurn";
  }
}

function advanceTurn() {
  const shadowTotal = totalAgentsFor("shadow");
  const humanTotal = totalAgentsFor("human");
  if (state.agents.shadow >= shadowTotal && state.agents.human >= humanTotal) {
    state.phase = state.harborQueue.length ? "harbor" : "endRound";
    return;
  }
  const other = state.currentTurn === "shadow" ? "human" : "shadow";
  state.currentTurn = other;
  if (state.currentTurn === "shadow" && state.agents.shadow >= shadowTotal) state.currentTurn = "human";
  if (state.currentTurn === "human" && state.agents.human >= humanTotal) state.currentTurn = "shadow";
  setTurnPhase();
}

function continueAfterTurnTransition() {
  if (state.phase === "shadowTurn" && !state.pending) {
    planShadowAction();
    return;
  }
  if (state.phase === "harbor" && !state.pending) {
    const nextHarbor = nextHarborEntry();
    if (nextHarbor?.owner === "shadow") {
      planShadowAction({ harborReassign: true, sourceHarbor: nextHarbor.space });
      return;
    }
  }
  render();
}

function finishHumanTurn() {
  if (!state.configured || state.phase !== "humanTurn") return;
  if (!state.pendingHumanSpace) {
    addLog("你的回合：先选空位。");
    render();
    return;
  }
  const placed = state.pendingHumanSpace;
  state.pendingHumanSpace = null;
  if (targetForSpace(placed) === "castle") {
    claimFirstPlayer("human", "你拿到先手标记，并抽 1 张阴谋。");
  }
  state.agents.human = Math.min(totalAgentsFor("human"), state.agents.human + 1);
  addLog(`你放置到 ${displaySpaceName(placed)}。`);
  advanceTurn();
  continueAfterTurnTransition();
}

function finishRound() {
  if (state.round >= 8) {
    state.phase = "final";
    addLog("第 8 轮结束，进入最终计分。");
    render();
    return;
  }
  state.round += 1;
  state.phase = "startRound";
  state.pending = null;
  state.occupied = {};
  state.coOccupied = {};
  state.harborQueue = [];
  state.pendingHumanSpace = null;
  state.pendingHarborTarget = null;
  state.pendingAmbassadorSpace = null;
  state.special.ambassadorSpace = null;
  state.specialAdjust = false;
  state.boardUnlocked = false;
  state.boardEditSpace = null;
  state.freeEditMode = "cycle";
  state.specialPlaceOwner = null;
  state.pendingSpecialMove = null;
  state.agents = { shadow: 0, human: 0 };
  addLog(`第 ${state.round - 1} 轮结束：收回代理人。`);
  render();
}

function planShadowAction(options = {}) {
  if (!state.configured) return;
  const harborReassign = Boolean(options.harborReassign);
  const ambassadorAction = Boolean(options.ambassadorAction);
  if (!harborReassign && !ambassadorAction && state.phase !== "shadowTurn") return;
  const forcedByNoQuest = state.shadowNeedsQuest && !options.forcedTarget;
  const forcedCliff = options.forcedTarget === "cliffwatch" || forcedByNoQuest;
  const table = actionTables[state.module];
  let roll = null;
  let target = forcedCliff ? "cliffwatch" : options.forcedTarget || null;
  let rerolls = 0;

  while (!target && rerolls < 12) {
    roll = die(table.die);
    target = table.rolls[roll];
  }

  if (!target) target = "cliffwatch";
  const resolved = resolveTarget(target, { excludeHarbor: harborReassign });
  state.pending = {
    kind: "shadowAction",
    harborReassign,
    ambassadorAction,
    sourceHarbor: options.sourceHarbor || (harborReassign ? nextHarborEntry()?.space : null),
    forcedCliff,
    tableDie: table.die,
    roll,
    target,
    forcedByNoQuest,
    ...resolved,
  };
  state.phase = harborReassign ? "harbor" : "shadowTurn";
  render();
}

function resolveTarget(target, options = {}) {
  if (target === "advanced") {
    return resolveMaintainedAdvancedTarget();
  }

  const spaces = spacesForTarget(target);
  if (options.excludeHarbor && target === "harbor") return fallbackFrom("harbor3", options);
  const open = spaces.find((space) => !state.occupied[space]);
  if (open) return { spaceId: open, d10: null, fallback: false };
  return fallbackFrom(spaces[spaces.length - 1] || "field", options);
}

function resolveAdvancedTarget() {
  const count = state.advanced.length;
  if (!count) return null;
  const roll = die(10);
  const startIndex = (roll - 1) % count;
  for (let offset = 0; offset < count; offset += 1) {
    const index = (startIndex + offset) % count;
    const spaceId = `adv_${index}`;
    if (!state.occupied[spaceId]) return { spaceId, d10: roll, fallback: offset > 0 };
  }
  return null;
}

function resolveMaintainedAdvancedTarget() {
  const spaces = customActionSpaces();
  const roll = die(10);
  if (!spaces.length) return { spaceId: "manualAdvanced", d10: roll, fallback: false, manualAdvanced: true };
  const startIndex = (roll - 1) % spaces.length;
  for (let offset = 0; offset < spaces.length; offset += 1) {
    const index = (startIndex + offset) % spaces.length;
    const spaceId = spaces[index];
    if (!state.occupied[spaceId]) return { spaceId, d10: roll, fallback: offset > 0, maintainedAdvanced: true };
  }
  return { spaceId: null, d10: roll, fallback: true, advancedBlocked: true };
}

function fallbackFrom(spaceId, options = {}) {
  const order = currentOrder();
  const start = Math.max(0, order.indexOf(spaceId));
  for (let step = 1; step <= order.length; step += 1) {
    const candidate = order[(start + step) % order.length];
    if (options.excludeHarbor && spaceDefs[candidate]?.target === "harbor") continue;
    if (!state.occupied[candidate]) return { spaceId: candidate, d10: null, fallback: true };
  }
  return { spaceId: null, d10: null, fallback: true };
}

function confirmShadowAction() {
  const pending = state.pending;
  if (!pending || pending.kind !== "shadowAction") return;
  if (!pending.spaceId) {
    addLog("暗影领主没有找到可用行动格，请手动处理本次异常局面。");
    state.pending = null;
    render();
    return;
  }

  if (pending.manualAdvanced) {
    const recordSpace = occupyManualActionSpace(pending.ambassadorAction ? "ambassador" : "shadow", "未记录建筑");
    if (recordSpace) {
      pending.spaceId = recordSpace;
      addLog(`暗影领主到高级建筑：${displaySpaceName(recordSpace)}。`);
    } else {
      addLog("暗影领主到高级建筑：请手动处理。");
    }
    finishShadowAction(pending.harborReassign, { ambassadorAction: pending.ambassadorAction });
    render();
    return;
  }

  occupySpace(pending.spaceId, pending.ambassadorAction ? "ambassador" : "shadow");
  const decision = applyShadowLocation(pending.spaceId, { ambassadorAction: pending.ambassadorAction });
  if (decision) {
    state.pending = { ...decision, harborReassign: pending.harborReassign, sourceHarbor: pending.sourceHarbor, ambassadorAction: pending.ambassadorAction };
    render();
    return;
  }
  finishShadowAction(pending.harborReassign, { ambassadorAction: pending.ambassadorAction });
  render();
}

function finishShadowAction(harborReassign, options = {}) {
  if (options.ambassadorAction) {
    state.special.ambassadorSpace = state.pending?.spaceId || null;
    state.special.ambassadorOwner = "none";
  } else if (!harborReassign) {
    state.agents.shadow = Math.min(totalAgentsFor("shadow"), state.agents.shadow + 1);
  } else {
    completeHarborReassign(state.pending?.sourceHarbor);
  }
  state.pending = { kind: "shadowQuestCheck", harborReassign, ambassadorAction: Boolean(options.ambassadorAction) };
  addLog(`${options.ambassadorAction ? "暗影领主大使" : "暗影领主"}行动结束：查任务。`);
}

function finishShadowQuestCheck(noActiveQuests) {
  const pending = state.pending;
  if (!pending || pending.kind !== "shadowQuestCheck") return;
  const harborReassign = Boolean(pending.harborReassign);
  const ambassadorAction = Boolean(pending.ambassadorAction);
  if (noActiveQuests) {
    state.shadowNeedsQuest = true;
    addLog("任务检查：无任务；下次优先崖望旅馆。");
  } else {
    state.shadowNeedsQuest = false;
    addLog("任务检查：仍有进行中任务。");
  }
  state.pending = null;
  if (ambassadorAction) {
    setTurnPhase();
  } else if (harborReassign) {
    state.phase = state.harborQueue.length ? "harbor" : "endRound";
  } else {
    advanceTurn();
  }
  continueAfterTurnTransition();
}

function finishQuickDecision() {
  const pending = state.pending;
  if (pending?.after === "playIntrigue") playShadowIntrigue(pending.source);
  const harborReassign = Boolean(pending?.harborReassign);
  finishShadowAction(harborReassign, { ambassadorAction: Boolean(pending?.ambassadorAction) });
  render();
}

function applyShadowLocation(spaceId, options = {}) {
  const target = targetForSpace(spaceId);
  const name = displaySpaceName(spaceId);
  addLog(`${options.ambassadorAction ? "暗影领主指派大使到" : "暗影领主指派到"} ${name}。`);

  if (target === "castle") {
    claimFirstPlayer("shadow", "暗影领主拿到先手标记，并获得 1 张隐藏阴谋。");
  }
  if (target === "harbor") {
    addLog("暗影领主翻 1 张隐藏阴谋；无法结算则洗回并 +5 胜点。");
    if (options.ambassadorAction) {
      addLog("大使在深水港不会加入轮末重指派队列。");
    } else {
      addHarbor(spaceId, "shadow");
      addLog("加入深水港队列：轮末补一次非港口行动。");
    }
  }
  if (target === "builder") {
    return { kind: "quickBuilder", source: "建造者大厅" };
  }
  if (target === "cliffwatch") {
    const decision = handleCliffwatch(spaceId);
    if (decision) return decision;
  }
  if (target === "entryWell") {
    return makeQuickQuestDecision("入口井道", { after: "playIntrigue" });
  }
  if (target === "hallMirrors") addLog("镜厅：选 1 任意，或 1 盗贼 + 1 战士。");
  if (target === "grimStatue") addLog("无首石像：暗影领主获得 2 张隐藏阴谋。");
  if (target === "hallVoice") {
    addLog("声言之庭：暗影领主获得 1 隐藏阴谋、5 金币、1 腐化，并拿 1 张任务。");
    return makeQuickQuestDecision("声言之庭");
  }
  if (target === "skullIsland") addLog("骷髅岛：2 任意冒险者 + 1 腐化。");
  if (target === "slaversMarket") addLog("奴隶市场：暗影领主获得 2 战士、2 盗贼和 1 腐化。");
  return null;
}

function handleCliffwatch(spaceId) {
  if (spaceId === "cliffA") {
    addLog("崖望旅馆 A：暗影领主获得 2 金币，并拿 1 张任务。");
    return makeQuickQuestDecision("崖望旅馆 A");
  }
  if (spaceId === "cliffB") {
    addLog("崖望旅馆 B：暗影领主获得 1 张隐藏阴谋，并拿 1 张任务。");
    return makeQuickQuestDecision("崖望旅馆 B");
  }
  if (spaceId === "cliffC") {
    addLog("崖望旅馆 C：弃掉并重翻 4 张任务。");
    return makeQuickQuestDecision("崖望旅馆 C", { refreshed: true });
  }
  return null;
}

function acquireQuestFromCliff(source) {
  const available = state.cliffwatch
    .map((id, index) => ({ id, index, card: id ? cardById.get(id) : null }))
    .filter((slot) => slot.card);
  if (!available.length) {
    addLog(`${source}：从崖望旅馆拿 1 张任务。若牌列为空，先补足 4 张任务。`);
    return;
  }

  const normal = available
    .map((slot) => ({ ...slot, completion: canCompleteQuest(slot.card, state.shadow, false) }))
    .filter((slot) => slot.completion.ok)
    .sort((a, b) => questVp(b.card) - questVp(a.card));

  const fusionReady = available
    .map((slot) => ({ ...slot, completion: canCompleteQuest(slot.card, state.shadow, true) }))
    .filter((slot) => slot.completion.fusion)
    .sort((a, b) => questVp(b.card) - questVp(a.card));

  let chosen = normal[0];
  let chosenReason = chosen ? "可正常完成" : "";
  if (!chosen) {
    chosen = fusionReady[0];
    if (chosen) {
      chosenReason = "可通过邪能融合预判完成";
    }
  }
  if (!chosen) {
    const roll = die(4);
    chosen = available.find((slot) => slot.index === roll - 1) || available[0];
    addLog(`${source}：按优先级无法选出任务，四面骰=${roll}，从崖望旅馆 1-4 位置选择。`);
  } else {
    const timing = chosen.completion?.fusion ? "此时不执行转换，真正融合只在回合末任务检查时发生。" : "";
    addLog(`${source}：优先拿${chosenReason}的任务 ${labelForCard(chosen.card)}。${timing}`);
  }
  state.shadow.activeQuests.push(chosen.id);
  state.shadowNeedsQuest = false;
  state.cliffwatch[chosen.index] = null;
  addLog(`暗影领主获得进行中任务：${labelForCard(chosen.card)}。请给崖望旅馆补 1 张新任务。`);
}

function makeQuickQuestDecision(source, extra = {}) {
  return { kind: "quickQuest", source, d4: die(4), ...extra };
}

function addQuickQuest(source) {
  state.quickQuestSerial = (state.quickQuestSerial || 0) + 1;
  const entry = {
    quick: true,
    id: `quick_quest_${Date.now()}_${state.quickQuestSerial}`,
    name: `${source}取得的任务 #${state.quickQuestSerial}`,
  };
  state.shadow.activeQuests.push(entry);
  state.shadowNeedsQuest = false;
  addLog(`暗影领主从 ${source} 拿 1 张任务，记录为未知 #${state.quickQuestSerial}。`);
}

function addQuickBuilding(owner) {
  state.quickBuildingSerial = (state.quickBuildingSerial || 0) + 1;
  state.advanced.push({
    id: null,
    owner,
    name: `未指定建筑 #${state.quickBuildingSerial}`,
  });
  addLog("已把暗影领主购买的建筑加入场上高级建筑列表。");
}

function completeQuickQuest(index, fusion) {
  const entry = state.shadow.activeQuests[index];
  if (!entry || questCardFromEntry(entry)) return;
  const raw = window.prompt("任务奖励多少胜点？其他费用/奖励手动调整。", "0");
  if (raw === null) return;
  const baseVp = Math.max(0, Number(raw) || 0);
  const gain = fusion ? baseVp * 2 : baseVp;
  adjustShadow("vp", gain, false);
  state.shadow.completed += 1;
  state.shadow.activeQuests.splice(index, 1);
  addLog(`暗影领主完成 ${questLabelFromEntry(entry)}，获得 ${gain} 胜点${fusion ? "（邪能融合翻倍一次）" : ""}。其余手动调整。`);
  render();
}

function handleHallOfMirrors() {
  const deficits = questDeficitsForBestTarget();
  if (deficits.r > 0 && deficits.f > 0) {
    addResources({ r: 1, f: 1 });
    addLog("镜厅：暗影领主需要盗贼和战士，选择 1 盗贼 + 1 战士。");
    return;
  }
  const choice = chooseNeededAdventurer();
  addResources({ [choice]: 1 });
  addLog(`镜厅：暗影领主选择 1 ${resourceName(choice)}。`);
}

function handleAdvancedBuilding(index) {
  const item = state.advanced[index];
  const card = item ? cardById.get(item.id) : null;
  if (!item) return;
  if (!card) {
    addLog(`高级建筑：${item.name || "未指定建筑"}。按牌面结算。`);
    return;
  }
  const tokens = parseTokens(card.staticResources);
  addResources(tokens);
  const ownerText = item.owner === "shadow" ? "无拥有者收益。" : "你拿拥有者收益。";
  addLog(`高级建筑：${labelForCard(card)}。资源已加；其他按牌面。${ownerText}`);
}

function playShadowIntrigue(source) {
  addLog(`${source}：暗影领主洗隐藏阴谋堆并翻 1 张执行。无法结算时洗回并给暗影领主 5 胜点。`);
}

function autoQuestCheck() {
  const result = bestCompletableQuest();
  if (!result) {
    addLog("回合末检查：暗影领主暂时不能完成进行中任务。");
    return;
  }
  completeShadowQuest(result);
}

function renderQuestRecommendation(forceLog = false) {
  const result = bestCompletableQuest();
  if (!result) {
    const unknown = state.shadow.activeQuests.filter((entry) => !questCardFromEntry(entry)).length;
    els.questCompletionBox.innerHTML = unknown
      ? `暗影领主有 ${unknown} 张未知任务；若可完成，请手动点完成。`
      : "暗影领主目前没有可完成任务。若实体牌有额外效果，请手动调整资源后再检查。";
    if (forceLog) addLog("任务检查：没有可完成任务。");
    return;
  }
  const fusionText = result.fusion
    ? `回合末任务检查：没有可正常完成任务，才实际执行邪能融合。最少 ${result.fusion.path.length} 次转换（${fusionPathText(result.fusion)}）。任务胜点奖励翻倍一次，不随转换次数叠乘。`
    : "回合末任务检查：可正常完成，不需要邪能融合。";
  els.questCompletionBox.innerHTML = `
    <strong>推荐完成：</strong>${escapeHtml(labelForCard(result.card))}<br>
    ${fusionText}
    <div class="button-row" style="margin-top:8px">
      <button class="primary tiny" data-action="complete-recommended">完成推荐任务</button>
    </div>
  `;
}

function bestCompletableQuest() {
  const active = state.shadow.activeQuests
    .map((entry, index) => ({ entry, index, card: questCardFromEntry(entry) }))
    .filter((item) => item.card);
  const normal = active
    .map((item) => ({ ...item, fusion: null, check: canCompleteQuest(item.card, state.shadow, false) }))
    .filter((item) => item.check.ok)
    .sort((a, b) => questVp(b.card) - questVp(a.card));
  if (normal[0]) return normal[0];

  const fused = active
    .map((item) => ({ ...item, fusion: canCompleteQuest(item.card, state.shadow, true).fusion }))
    .filter((item) => item.fusion)
    .sort((a, b) => questVp(b.card) - questVp(a.card));
  return fused[0] || null;
}

function canCompleteQuest(card, resources, allowFusion) {
  const req = parseTokens(card.requirements);
  if ((resources.g || 0) < (req.g || 0)) return { ok: false };
  const hasAdventurers = advTypes.every((type) => (resources[type] || 0) >= (req[type] || 0));
  if (hasAdventurers) return { ok: true, fusion: null };
  if (!allowFusion) return { ok: false };
  const fusion = findFusionPath(resources, req);
  return fusion ? { ok: true, fusion } : { ok: false };
}

function findFusionPath(resources, req) {
  const start = advTypes.map((type) => resources[type] || 0);
  const target = advTypes.map((type) => req[type] || 0);
  const enough = (counts) => target.every((need, index) => counts[index] >= need);
  if (enough(start)) return { finalCounts: start, path: [] };

  const queue = [{ counts: start, path: [] }];
  const seen = new Set([start.join(",")]);
  const maxSteps = start.reduce((a, b) => a + b, 0);

  while (queue.length) {
    const current = queue.shift();
    if (current.path.length > maxSteps) continue;
    for (let from = 0; from < 4; from += 1) {
      if (current.counts[from] < 2) continue;
      for (let to = 0; to < 4; to += 1) {
        if (to === from) continue;
        const next = current.counts.slice();
        next[from] -= 2;
        next[to] += 1;
        const key = next.join(",");
        if (seen.has(key)) continue;
        const path = current.path.concat([[advTypes[from], advTypes[to]]]);
        if (enough(next)) return { finalCounts: next, path };
        seen.add(key);
        queue.push({ counts: next, path });
      }
    }
  }
  return null;
}

function fusionPathText(fusion) {
  const path = fusion?.path || [];
  return path.length ? path.map(([from, to]) => `${resourceName(from)}→${resourceName(to)}`).join("，") : "无需转换";
}

function completeShadowQuest(result) {
  const card = result.card;
  const req = parseTokens(card.requirements);
  const reward = parseTokens(card.rewards);

  if (result.fusion) {
    advTypes.forEach((type, index) => {
      state.shadow[type] = result.fusion.finalCounts[index];
    });
    addLog(`邪能融合：${fusionPathText(result.fusion)}。`);
  }

  spendResources(req);
  const vpGain = (reward.v || 0) * (result.fusion ? 2 : 1);
  const nonVpReward = { ...reward };
  delete nonVpReward.v;
  addResources(nonVpReward);
  adjustShadow("vp", vpGain, false);
  state.shadow.completed += 1;
  state.shadow.activeQuests = state.shadow.activeQuests.filter((_, index) => index !== result.index);
  addLog(`暗影领主完成任务 ${labelForCard(card)}，获得 ${vpGain} 胜点${result.fusion ? "（邪能融合翻倍一次）" : ""}。`);
}

function handleAction(action, target) {
  if (action === "confirm-shadow") confirmShadowAction();
  if (action === "reroll-shadow") planShadowAction({
    harborReassign: Boolean(state.pending?.harborReassign),
    ambassadorAction: Boolean(state.pending?.ambassadorAction),
    sourceHarbor: state.pending?.sourceHarbor,
  });
  if (action === "force-cliffwatch") {
    planShadowAction({
      forcedTarget: "cliffwatch",
      harborReassign: Boolean(state.pending?.harborReassign),
      ambassadorAction: Boolean(state.pending?.ambassadorAction),
      sourceHarbor: state.pending?.sourceHarbor,
    });
  }
  if (action === "quick-quest-done") {
    state.shadowNeedsQuest = false;
    addLog(`${state.pending?.source || "任务判定"}：任务已处理并补牌。`);
    finishQuickDecision();
  }
  if (action === "quest-check-has-tasks") {
    finishShadowQuestCheck(false);
  }
  if (action === "quest-check-no-tasks") {
    finishShadowQuestCheck(true);
  }
  if (action === "quick-builder-bought") {
    addLog("建造者大厅：买建筑，加入高级建筑并补牌。");
    finishQuickDecision();
  }
  if (action === "quick-builder-block") {
    addLog("暗影领主买不起建筑，只霸占建造者大厅工位。");
    finishQuickDecision();
  }
  if (action === "quick-complete") {
    completeQuickQuest(Number(target.dataset.index), target.dataset.fusion === "1");
  }
  if (action === "complete-recommended") {
    const result = bestCompletableQuest();
    if (result) completeShadowQuest(result);
    render();
  }
  if (action === "remove-quest") {
    state.shadow.activeQuests = state.shadow.activeQuests.filter((id, index) => index !== Number(target.dataset.index));
    render();
  }
  if (action === "space") {
    handleSpaceSelection(target.dataset.space);
    return;
  }
  if (action === "add-custom-slot") {
    addCustomSlot();
  }
  if (action === "edit-custom-name") {
    startCustomNameEdit(target.dataset.editSpace);
  }
  if (action === "toggle-special-adjust") {
    toggleSpecialAdjust();
  }
  if (action === "set-free-edit-mode") {
    setFreeEditMode(target.dataset.mode);
  }
  if (action === "set-board-owner") {
    setBoardOwnerFromEditor(target.dataset.space, target.dataset.owner);
    return;
  }
  if (action === "set-board-co-owner") {
    setBoardCoOwnerFromEditor(target.dataset.space, target.dataset.owner);
    return;
  }
  if (action === "set-special-place-owner") {
    setSpecialPlaceOwner(target.dataset.owner);
  }
  if (action === "recover-agent") {
    recoverAgentFromSpace(target.dataset.space);
  }
  if (action === "start-special-move") {
    startSpecialMove(target.dataset.space);
  }
  if (action === "cancel-special-move") {
    state.pendingSpecialMove = null;
    render();
  }
  if (action === "set-special-owner") {
    setSpecialOwner(target.dataset.agent, target.dataset.owner);
    render();
  }
  if (action === "set-first-player") {
    setFirstPlayer(target.dataset.owner);
    render();
  }
  if (action === "resource") {
    adjustShadow(target.dataset.resource, Number(target.dataset.delta));
  }
  if (action === "buy-builder") {
    shadowBuyBuilder(Number(target.dataset.index));
    render();
  }
  if (action === "clear-builder") {
    state.builder[Number(target.dataset.index)] = { id: null, vp: 0 };
    render();
  }
  if (action === "clear-cliff") {
    state.cliffwatch[Number(target.dataset.index)] = null;
    render();
  }
  if (action === "remove-advanced") {
    const index = Number(target.dataset.index);
    state.advanced.splice(index, 1);
    delete state.occupied[`adv_${index}`];
    delete state.coOccupied[`adv_${index}`];
    state.occupied = renumberAdvancedOccupancy(state.occupied);
    state.coOccupied = renumberAdvancedOccupancy(state.coOccupied);
    render();
  }
  if (action === "harbor-done") {
    const nextHarbor = nextHarborEntry();
    if (nextHarbor?.owner === "human" && !state.pendingHarborTarget) {
      addLog("深水港重指派：请先在版图上选择一个非深水港的未占用行动格。");
      render();
      return;
    }
    if (state.pendingHarborTarget && targetForSpace(state.pendingHarborTarget) === "castle") {
      claimFirstPlayer("human", "你在深水港重指派时拿到先手标记，并抽 1 张阴谋。");
    }
    completeHarborReassign(nextHarbor?.space);
    state.pendingHarborTarget = null;
    state.phase = state.harborQueue.length ? "harbor" : "endRound";
    continueAfterTurnTransition();
  }
  if (action === "harbor-shadow") {
    const nextHarbor = nextHarborEntry();
    planShadowAction({ harborReassign: true, sourceHarbor: nextHarbor?.space });
  }
}

function render() {
  document.body.classList.toggle("is-configured", Boolean(state.configured));
  state.decisionMode = "quick";
  state.customSlotCount = normalizeCustomSlotCount(state.customSlotCount, state.occupied);
  state.coOccupied = normalizeCoOccupied(state.coOccupied);
  state.boardUnlocked = Boolean(state.boardUnlocked);
  state.boardEditSpace = normalizeBoardEditSpace(state.boardEditSpace);
  state.freeEditMode = normalizeFreeEditMode(state.freeEditMode);
  state.customSlotNames = normalizeCustomSlotNames(state.customSlotNames);
  if (!isCustomActionSpace(state.editingCustomName)) state.editingCustomName = null;
  state.specialAdjust = false;
  state.specialPlaceOwner = normalizeOccupantOwner(state.specialPlaceOwner);
  state.pendingSpecialMove = normalizePendingSpecialMove(state.pendingSpecialMove);
  els.moduleSelect.value = state.module;
  state.firstPlayer = normalizePlayer(state.firstPlayer);
  syncSetupFirstPlayerButtons();
  els.longGameToggle.checked = state.longGame;
  els.firstPlayToggle.checked = Boolean(state.firstPlay);
  els.setupPanel.style.display = state.configured ? "none" : "block";
  renderStateStrip();
  renderNextCard();
  renderPrimaryAction();
  renderBoardLock();
  renderBoard();
  renderSpecialAgentTools();
  renderFinalScore();
  renderLog();
  saveState();
}

function renderPrimaryAction() {
  const config = primaryActionConfig();
  els.nextBtn.textContent = config.label;
  els.nextBtn.disabled = Boolean(config.disabled);
}

function renderBoardLock() {
  if (!els.boardLockBtn) return;
  els.boardLockBtn.classList.toggle("secondary", state.boardUnlocked);
  els.boardLockBtn.classList.toggle("ghost", !state.boardUnlocked);
  els.boardLockBtn.setAttribute("aria-label", state.boardUnlocked ? "锁定行动格编辑" : "解锁行动格编辑");
  const text = els.boardLockBtn.querySelector(".lock-text");
  if (text) text.textContent = state.boardUnlocked ? "已解锁" : "锁定";
}

function primaryActionConfig() {
  if (!state.configured) return { label: "开始" };
  if (state.pending?.kind === "quickQuest") return { label: "已处理，继续" };
  if (state.pending?.kind === "quickBuilder") return { label: "先选择", disabled: true };
  if (state.pending?.kind === "shadowQuestCheck") return { label: "先查任务", disabled: true };
  if (state.pending?.kind === "shadowAction") return state.pending.advancedBlocked ? { label: "请重掷", disabled: true } : { label: "确认" };
  if (state.phase === "startRound") return { label: "开始本轮" };
  if (state.phase === "ambassador") return { label: state.pendingAmbassadorSpace ? "大使完成" : "选大使格", disabled: !state.pendingAmbassadorSpace };
  if (state.phase === "shadowTurn") return { label: "判定行动" };
  if (state.phase === "humanTurn") return { label: state.pendingHumanSpace ? "我的回合完成" : "先选行动格", disabled: !state.pendingHumanSpace };
  if (state.phase === "harbor") {
    const nextHarbor = nextHarborEntry();
    if (nextHarbor?.owner === "shadow") return { label: "判定重指派" };
    if (nextHarbor?.owner === "human") return { label: "先处理港口", disabled: true };
    return { label: "继续" };
  }
  if (state.phase === "endRound") return { label: "进入下一轮" };
  if (state.phase === "final") return { label: "已结束", disabled: true };
  return { label: "继续" };
}

function renderStateStrip() {
  const chips = [
    { label: "模组", value: moduleName(state.module) },
    { label: "轮", value: state.configured ? `${state.round}/8` : "-" },
    { label: "先手标记", value: firstPlayerText(state.firstPlayer) },
    { label: "代理人", value: `${state.agents.shadow}/${totalAgentsFor("shadow")} 暗影领主 · ${state.agents.human}/${totalAgentsFor("human")} 我` },
    { label: "模式", value: "流程提示" },
  ];
  els.stateStrip.innerHTML = chips
    .map((chip) => `<span class="chip">${chip.label} <strong>${chip.html ? chip.value : escapeHtml(chip.value)}</strong></span>`)
    .join("");
}

function renderNextCard() {
  els.phasePill.textContent = phaseName(state.phase);
  if (!state.configured) {
    els.stepTitle.textContent = "准备开局";
    els.nextCard.innerHTML = `
      <h3>先按实体桌面完成设置</h3>
      <p>选择模组后点击“开始”。应用会从第 1 轮的轮开始步骤接管流程提示。</p>
    `;
    return;
  }

  if (state.pending?.kind === "quickQuest") {
    const pending = state.pending;
    const fusionGuide = state.firstPlay
      ? `<span class="quiet-strike">如果没有正常可完成的，再预判有没有可在本回合末通过邪能融合完成的任务。</span>`
      : "如果没有正常可完成的，再预判有没有可在本回合末通过邪能融合完成的任务。";
    els.stepTitle.textContent = "任务判定";
    els.nextCard.innerHTML = `
      <h3>${escapeHtml(pending.source)}：拿 1 张任务</h3>
      ${diceTrayHtml([{ sides: 4, value: pending.d4, label: "崖望旅馆位置" }])}
      <p>${pending.refreshed ? "先把崖望旅馆 4 张任务全部弃掉并翻新。" : ""}按暗影领主的任务选择优先级，在崖望旅馆牌列中选 1 张任务。</p>
      ${guideList([
        `${inlineResource("v")} 先看实体桌面上有没有暗影领主可正常完成的任务；若多张并列，优先任务胜点高的。`,
        fusionGuide,
        `如果以上优先级仍无法选出，或你想快速处理，就按骰面 ${dicePill(4, pending.d4)}，从崖望旅馆 1-4 位置拿任务。`,
        `${inlineEffect("quest")} 拿走后给崖望旅馆补牌；回合末再检查暗影领主是否完成任务。`,
      ])}
      <div class="button-row" style="margin-top:12px">
        <button class="primary" data-action="quick-quest-done" type="button">已按实体桌面处理</button>
      </div>
    `;
    return;
  }

  if (state.pending?.kind === "quickBuilder") {
    els.stepTitle.textContent = "建筑购买判定";
    els.nextCard.innerHTML = `
      <h3>建造者大厅：判定暗影领主购买建筑</h3>
      <p>比较建造者大厅的 3 张待购建筑。</p>
      ${guideList([
        "只在暗影领主买得起的建筑中比较。",
        `第一优先：拥有者收益能给暗影领主最多 ${inlineResource("v")} 的建筑。`,
        `若并列：选择建筑上 ${inlineResource("v")} 标记最多的建筑。`,
        "若仍并列：选择价格最高的建筑。",
        "如果没有买得起的建筑，暗影领主只霸占建造者大厅工位，不购买建筑。",
      ])}
      <div class="button-row" style="margin-top:12px">
        <button class="primary" data-action="quick-builder-bought" type="button">已购买建筑</button>
        <button class="secondary" data-action="quick-builder-block" type="button">买不起：只霸占工位</button>
      </div>
    `;
    return;
  }

  if (state.pending?.kind === "shadowQuestCheck") {
    const fusion = fusionTermHtml();
    els.stepTitle.textContent = "回合末任务检查";
    els.nextCard.innerHTML = `
      <h3>检查暗影领主是否完成任务</h3>
      <p>在暗影领主每个代理人行动完成后，按实体桌面检查进行中任务。</p>
      ${guideList([
        `先看有没有直接支付资源就可以完成的任务；若多张可完成，优先完成任务 ${inlineResource("v")} 最高的。`,
        `没有正常可完成的任务时，才在此时考虑${fusion}；转换必须有助于完成任务。`,
        `通过${fusion}完成的任务，只把任务奖励里的 ${inlineResource("v")} 翻倍一次；不要按转换次数继续叠倍。`,
        "完成后支付需求、结算奖励；若还能继续完成任务，就继续按以上优先级处理。",
        "最后确认暗影领主是否已经没有进行中任务；如果没有，下一次指派优先去崖望旅馆拿任务。",
      ])}
      <div class="button-row" style="margin-top:12px">
        <button class="primary" data-action="quest-check-has-tasks" type="button">${inlineEffect("quest")}仍有进行中任务，继续</button>
        <button class="secondary" data-action="quest-check-no-tasks" type="button">${inlineEffect("completed")}已经没有进行中任务</button>
      </div>
    `;
    return;
  }

  if (state.pending?.kind === "shadowAction") {
    const pending = state.pending;
    const target = targetNames[pending.target] || pending.target;
    const finalSpace = pending.spaceId ? displaySpaceName(pending.spaceId) : "无可用行动格";
    const dice = pending.roll ? [{ sides: pending.tableDie, value: pending.roll, label: "行动表" }] : [];
    if (pending.d10) dice.push({ sides: 10, value: pending.d10, label: "高级建筑" });
    const actionGuides = pending.manualAdvanced
      ? [
          "如果实体桌面没有任何已建成高级建筑，重掷行动骰。",
          "按说明书顺序只数有建筑板块的高级建筑格：左列从上到下，再右列从上到下；数到底后回到左列顶部继续数。",
          `占用的高级建筑也参与计数。用 ${dicePill(10, pending.d10)} 数到对应建筑；若该建筑已占用，就沿同一顺序顺延到下一个未占用高级建筑。`,
          "如果所有已建成高级建筑都已占用，没有可用高级建筑，就重掷行动骰。",
          "执行该建筑牌面；拥有者收益、费用和特殊效果都在实体桌面处理。",
          `${inlineEffect("building")} 确认后，应用会在版图底部的“高级建筑”区域记录这次占用；可以随后编辑建筑名。`,
        ]
      : pending.advancedBlocked
        ? [
            `按 ${dicePill(10, pending.d10)} 检查下方高级建筑列表，但所有已记录高级建筑都已占用。`,
            "按 solo 规则没有可用高级建筑时，重掷行动骰；也可以先添加漏记的高级建筑后重新判定。",
          ]
      : pending.maintainedAdvanced
        ? [
            `执行：${actionHintForSpaceHtml(pending.spaceId)}`,
            `按 ${dicePill(10, pending.d10)} 在下方高级建筑列表中数到 ${escapeHtml(displaySpaceName(pending.spaceId))}${pending.fallback ? "；骰中建筑已占用，所以顺延到此建筑" : ""}。`,
            `${inlineEffect("arrow")} 执行完后点击确认，下一步会进入回合末任务检查。`,
          ]
      : [
          `执行：${actionHintForSpaceHtml(pending.spaceId)}`,
          `${inlineEffect("arrow")} 执行完后点击确认，下一步会进入回合末任务检查。`,
        ];
    els.stepTitle.textContent = pending.ambassadorAction ? "暗影领主指派大使" : pending.harborReassign ? "暗影领主港口重指派" : "暗影领主行动";
    els.nextCard.innerHTML = `
      <h3>${escapeHtml(finalSpace)}</h3>
      ${diceTrayHtml(dice)}
      <p>${pending.forcedCliff ? "暗影领主没有进行中任务，本次必须去崖望旅馆。" : `目标：${escapeHtml(target)}。`}
      ${pending.fallback && !pending.maintainedAdvanced && !pending.advancedBlocked ? "原目标被占，已按顺时针顺延到下一空位。" : ""}</p>
      ${guideList(actionGuides)}
      <div class="button-row" style="margin-top:12px">
        ${pending.advancedBlocked ? "" : `<button class="primary" data-action="confirm-shadow" type="button">确认已执行</button>`}
        <button class="secondary" data-action="reroll-shadow" type="button">重掷 / 重新判定</button>
      </div>
    `;
    return;
  }

  if (state.phase === "startRound") {
    els.stepTitle.textContent = `第 ${state.round} 轮开始`;
    els.nextCard.innerHTML = `
      <h3>轮开始步骤</h3>
      ${guideList([
        `从当前轮次格移走 ${inlineResource("v", 3)}，放到建造者大厅的待购建筑上：每张 ${inlineResource("v")}。`,
        "结算所有“购买时 / 轮开始”建筑效果。",
        `暗影领主获得等同于轮数的金币：本轮 ${inlineResource("g", state.round)}。`,
        state.round === 5 ? "双方加入额外代理人。" : "然后由持有先手标记的一方开始本轮。",
      ])}
    `;
    return;
  }

  if (state.phase === "shadowTurn") {
    els.stepTitle.textContent = "轮到暗影领主";
    els.nextCard.innerHTML = `
      <h3>暗影领主行动准备</h3>
      ${diceTrayHtml([{ sides: actionTables[state.module].die, value: "?", label: "行动表" }])}
      <p>暗影领主回合通常会自动掷骰并给出行动格。如果页面停在这里，点击下方主按钮继续判定。</p>
    `;
    return;
  }

  if (state.phase === "ambassador") {
    els.stepTitle.textContent = "指派大使";
    els.nextCard.innerHTML = `
      <h3>本轮开始前先指派大使</h3>
      ${guideList([
        "在版图上选择一个未占用行动格，放置大使并执行该行动。",
        "如果大使去已建成高级建筑，选择底部“高级建筑”里的对应建筑；若还没有记录，先添加建筑。",
        "大使执行行动后，占用该行动格；它对所有玩家都算作对手代理人。",
        "如果把大使放到深水港，它不会在轮末重指派。",
        state.pendingAmbassadorSpace ? `已选择：${escapeHtml(displaySpaceName(state.pendingAmbassadorSpace))}。` : "当前可选行动格已经高亮。",
      ])}
    `;
    return;
  }

  if (state.phase === "humanTurn") {
    els.stepTitle.textContent = "轮到你";
    els.nextCard.innerHTML = `
      <h3>指派 1 个代理人</h3>
      <ul>
        <li>在版图上选择一个高亮的未占用行动格，放置你的代理人并执行该行动。</li>
        <li>如果你去已建成高级建筑，或用样品等效果指派到待购建筑，选择底部“高级建筑”里的对应建筑；若还没有记录，先添加建筑。</li>
        <li>你可以完成 1 个任务；若去了深水港，稍后会进入港口重指派。</li>
        <li>${state.pendingHumanSpace ? `已选择：${escapeHtml(displaySpaceName(state.pendingHumanSpace))}。` : "选择行动格后，下方按钮才会继续。"}</li>
      </ul>
    `;
    return;
  }

  if (state.phase === "harbor") {
    renderHarborCard();
    return;
  }

  if (state.phase === "endRound") {
    els.stepTitle.textContent = "轮结束";
    els.nextCard.innerHTML = `
      <h3>收回代理人</h3>
      <p>所有深水港代理人都已重指派。收回双方所有代理人，然后点击下方主按钮进入下一轮。</p>
    `;
    return;
  }

  if (state.phase === "final") {
    els.stepTitle.textContent = "最终计分";
    els.nextCard.innerHTML = `
      <h3>最终计分</h3>
      ${guideList([
        "按实体桌面把双方信息填入下方“终局计分表”。",
        `暗影领主也计当前 ${inlineResource("v")}、酒馆冒险者、每 ${inlineResource("g", 2)} = ${inlineResource("v")}、每个完成任务 ${inlineResource("v", 4)}。`,
        state.module === "skullport" ? `骷髅港：暗影领主的 ${inlineResource("x")} 按当前腐化轨数值正向得分。` : "本局没有骷髅港腐化正向计分。",
      ])}
    `;
  }
}

function renderHarborCard() {
  els.stepTitle.textContent = "深水港重指派";
  const next = nextHarborEntry();
  if (!next) {
    state.phase = "endRound";
    renderNextCard();
    return;
  }
  if (next.owner === "shadow") {
    els.nextCard.innerHTML = `
      <h3>暗影领主的 ${displaySpaceName(next.space)}</h3>
      <p>按深水港编号顺序重指派。暗影领主不能重指派到深水港；点击下方按钮为它重新判定行动格。</p>
      <div class="button-row" style="margin-top:12px">
        <button class="primary" data-action="harbor-shadow" type="button">判定暗影领主重指派</button>
      </div>
    `;
  } else {
    els.nextCard.innerHTML = `
      <h3>你的 ${displaySpaceName(next.space)}</h3>
      <p>在版图上选择一个非深水港的高亮空位，重指派该代理人，执行行动并最多完成 1 个任务。若去高级建筑，选择底部“高级建筑”里的对应建筑。</p>
      ${state.pendingHarborTarget ? `<p>已选择：${escapeHtml(displaySpaceName(state.pendingHarborTarget))}。</p>` : ""}
      <div class="button-row" style="margin-top:12px">
        <button class="primary" data-action="harbor-done" type="button" ${state.pendingHarborTarget ? "" : "disabled"}>该港口代理人已处理</button>
      </div>
    `;
  }
}

function renderHarborActionButton() {
  const button = els.nextCard.querySelector('[data-action="harbor-done"]');
  if (button) button.disabled = !state.pendingHarborTarget;
}

function renderBoard() {
  const items = boardDisplayItems();
  const orderKey = items.map((item) => item.key).join("|");
  els.boardGrid.classList.toggle("board-layout-base", state.module === "base");
  els.boardGrid.classList.toggle("free-edit", state.boardUnlocked);
  if (els.boardGrid.dataset.orderKey === orderKey) {
    updateBoardOccupancy();
    return;
  }

  const html = items.map((item) => {
    if (item.type === "group") return spaceGroupHtml(item.label, item.spaces, item.options);
    return spaceButtonHtml(item.space, item.className || "");
  });
  els.boardGrid.innerHTML = html.join("");
  els.boardGrid.dataset.orderKey = orderKey;
  updateBoardOccupancy();
}

function boardDisplayItems() {
  if (state.module === "base") {
    return [
      boardGroupItem("inn", "崖望旅馆", ["cliffA", "cliffB", "cliffC"]),
      boardSpaceItem("field"),
      boardSpaceItem("grinning"),
      boardSpaceItem("blackstaff"),
      boardSpaceItem("plinth"),
      boardSpaceItem("castle"),
      boardSpaceItem("aurora"),
      boardGroupItem("harbor", "深水港", ["harbor1", "harbor2", "harbor3"], compactGroupOptions(["1", "2", "3"])),
      boardSpaceItem("builder"),
      boardGroupItem("custom", "高级建筑", customActionSpaces(), { sharedTitle: true, custom: true, keySuffix: advancedGroupSignature() }),
    ];
  }

  const spaces = currentOrder();
  const items = [];
  for (let index = 0; index < spaces.length; index += 1) {
    const spaceId = spaces[index];
    if (spaceId === "cliffA") {
      items.push(boardGroupItem("inn", "崖望旅馆", ["cliffA", "cliffB", "cliffC"]));
      index += 2;
      continue;
    }
    if (spaceId === "harbor1") {
      items.push(boardGroupItem("harbor", "深水港", ["harbor1", "harbor2", "harbor3"], compactGroupOptions(["1", "2", "3"])));
      index += 2;
      continue;
    }
    items.push(boardSpaceItem(spaceId));
  }
  items.push(boardGroupItem("custom", "高级建筑", customActionSpaces(), { sharedTitle: true, custom: true, keySuffix: advancedGroupSignature() }));
  return items;
}

function boardSpaceItem(space, className = "") {
  return { type: "space", key: `space:${space}:${className}`, space, className };
}

function boardGroupItem(key, label, spaces, options = {}) {
  return { type: "group", key: `group:${key}:${spaces.join(",")}:${options.compact ? "compact" : "wide"}:${options.custom ? "custom" : "plain"}:${options.keySuffix || ""}`, label, spaces, options };
}

function compactGroupOptions(segmentLabels) {
  return { compact: true, sharedTitle: true, segmentLabels };
}

function spaceGroupHtml(label, spaces, options = {}) {
  const classes = ["space-group", options.compact ? "compact" : "", options.sharedTitle ? "has-title" : "", options.custom ? "custom-action-group" : ""].filter(Boolean).join(" ");
  return `
    <div class="${classes}" aria-label="${escapeHtml(label)}">
      ${options.sharedTitle ? `<span class="space-group-title">${escapeHtml(label)}</span>` : ""}
      ${spaces.map((spaceId, index) => options.custom ? advancedBuildingSlotHtml(spaceId) : spaceButtonHtml(spaceId, "space-segment", { label: options.segmentLabels?.[index] })).join("")}
      ${options.custom ? `<div class="custom-group-tools"><button class="ghost tiny" data-action="add-custom-slot" type="button" aria-label="添加高级建筑">添加</button></div>` : ""}
    </div>
  `;
}

function advancedBuildingSlotHtml(spaceId) {
  const isEditing = state.editingCustomName === spaceId;
  const name = customSlotName(spaceId);
  return `
    <div class="advanced-slot-wrap">
      ${isEditing
        ? `<input class="advanced-title-input" data-custom-name="${spaceId}" value="${escapeHtml(customSlotNames()[spaceId] || "")}" placeholder="${escapeHtml(name)}" aria-label="建筑名字">`
        : `<button class="advanced-title-button" data-action="edit-custom-name" data-edit-space="${spaceId}" type="button" title="点击改名">${escapeHtml(name)}</button>`}
      ${spaceButtonHtml(spaceId, "space-segment advanced-space-action", { hideName: true })}
    </div>
  `;
}

function spaceButtonHtml(spaceId, extraClass = "", options = {}) {
  const owner = state.occupied[spaceId];
  const cls = ["space-btn", extraClass, owner || ""].filter(Boolean).join(" ");
  const label = ownerLabel(owner);
  const art = artForSpace(spaceId);
  const name = options.label || displaySpaceName(spaceId);
  return `
    <button class="${cls}" data-action="space" data-space="${spaceId}" type="button" aria-label="${escapeHtml(name)}">
      <span class="space-art-wrap"><img class="space-art" src="./assets/${art}" alt=""></span>
      <span class="space-copy">
        ${options.hideName ? "" : `<strong>${escapeHtml(name)}</strong>`}
        ${spaceEffectHtml(spaceId)}
        <small>${label}</small>
      </span>
      <span class="co-badge" aria-hidden="true"></span>
    </button>
  `;
}

function updateBoardOccupancy() {
  els.boardGrid.querySelectorAll("[data-space]").forEach((button) => {
    const spaceId = button.dataset.space;
    const owner = state.occupied[spaceId];
    const coOwner = state.coOccupied?.[spaceId];
    button.classList.toggle("human", owner === "human");
    button.classList.toggle("shadow", owner === "shadow");
    button.classList.toggle("ambassador", owner === "ambassador");
    button.classList.toggle("co-human", coOwner === "human");
    button.classList.toggle("co-shadow", coOwner === "shadow");
    button.classList.toggle("co-ambassador", coOwner === "ambassador");
    button.classList.toggle("editing", state.boardUnlocked && state.boardEditSpace === spaceId);
    const label = ownerLabel(owner);
    const status = button.querySelector("small");
    if (status) status.textContent = label;
    const badge = button.querySelector(".co-badge");
    if (badge) {
      badge.hidden = !coOwner;
      badge.textContent = coOwner ? `共占 ${coOwnerText(coOwner)}` : "";
    }
  });
  updateBoardInteractivity();
}

function ownerLabel(owner) {
  if (owner === "shadow") return "暗影领主占用";
  if (owner === "human") return "我占用";
  if (owner === "ambassador") return "特殊代理人占用";
  return "空";
}

function updateBoardInteractivity() {
  const mode = boardPlacementMode();
  els.boardGrid.querySelectorAll("[data-space]").forEach((button) => {
    const selectable = canSelectSpace(button.dataset.space, mode);
    button.disabled = !selectable;
    button.classList.toggle("placeable", selectable);
  });
}

function renderSpecialAgentTools() {
  if (!els.specialAgentTools) return;
  els.specialAgentTools.innerHTML = `
    <div>
      <strong>标记与特殊代理人</strong>
      <span>归属；行动格解锁后可编辑占用与共占。</span>
    </div>
    <div class="special-agent-rows">
      ${firstPlayerOwnerRow()}
      ${specialAgentOwnerRow("lieutenant", "副官", "icon-lieutenant.png", state.special.lieutenantOwner)}
      ${specialAgentOwnerRow("ambassador", "大使", "icon-ambassador.png", state.special.ambassadorOwner)}
    </div>
    <div class="special-adjust-summary">
      <button class="ghost tiny" data-action="add-custom-slot" type="button" aria-label="添加高级建筑">添加</button>
    </div>
    ${state.boardUnlocked ? boardEditPanelHtml() : ""}
  `;
}

function boardEditPanelHtml() {
  const spaceId = normalizeBoardEditSpace(state.boardEditSpace);
  state.boardEditSpace = spaceId;
  const owner = normalizeOccupantOwner(state.occupied?.[spaceId]);
  const coOwner = normalizeOccupantOwner(state.coOccupied?.[spaceId]);
  return `
    <div class="free-edit-panel">
      <div class="board-edit-head">
        <strong>自由编辑</strong>
        <span>${spaceId ? `正在编辑：${escapeHtml(displaySpaceName(spaceId))}` : "点一个行动格后编辑。特殊用于大使或卡牌造成的额外代理人。"}</span>
      </div>
      ${spaceId ? `
        <div class="board-edit-card">
          <div class="board-edit-row">
            <span>占用</span>
            <div class="segmented-control four" role="group" aria-label="占用归属">
              ${boardOwnerButton(spaceId, "", "空", owner)}
              ${boardOwnerButton(spaceId, "human", "我", owner)}
              ${boardOwnerButton(spaceId, "shadow", "AI", owner)}
              ${boardOwnerButton(spaceId, "ambassador", "特殊", owner)}
            </div>
          </div>
          <div class="board-edit-row">
            <span>共占</span>
            <div class="segmented-control four" role="group" aria-label="共占归属">
              ${boardCoOwnerButton(spaceId, "", "无", coOwner, owner)}
              ${boardCoOwnerButton(spaceId, "human", "我", coOwner, owner)}
              ${boardCoOwnerButton(spaceId, "shadow", "AI", coOwner, owner)}
              ${boardCoOwnerButton(spaceId, "ambassador", "特殊", coOwner, owner)}
            </div>
          </div>
        </div>
      ` : ""}
    </div>
  `;
}

function boardOwnerButton(spaceId, owner, label, current) {
  const normalized = normalizeOccupantOwner(owner);
  const active = normalized === current || (!normalized && !current);
  return `<button class="${active ? "secondary" : "ghost"} tiny" data-action="set-board-owner" data-space="${spaceId}" data-owner="${owner}" type="button">${label}</button>`;
}

function boardCoOwnerButton(spaceId, owner, label, current, primaryOwner) {
  const normalized = normalizeOccupantOwner(owner);
  const active = normalized === current || (!normalized && !current);
  const disabled = normalized && normalized === primaryOwner ? "disabled" : "";
  return `<button class="${active ? "secondary" : "ghost"} tiny" data-action="set-board-co-owner" data-space="${spaceId}" data-owner="${owner}" type="button" ${disabled}>${label}</button>`;
}

function specialAdjustPanelHtml() {
  const move = normalizePendingSpecialMove(state.pendingSpecialMove);
  state.pendingSpecialMove = move;
  const occupied = Object.entries(state.occupied || {})
    .filter(([, owner]) => owner)
    .sort(([a], [b]) => boardSortValue(a) - boardSortValue(b));
  const placeOwner = normalizeOccupantOwner(state.specialPlaceOwner);
  return `
    <div class="special-adjust-panel">
      <div class="adjust-toolbar" role="group" aria-label="补记一次指派">
        <span>补记指派</span>
        ${specialPlaceButton("human", "我", placeOwner)}
        ${specialPlaceButton("shadow", "暗影领主", placeOwner)}
        ${specialPlaceButton("ambassador", "大使/特殊", placeOwner)}
        ${placeOwner ? `<button class="ghost tiny" data-action="set-special-place-owner" data-owner="" type="button">取消</button>` : ""}
      </div>
      ${move ? `<p class="adjust-hint">移动 ${escapeHtml(ownerShortLabel(move.owner))}：选空位。</p>
        <button class="ghost tiny" data-action="cancel-special-move" type="button">取消移动</button>` : ""}
      ${placeOwner ? `<p class="adjust-hint">选空位，补记${escapeHtml(ownerShortLabel(placeOwner))}。</p>` : ""}
      <div class="adjust-list">
        ${occupied.length ? occupied.map(([spaceId, owner]) => specialAdjustRowHtml(spaceId, owner)).join("") : `<span class="adjust-empty">没有已占用行动格。</span>`}
      </div>
    </div>
  `;
}

function specialPlaceButton(owner, label, current) {
  return `<button class="${owner === current ? "secondary" : "ghost"} tiny" data-action="set-special-place-owner" data-owner="${owner}" type="button">${label}</button>`;
}

function specialAdjustRowHtml(spaceId, owner) {
  return `
    <div class="adjust-row">
      <span><strong>${escapeHtml(displaySpaceName(spaceId))}</strong><small>${escapeHtml(ownerLabel(owner))}</small></span>
      <button class="ghost tiny" data-action="start-special-move" data-space="${spaceId}" type="button">移动</button>
      <button class="danger tiny" data-action="recover-agent" data-space="${spaceId}" type="button">回收</button>
    </div>
  `;
}

function firstPlayerOwnerRow() {
  return `
    <div class="special-agent-row">
      <span class="special-agent-label"><img src="./assets/icon-first-player.png" alt="">先手标记</span>
      <div class="segmented-control two" role="group" aria-label="先手标记归属">
        ${firstPlayerButton("shadow", "暗影领主")}
        ${firstPlayerButton("human", "我")}
      </div>
    </div>
  `;
}

function firstPlayerButton(owner, label) {
  return `<button class="${owner === state.firstPlayer ? "secondary" : "ghost"} tiny" data-action="set-first-player" data-owner="${owner}" type="button">${label}</button>`;
}

function specialAgentOwnerRow(agent, label, icon, owner) {
  return `
    <div class="special-agent-row">
      <span class="special-agent-label"><img src="./assets/${icon}" alt="">${label}</span>
      <div class="segmented-control" role="group" aria-label="${label}归属">
        ${specialOwnerButton(agent, "none", "无人", owner)}
        ${specialOwnerButton(agent, "human", "我", owner)}
        ${specialOwnerButton(agent, "shadow", "暗影领主", owner)}
      </div>
    </div>
  `;
}

function specialOwnerButton(agent, owner, label, current) {
  return `<button class="${owner === current ? "secondary" : "ghost"} tiny" data-action="set-special-owner" data-agent="${agent}" data-owner="${owner}" type="button">${label}</button>`;
}

function syncSetupFirstPlayerButtons() {
  document.querySelectorAll("[data-setup-first]").forEach((button) => {
    const active = button.dataset.owner === state.firstPlayer;
    button.classList.toggle("secondary", active);
    button.classList.toggle("ghost", !active);
  });
}

function setFirstPlayer(owner) {
  const normalized = normalizePlayer(owner);
  if (state.firstPlayer === normalized && state.configured) return;
  state.firstPlayer = normalized;
  if (!state.configured) {
    state.currentTurn = normalized;
    return;
  }
  const timing = state.phase === "startRound" ? "本轮轮开始会按此标记决定先手。" : "之后的轮开始会按此标记决定先手。";
  addLog(`先手标记归属：${firstPlayerText(normalized)}。${timing}`);
}

function claimFirstPlayer(owner, message) {
  const normalized = normalizePlayer(owner);
  state.firstPlayer = normalized;
  addLog(`${message}之后的轮开始由${firstPlayerText(normalized)}先行动。`);
}

function setSpecialOwner(agent, owner) {
  const normalized = normalizeOwner(owner);
  if (agent === "lieutenant") {
    state.special.lieutenantOwner = normalized;
    if (state.agents.human > totalAgentsFor("human")) state.agents.human = totalAgentsFor("human");
    if (state.agents.shadow > totalAgentsFor("shadow")) state.agents.shadow = totalAgentsFor("shadow");
    addLog(`副官归属：${ownerText(normalized)}。`);
  }
  if (agent === "ambassador") {
    state.special.ambassadorOwner = normalized;
    if (normalized === "none") {
      clearPendingAmbassadorSpace();
      state.special.ambassadorSpace = null;
    }
    addLog(`大使归属：${ownerText(normalized)}。`);
  }
}

function ownerText(owner) {
  return owner === "human" ? "我" : owner === "shadow" ? "暗影领主" : "无人";
}

function firstPlayerText(owner) {
  return normalizePlayer(owner) === "human" ? "我" : "暗影领主";
}

function renderFinalScore() {
  if (!els.finalScoreBox) return;
  state.finalScore = normalizeFinalScore(state.finalScore);
  const totals = finalScoreTotals();
  const isSkullport = state.module === "skullport";
  const corruptionValue = state.finalScore.corruptionValue || 0;
  els.finalScoreBox.innerHTML = `
    <div class="score-note">
      ${inlineResource("v")} 分数轨 + 冒险者 + 每 ${inlineResource("g", 2)} + 奖励。
      暗影领主：任务每张 ${inlineResource("v", 4)}。
    </div>
    ${isSkullport ? `
      <label class="score-global">
        <span>${scoreIcon("res-corruption.png", "腐化")} 腐化每枚分值</span>
        ${scoreInput("", "corruptionValue", corruptionValue, { global: true })}
        <small>填最远空格绝对值；你扣，暗影领主加。</small>
      </label>
    ` : `
      <div class="score-note muted">${scoreIcon("res-corruption.png", "腐化")} 不计腐化。</div>
    `}
    <div class="score-columns">
      ${scoreSideCard("human", "我", totals.human)}
      ${scoreSideCard("shadow", "暗影领主", totals.shadow)}
    </div>
    <div class="score-total-strip">
      <div><span>我</span><strong data-score-grand="human">${totals.human.total}</strong></div>
      <div><span>暗影领主</span><strong data-score-grand="shadow">${totals.shadow.total}</strong></div>
      <p data-score-outcome>${finalScoreOutcome(totals)}</p>
    </div>
  `;
}

function scoreSideCard(side, title, total) {
  const data = state.finalScore[side];
  const isHuman = side === "human";
  const isSkullport = state.module === "skullport";
  return `
    <div class="score-card">
      <h3>${scoreIcon(isHuman ? "icon-waterdeep.png" : "icon-quest-completed.png", title)} ${title}</h3>
      ${scoreLine(side, "vp", "分数轨", "res-vp.png", data.vp, `${data.vp || 0} VP`)}
      ${adventurerScoreLine(side, data, total.adventurers)}
      ${scoreLine(side, "g", "金币", "res-gold.png", data.g, `每 2 金：${Math.floor((data.g || 0) / 2)} VP`)}
      ${isHuman
        ? scoreLine(side, "lord", "领主奖励", "icon-scroll.png", data.lord, "手填")
        : scoreLine(side, "completed", "完成任务", "icon-quest-completed.png", data.completed, `${data.completed || 0} x 4 = ${(data.completed || 0) * 4} VP`)}
      ${isSkullport
        ? scoreLine(side, "x", "腐化", "res-corruption.png", data.x, `${isHuman ? "-" : "+"}${(data.x || 0) * (state.finalScore.corruptionValue || 0)} VP`)
        : ""}
      ${scoreLine(side, "extra", "修正", "res-vp.png", data.extra, "手动", { signed: true })}
      <div class="score-card-total"><span>小计</span><strong data-score-card-total="${side}">${total.total}</strong></div>
    </div>
  `;
}

function scoreLine(side, field, label, icon, value, note, options = {}) {
  return `
    <label class="score-line">
      <span class="score-label">${scoreIcon(icon, label)} ${label}</span>
      ${scoreInput(side, field, value, options)}
      <small data-score-note="${side}-${field}">${note}</small>
    </label>
  `;
}

function adventurerScoreLine(side, data, adventurerTotal) {
  return `
    <div class="score-line adventurer-line">
      <span class="score-label">${scoreIcon("res-any.png", "冒险者")} 冒险者</span>
      <div class="score-adventurers">
        ${advTypes.map((type) => `
          <label>
            ${scoreIcon(resourceIcon(type), resourceName(type))}
            ${scoreInput(side, type, data[type])}
          </label>
        `).join("")}
      </div>
      <small data-score-note="${side}-adventurers">1 个 = 1 VP：${adventurerTotal} VP</small>
    </div>
  `;
}

function scoreInput(side, field, value, options = {}) {
  const signed = Boolean(options.signed);
  const attrs = options.global
    ? `data-score-global="${field}"`
    : `data-score-side="${side}" data-score-field="${field}"${signed ? ' data-score-signed="1"' : ""}`;
  return `<input class="score-input" ${attrs} type="number" inputmode="numeric" step="1" ${signed ? "" : 'min="0"'} value="${escapeHtml(value || 0)}">`;
}

function scoreIcon(file, alt) {
  return `<img class="score-icon" src="./assets/${file}" alt="${escapeHtml(alt)}">`;
}

function readScoreInput(value, signed = false) {
  const number = Number(value);
  if (!Number.isFinite(number)) return 0;
  const whole = Math.trunc(number);
  return signed ? whole : Math.max(0, whole);
}

function finalScoreTotals() {
  const score = normalizeFinalScore(state.finalScore);
  const corruptionValue = state.module === "skullport" ? score.corruptionValue || 0 : 0;
  return {
    human: sideScore(score.human, { corruptionValue, shadow: false }),
    shadow: sideScore(score.shadow, { corruptionValue, shadow: true }),
  };
}

function refreshFinalScoreNumbers() {
  if (!els.finalScoreBox) return;
  const totals = finalScoreTotals();
  const score = state.finalScore;
  updateScoreText('[data-score-note="human-adventurers"]', `1 个 = 1 VP：${totals.human.adventurers} VP`);
  updateScoreText('[data-score-note="shadow-adventurers"]', `1 个 = 1 VP：${totals.shadow.adventurers} VP`);
  updateScoreText('[data-score-note="human-g"]', `每 2 金：${totals.human.gold} VP`);
  updateScoreText('[data-score-note="shadow-g"]', `每 2 金：${totals.shadow.gold} VP`);
  updateScoreText('[data-score-note="shadow-completed"]', `${score.shadow.completed || 0} x 4 = ${(score.shadow.completed || 0) * 4} VP`);
  updateScoreText('[data-score-note="human-x"]', `-${(score.human.x || 0) * (score.corruptionValue || 0)} VP`);
  updateScoreText('[data-score-note="shadow-x"]', `+${(score.shadow.x || 0) * (score.corruptionValue || 0)} VP`);
  updateScoreText('[data-score-card-total="human"]', totals.human.total);
  updateScoreText('[data-score-card-total="shadow"]', totals.shadow.total);
  updateScoreText('[data-score-grand="human"]', totals.human.total);
  updateScoreText('[data-score-grand="shadow"]', totals.shadow.total);
  updateScoreText("[data-score-outcome]", finalScoreOutcome(totals));
}

function updateScoreText(selector, value) {
  const node = els.finalScoreBox?.querySelector(selector);
  if (node) node.textContent = value;
}

function sideScore(data, options) {
  const adventurers = advTypes.reduce((sum, type) => sum + (data[type] || 0), 0);
  const gold = Math.floor((data.g || 0) / 2);
  const corruption = (data.x || 0) * options.corruptionValue * (options.shadow ? 1 : -1);
  const special = options.shadow ? (data.completed || 0) * 4 : (data.lord || 0);
  const total = (data.vp || 0) + adventurers + gold + special + corruption + (data.extra || 0);
  return { adventurers, gold, corruption, special, total };
}

function finalScoreOutcome(totals) {
  if (totals.human.total > totals.shadow.total) return "你领先。";
  if (totals.shadow.total > totals.human.total) return "暗影领主领先。";
  const humanGold = state.finalScore.human.g || 0;
  const shadowGold = state.finalScore.shadow.g || 0;
  if (humanGold > shadowGold) return "总分相同；按原版平手规则，金币更多，你领先。";
  if (shadowGold > humanGold) return "总分相同；按原版平手规则，金币更多，暗影领主领先。";
  return "总分和金币都相同。";
}

function renderResources() {
  els.shadowResources.innerHTML = resourceDefs
    .map(([key, label, icon]) => {
      const value = state.shadow[key] || 0;
      return `
        <div class="resource-cell">
          <div class="resource-top">
            <span class="resource-name"><img src="./assets/${icon}" alt="">${label}</span>
            <span class="resource-value">${value}</span>
          </div>
          <div class="mini-controls">
            <button class="ghost tiny" data-action="resource" data-resource="${key}" data-delta="-1" type="button">-</button>
            <button class="ghost tiny" data-action="resource" data-resource="${key}" data-delta="1" type="button">+</button>
          </div>
        </div>
      `;
    })
    .join("");
}

function renderActiveQuests() {
  if (!state.shadow.activeQuests.length) {
    els.activeQuestList.innerHTML = `<div class="rule-box">无进行中任务；下次优先崖望旅馆。</div>`;
    return;
  }
  els.activeQuestList.innerHTML = state.shadow.activeQuests
    .map((entry, index) => {
      const card = questCardFromEntry(entry);
      if (!card) {
        return `
          <div class="quest-card quick-quest">
            <div class="quest-title">
              <strong>${escapeHtml(questLabelFromEntry(entry))}</strong>
              <button class="ghost tiny" data-action="remove-quest" data-index="${index}" type="button">移除</button>
            </div>
            <div class="meta">手动记录 · 按实体牌确认</div>
            <div class="quick-complete-row">
              <button class="secondary tiny" data-action="quick-complete" data-index="${index}" data-fusion="0" type="button">普通完成</button>
              <button class="secondary tiny" data-action="quick-complete" data-index="${index}" data-fusion="1" type="button">邪能融合完成</button>
            </div>
          </div>
        `;
      }
      return `
        <div class="quest-card">
          <div class="quest-title">
            <strong>${escapeHtml(labelForCard(card))}</strong>
            <button class="ghost tiny" data-action="remove-quest" data-index="${index}" type="button">移除</button>
          </div>
          <div class="meta">${questTypeName(card.questType)}${card.plot ? " · 剧情任务" : ""} · ${setName(card.set)}</div>
          ${tokenRow(card.requirements, "费用")}
          ${tokenRow(card.rewards, "奖励")}
        </div>
      `;
    })
    .join("");
}

function renderMarkets() {
  els.cliffwatchSlots.innerHTML = state.cliffwatch
    .map((id, index) => {
      const card = id ? cardById.get(id) : null;
      return `
        <div class="slot-card">
          <div class="slot-title">
            <strong>${index + 1}. ${card ? escapeHtml(labelForCard(card)) : "未选择任务"}</strong>
            <button class="ghost tiny" data-action="clear-cliff" data-index="${index}" type="button">清空</button>
          </div>
          ${card ? tokenRow(card.requirements, "费用") + tokenRow(card.rewards, "奖励") : ""}
          <select data-cliff-slot="${index}">
            <option value="">选择任务</option>
            ${questOptionsHtml(id)}
          </select>
        </div>
      `;
    })
    .join("");

  els.builderSlots.innerHTML = state.builder
    .map((slot, index) => {
      const card = slot.id ? cardById.get(slot.id) : null;
      return `
        <div class="slot-card">
          <div class="slot-title">
            <strong>${index + 1}. ${card ? escapeHtml(labelForCard(card)) : "未选择建筑"}</strong>
            <button class="ghost tiny" data-action="clear-builder" data-index="${index}" type="button">清空</button>
          </div>
          <div class="meta">费用：${card ? inlineResource("g", card.cost) : "-"} · 待购：${inlineResource("v", slot.vp || 0)}</div>
          ${card ? tokenRow(card.ownerResources, "拥有者") : ""}
          <select data-builder-slot="${index}">
            <option value="">选择建筑</option>
            ${buildingOptionsHtml(slot.id)}
          </select>
          <input data-builder-vp="${index}" type="number" min="0" value="${slot.vp || 0}" aria-label="待购建筑胜点">
          <button class="secondary tiny" data-action="buy-builder" data-index="${index}" type="button">暗影领主购买</button>
        </div>
      `;
    })
    .join("");
}

function renderAdvancedBuildings() {
  if (!state.advanced.length) {
    els.advancedBuildings.innerHTML = `<div class="rule-box">没有高级建筑；掷到时重掷。</div>`;
    return;
  }
  els.advancedBuildings.innerHTML = state.advanced
    .map((item, index) => {
      const card = item.id ? cardById.get(item.id) : null;
      return `
        <div class="building-card">
          <div class="quest-title">
            <strong>${index + 1}. ${card ? escapeHtml(labelForCard(card)) : escapeHtml(item.name || "未指定建筑")}</strong>
            <button class="ghost tiny" data-action="remove-advanced" data-index="${index}" type="button">移除</button>
          </div>
          <div class="meta">${card ? `费用 ${inlineResource("g", card.cost ?? 0)} · ${setName(card.set)}` : "按牌面执行"}</div>
          ${card ? tokenRow(card.staticResources, "行动") : ""}
          ${card ? tokenRow(card.ownerResources, "拥有者") : ""}
          <div class="owner-toggle compact-owner">
            <label>拥有者
              <select data-advanced-owner="${index}">
                <option value="shadow" ${item.owner === "shadow" ? "selected" : ""}>暗影领主</option>
                <option value="human" ${item.owner === "human" ? "selected" : ""}>我</option>
              </select>
            </label>
          </div>
        </div>
      `;
    })
    .join("");
}

function renderLog() {
  els.logList.innerHTML = state.log
    .slice(-80)
    .reverse()
    .map((line) => `<li>${escapeHtml(displayLogLine(line))}</li>`)
    .join("");
}

function displayLogLine(line) {
  return String(line)
    .replace("暗影领主买不起或你已判定只阻挡建造者大厅。", "暗影领主买不起建筑，只霸占建造者大厅工位。")
    .replace("只阻挡建造者大厅", "只霸占建造者大厅工位");
}

function fillCardOptions() {
  if (!els.questOptions) return;
  els.questOptions.innerHTML = quests
    .map((card) => `<option value="${escapeHtml(labelForCard(card))}"></option>`)
    .join("");
}

function preloadAssets(files) {
  if (typeof Image === "undefined") return;
  files.forEach((file) => {
    const image = new Image();
    image.decoding = "async";
    image.src = `./assets/${file}`;
  });
}

function addQuestFromSearch() {
  const value = els.questSearch.value.trim();
  const card = findCardByInput(value, quests);
  if (!card) return;
  state.shadow.activeQuests.push(card.id);
  state.shadowNeedsQuest = false;
  els.questSearch.value = "";
  addLog(`手动加入暗影领主进行中任务：${labelForCard(card)}。`);
  render();
}

function addAdvancedBuilding() {
  state.quickBuildingSerial = (state.quickBuildingSerial || 0) + 1;
  state.advanced.push({ id: null, owner: "human", name: `手动建筑 #${state.quickBuildingSerial}` });
  addLog("已添加高级建筑。");
  render();
}

function shadowBuyBuilder(index) {
  const slot = state.builder[index];
  const card = slot?.id ? cardById.get(slot.id) : null;
  if (!slot || !card) return;
  if ((state.shadow.g || 0) < card.cost) {
    addLog(`暗影领主买不起 ${labelForCard(card)}，只霸占建造者大厅工位。`);
    return;
  }
  adjustShadow("g", -card.cost, false);
  adjustShadow("vp", slot.vp || 0, false);
  state.advanced.push({ id: card.id, owner: "shadow" });
  state.builder[index] = { id: null, vp: 0 };
  addLog(`暗影领主按购买优先级买下 ${labelForCard(card)}，支付 ${card.cost} 金币并获得待购 ${slot.vp || 0} 胜点。请从实体建筑堆补 1 张到建造者大厅。`);
}

function recommendBuilderPurchase() {
  const affordable = state.builder
    .map((slot, index) => ({ slot, index, card: slot.id ? cardById.get(slot.id) : null }))
    .filter((item) => item.card && item.card.cost <= (state.shadow.g || 0));
  affordable.sort((a, b) => {
    const ownerVpDelta = (parseTokens(b.card.ownerResources).v || 0) - (parseTokens(a.card.ownerResources).v || 0);
    if (ownerVpDelta) return ownerVpDelta;
    const tokenDelta = (b.slot.vp || 0) - (a.slot.vp || 0);
    if (tokenDelta) return tokenDelta;
    return (b.card.cost || 0) - (a.card.cost || 0);
  });
  return affordable[0] || null;
}

function addHarbor(space, owner) {
  const existing = state.harborQueue.find((item) => item.space === space);
  if (existing) {
    existing.owner = owner;
    return;
  }
  state.harborQueue.push({ space, owner });
}

function occupyManualActionSpace(owner, name = "") {
  let space = customActionSpaces().find((spaceId) => !state.occupied[spaceId]);
  if (!space) {
    state.customSlotCount = normalizeCustomSlotCount(state.customSlotCount, state.occupied) + 1;
    space = customSlotId(state.customSlotCount);
  }
  if (!space) return null;
  if (name && !customSlotNames()[space]) customSlotNames()[space] = name;
  occupySpace(space, owner);
  return space;
}

function addCustomSlot() {
  state.customSlotCount = normalizeCustomSlotCount(state.customSlotCount, state.occupied) + 1;
  const spaceId = customSlotId(state.customSlotCount);
  state.editingCustomName = spaceId;
  addLog(`已添加${displaySpaceName(spaceId)}；可以直接点击建筑名修改。`);
  render();
  focusCustomNameEditor(spaceId);
}

function startCustomNameEdit(spaceId) {
  if (!isCustomActionSpace(spaceId)) return;
  state.editingCustomName = spaceId;
  render();
  focusCustomNameEditor(spaceId);
}

function focusCustomNameEditor(spaceId) {
  window.setTimeout(() => {
    const input = els.boardGrid?.querySelector(`input[data-custom-name="${spaceId}"]`);
    input?.focus();
    input?.select();
  }, 0);
}

function setCustomSlotName(spaceId, value, rerender = false, finishEditing = false) {
  if (!isCustomActionSpace(spaceId)) return;
  const name = String(value || "").trim();
  if (name) customSlotNames()[spaceId] = name;
  else delete customSlotNames()[spaceId];
  if (finishEditing && state.editingCustomName === spaceId) state.editingCustomName = null;
  if (rerender) render();
  else {
    updateCustomSlotLabel(spaceId);
    saveState();
  }
}

function updateCustomSlotLabel(spaceId) {
  const button = els.boardGrid?.querySelector(`button[data-space="${spaceId}"]`);
  const title = button?.querySelector(".space-copy strong");
  if (title) title.textContent = displaySpaceName(spaceId);
  const nameButton = els.boardGrid?.querySelector(`button[data-action="edit-custom-name"][data-edit-space="${spaceId}"]`);
  if (nameButton) nameButton.textContent = customSlotName(spaceId);
}

function resolveNextHarbor() {
  if (!state.harborQueue.length) {
    state.phase = "endRound";
    render();
    return;
  }
  const next = nextHarborEntry();
  if (next?.owner === "shadow") planShadowAction({ harborReassign: true, sourceHarbor: next.space });
  else render();
}

function nextHarborEntry() {
  state.harborQueue.sort((a, b) => harborOrder(a.space) - harborOrder(b.space));
  return state.harborQueue[0] || null;
}

function completeHarborReassign(space) {
  const entry = space ? state.harborQueue.find((item) => item.space === space) : nextHarborEntry();
  const completedSpace = entry?.space;
  if (!completedSpace) return;
  state.harborQueue = state.harborQueue.filter((item) => item.space !== completedSpace);
  delete state.occupied[completedSpace];
  delete state.coOccupied[completedSpace];
}

function handleSpaceSelection(spaceId) {
  const mode = boardPlacementMode();
  if (!mode || !canSelectSpace(spaceId, mode)) return;
  if (mode.kind === "specialMove") moveAgentToSpace(spaceId);
  if (mode.kind === "specialPlace") placeSpecialAgent(spaceId, mode.owner);
  if (mode.kind === "freeEdit") freeEditSpace(spaceId);
  if (mode.kind === "human") selectHumanSpace(spaceId);
  if (mode.kind === "harbor") selectHumanHarborReassign(spaceId);
  if (mode.kind === "ambassador") selectAmbassadorSpace(spaceId);
}

function boardPlacementMode() {
  if (state.boardUnlocked) return { kind: "freeEdit" };
  if (state.phase === "humanTurn") return { kind: "human" };
  if (state.phase === "ambassador") return { kind: "ambassador" };
  if (state.phase === "harbor") {
    const next = nextHarborEntry();
    if (next?.owner === "human") return { kind: "harbor", source: next.space };
  }
  return null;
}

function canSelectSpace(spaceId, mode = boardPlacementMode()) {
  if (!spaceId || !mode) return false;
  const owner = state.occupied[spaceId];
  if (mode.kind === "specialMove") return spaceId !== mode.from && !owner;
  if (mode.kind === "specialPlace") return !owner;
  if (mode.kind === "freeEdit") return true;
  if (mode.kind === "human") return !owner || state.pendingHumanSpace === spaceId;
  if (mode.kind === "harbor") return targetForSpace(spaceId) !== "harbor" && (!owner || state.pendingHarborTarget === spaceId);
  if (mode.kind === "ambassador") return !owner || state.pendingAmbassadorSpace === spaceId;
  return false;
}

function toggleBoardUnlocked() {
  state.boardUnlocked = !state.boardUnlocked;
  state.pendingSpecialMove = null;
  state.specialPlaceOwner = null;
  state.boardEditSpace = null;
  if (!state.boardUnlocked) state.freeEditMode = "cycle";
  addLog(state.boardUnlocked ? "行动格已解锁：可自由编辑。" : "行动格已锁定。");
  render();
}

function setFreeEditMode(mode) {
  state.freeEditMode = normalizeFreeEditMode(mode);
  render();
}

function freeEditSpace(spaceId) {
  state.boardEditSpace = normalizeBoardEditSpace(spaceId);
  renderBoard();
  renderSpecialAgentTools();
  saveState();
}

function setBoardOwnerFromEditor(spaceId, owner) {
  const selected = normalizeBoardEditSpace(spaceId);
  if (!selected) return;
  state.boardEditSpace = selected;
  setManualSpaceOwner(selected, owner);
  render();
}

function setBoardCoOwnerFromEditor(spaceId, owner) {
  const selected = normalizeBoardEditSpace(spaceId);
  if (!selected) return;
  state.boardEditSpace = selected;
  const normalized = normalizeOccupantOwner(owner);
  if (!normalized) clearCoOccupant(selected);
  else setCoOccupant(selected, normalized);
  render();
}

function cycleSpaceOwner(spaceId) {
  const current = normalizeOccupantOwner(state.occupied?.[spaceId]);
  const next = current === "human" ? "shadow" : current === "shadow" ? "ambassador" : current === "ambassador" ? null : "human";
  setManualSpaceOwner(spaceId, next);
}

function setManualSpaceOwner(spaceId, owner) {
  const normalized = normalizeOccupantOwner(owner);
  if (!spaceId) return;
  if (!normalized) {
    releaseOccupiedSpace(spaceId, { returnToPool: false });
    delete state.coOccupied[spaceId];
    return;
  }
  state.occupied[spaceId] = normalized;
  if (state.coOccupied[spaceId] === normalized) delete state.coOccupied[spaceId];
  if (targetForSpace(spaceId) === "harbor" && normalized !== "ambassador") addHarbor(spaceId, normalized);
  else state.harborQueue = state.harborQueue.filter((item) => item.space !== spaceId);
  if (normalized === "ambassador") state.special.ambassadorSpace = spaceId;
}

function setCoOccupant(spaceId, owner) {
  const normalized = normalizeOccupantOwner(owner);
  if (!spaceId || !normalized) return;
  if (state.occupied?.[spaceId] === normalized) {
    delete state.coOccupied[spaceId];
    return;
  }
  if (state.coOccupied[spaceId] === normalized) delete state.coOccupied[spaceId];
  else state.coOccupied[spaceId] = normalized;
}

function clearCoOccupant(spaceId) {
  if (spaceId) delete state.coOccupied[spaceId];
}

function toggleSpecialAdjust() {
  state.specialAdjust = !state.specialAdjust;
  state.pendingSpecialMove = null;
  state.specialPlaceOwner = null;
  addLog(state.specialAdjust ? "已进入特殊调整：可补记、移动或回收代理人。" : "已结束特殊调整。");
  render();
}

function setSpecialPlaceOwner(owner) {
  state.specialAdjust = true;
  state.pendingSpecialMove = null;
  state.specialPlaceOwner = normalizeOccupantOwner(owner);
  render();
}

function startSpecialMove(spaceId) {
  const owner = normalizeOccupantOwner(state.occupied?.[spaceId]);
  if (!owner) return;
  state.specialAdjust = true;
  state.specialPlaceOwner = null;
  state.pendingSpecialMove = { from: spaceId, owner };
  render();
}

function moveAgentToSpace(spaceId) {
  const move = normalizePendingSpecialMove(state.pendingSpecialMove);
  if (!move || state.occupied[spaceId]) return;
  moveOccupiedSpace(move.from, spaceId, move.owner);
  addLog(`特殊调整：已把${ownerShortLabel(move.owner)}从 ${displaySpaceName(move.from)} 移到 ${displaySpaceName(spaceId)}。`);
  state.pendingSpecialMove = null;
  render();
}

function placeSpecialAgent(spaceId, owner) {
  const normalized = normalizeOccupantOwner(owner);
  if (!normalized || state.occupied[spaceId]) return;
  occupySpace(spaceId, normalized);
  if (normalized === "human" || normalized === "shadow") {
    state.agents[normalized] = Math.min(totalAgentsFor(normalized), (state.agents[normalized] || 0) + 1);
  }
  if (normalized === "ambassador") state.special.ambassadorSpace = spaceId;
  addLog(`特殊调整：已补记${ownerShortLabel(normalized)}指派到 ${displaySpaceName(spaceId)}。`);
  state.specialPlaceOwner = null;
  render();
}

function recoverAgentFromSpace(spaceId) {
  const owner = state.occupied?.[spaceId];
  if (!owner) return;
  const released = releaseOccupiedSpace(spaceId, { returnToPool: true });
  if (!released) return;
  addLog(`特殊调整：已从 ${displaySpaceName(spaceId)} 回收${ownerShortLabel(released.owner)}。`);
  render();
}

function moveOccupiedSpace(from, to, owner = state.occupied?.[from]) {
  const normalized = normalizeOccupantOwner(owner);
  if (!normalized || !from || !to || state.occupied[to]) return;
  releaseOccupiedSpace(from, { returnToPool: false });
  occupySpace(to, normalized);
  replacePendingSpaceReference(from, to);
}

function releaseOccupiedSpace(spaceId, options = {}) {
  const owner = normalizeOccupantOwner(state.occupied?.[spaceId]);
  if (!owner) return null;
  const pendingHuman = state.pendingHumanSpace === spaceId;
  const pendingHarborTarget = state.pendingHarborTarget === spaceId;
  const pendingAmbassador = state.pendingAmbassadorSpace === spaceId;
  delete state.occupied[spaceId];
  delete state.coOccupied[spaceId];
  state.harborQueue = state.harborQueue.filter((item) => item.space !== spaceId);
  if (pendingHuman) state.pendingHumanSpace = null;
  if (pendingHarborTarget) state.pendingHarborTarget = null;
  if (pendingAmbassador) state.pendingAmbassadorSpace = null;
  if (state.pending?.spaceId === spaceId) state.pending.spaceId = null;
  if (state.special.ambassadorSpace === spaceId) state.special.ambassadorSpace = null;
  if (options.returnToPool && (owner === "human" || owner === "shadow") && !pendingHuman && !pendingHarborTarget) {
    state.agents[owner] = Math.max(0, (state.agents[owner] || 0) - 1);
  }
  return { owner };
}

function replacePendingSpaceReference(from, to) {
  if (state.pendingHumanSpace === from) state.pendingHumanSpace = to;
  if (state.pendingHarborTarget === from) state.pendingHarborTarget = to;
  if (state.pendingAmbassadorSpace === from) state.pendingAmbassadorSpace = to;
  if (state.pending?.spaceId === from) state.pending.spaceId = to;
  if (state.special.ambassadorSpace === from) state.special.ambassadorSpace = to;
}

function selectHumanSpace(spaceId) {
  if (state.pendingHumanSpace === spaceId) {
    clearHumanPendingSpace();
  } else {
    clearHumanPendingSpace();
    occupySpace(spaceId, "human");
    state.pendingHumanSpace = spaceId;
  }
  renderBoard();
  renderPrimaryAction();
  renderNextCard();
  saveState();
}

function clearHumanPendingSpace() {
  const space = state.pendingHumanSpace;
  if (!space) return;
  if (state.occupied[space] === "human") delete state.occupied[space];
  state.harborQueue = state.harborQueue.filter((item) => item.space !== space);
  state.pendingHumanSpace = null;
}

function selectHumanHarborReassign(spaceId) {
  if (state.pendingHarborTarget === spaceId) {
    clearPendingHarborTarget();
  } else {
    clearPendingHarborTarget();
    occupySpace(spaceId, "human");
    state.pendingHarborTarget = spaceId;
  }
  renderBoard();
  renderHarborActionButton();
  saveState();
}

function clearPendingHarborTarget() {
  const space = state.pendingHarborTarget;
  if (!space) return;
  if (state.occupied[space] === "human") delete state.occupied[space];
  state.harborQueue = state.harborQueue.filter((item) => item.space !== space);
  state.pendingHarborTarget = null;
}

function selectAmbassadorSpace(spaceId) {
  if (state.pendingAmbassadorSpace === spaceId) {
    clearPendingAmbassadorSpace();
  } else {
    clearPendingAmbassadorSpace();
    occupySpace(spaceId, "ambassador");
    state.pendingAmbassadorSpace = spaceId;
  }
  renderBoard();
  renderPrimaryAction();
  renderNextCard();
  saveState();
}

function clearPendingAmbassadorSpace() {
  const space = state.pendingAmbassadorSpace;
  if (!space) return;
  if (state.occupied[space] === "ambassador") delete state.occupied[space];
  state.pendingAmbassadorSpace = null;
}

function finishAmbassadorAssignment() {
  if (state.phase !== "ambassador") return;
  if (!state.pendingAmbassadorSpace) {
    addLog("大使：请先在版图上选择一个未占用行动格。");
    render();
    return;
  }
  state.special.ambassadorSpace = state.pendingAmbassadorSpace;
  state.special.ambassadorOwner = "none";
  if (targetForSpace(state.pendingAmbassadorSpace) === "castle") {
    claimFirstPlayer("human", "你用大使拿到先手标记，并抽 1 张阴谋。");
  }
  addLog(`大使已指派到 ${displaySpaceName(state.pendingAmbassadorSpace)}。${targetForSpace(state.pendingAmbassadorSpace) === "harbor" ? "大使在深水港不会轮末重指派。" : ""}`);
  state.pendingAmbassadorSpace = null;
  state.phase = state.currentTurn === "shadow" ? "shadowTurn" : "humanTurn";
  setTurnPhase();
  continueAfterTurnTransition();
}

function toggleSpace(spaceId) {
  const current = state.occupied[spaceId];
  if (!current) {
    occupySpace(spaceId, "human");
  } else if (current === "human") {
    occupySpace(spaceId, "shadow");
  } else {
    delete state.occupied[spaceId];
    state.harborQueue = state.harborQueue.filter((item) => item.space !== spaceId);
  }
}

function occupySpace(spaceId, owner) {
  if (!spaceId) return;
  state.occupied[spaceId] = owner;
  if (targetForSpace(spaceId) === "harbor" && owner !== "ambassador") addHarbor(spaceId, owner);
}

function adjustShadow(resource, delta, rerender = true) {
  if (resource === "x" && delta > 0) {
    takeShadowCorruption(delta);
  } else if (resource === "x" && delta < 0) {
    returnShadowCorruption(Math.abs(delta));
  } else {
    state.shadow[resource] = Math.max(0, (state.shadow[resource] || 0) + delta);
  }
  if (rerender) render();
}

function addResources(tokens) {
  for (const [key, value] of Object.entries(tokens)) {
    if (!value) continue;
    if (key === "x") takeShadowCorruption(value);
    else state.shadow[key] = Math.max(0, (state.shadow[key] || 0) + value);
  }
}

function spendResources(tokens) {
  for (const [key, value] of Object.entries(tokens)) {
    if (!value) continue;
    state.shadow[key] = Math.max(0, (state.shadow[key] || 0) - value);
  }
}

function takeShadowCorruption(count) {
  for (let i = 0; i < count; i += 1) {
    state.shadow.x += 1;
    const key = ["-1", "-2", "-3", "-4", "-5", "-6", "-7", "-8", "-9"].find((slot) => state.corruptionTrack[slot] > 0);
    if (key) {
      state.corruptionTrack[key] -= 1;
      addLog(`暗影领主获得 1 腐化，来自腐化轨 ${key}。`);
    } else {
      adjustShadow("vp", 10, false);
      addLog("腐化轨已空：按单人规则暗影领主立即获得 10 胜点。");
    }
  }
}

function returnShadowCorruption(count) {
  for (let i = 0; i < count; i += 1) {
    if (state.shadow.x <= 0) return;
    state.shadow.x -= 1;
    const key = ["-9", "-8", "-7", "-6", "-5", "-4", "-3", "-2", "-1"].find((slot) => state.corruptionTrack[slot] < (slot === "-1" ? 1 : 3));
    if (key) state.corruptionTrack[key] += 1;
  }
}

function addChosenAdventurers(count, source) {
  const picked = [];
  for (let i = 0; i < count; i += 1) {
    const choice = chooseNeededAdventurer();
    picked.push(choice);
    state.shadow[choice] = (state.shadow[choice] || 0) + 1;
  }
  addLog(`${source}：按资源优先级选择 ${picked.map(resourceName).join("、")}。`);
}

function chooseNeededAdventurer() {
  const deficits = questDeficitsForBestTarget();
  const needed = advTypes.find((type) => deficits[type] > 0);
  if (needed) return needed;
  return advTypes.slice().sort((a, b) => (state.shadow[a] || 0) - (state.shadow[b] || 0))[0];
}

function questDeficitsForBestTarget() {
  const active = state.shadow.activeQuests.map((entry) => questCardFromEntry(entry)).filter(Boolean);
  const deficits = { c: 0, f: 0, r: 0, w: 0 };
  const ranked = active
    .map((card) => {
      const req = parseTokens(card.requirements);
      const deficit = {};
      let total = 0;
      advTypes.forEach((type) => {
        deficit[type] = Math.max(0, (req[type] || 0) - (state.shadow[type] || 0));
        total += deficit[type];
      });
      return { card, deficit, total };
    })
    .filter((item) => item.total > 0)
    .sort((a, b) => a.total - b.total || questVp(b.card) - questVp(a.card));
  return ranked[0]?.deficit || deficits;
}

function finalShadowScore() {
  const adventurers = advTypes.reduce((sum, type) => sum + (state.shadow[type] || 0), 0);
  const gold = Math.floor((state.shadow.g || 0) / 2);
  const completed = (state.shadow.completed || 0) * 4;
  const corruption = state.module === "skullport" ? (state.shadow.x || 0) * corruptionValue() : 0;
  return (state.shadow.vp || 0) + adventurers + gold + completed + corruption;
}

function corruptionValue() {
  const keys = ["-9", "-8", "-7", "-6", "-5", "-4", "-3", "-2", "-1"];
  const empty = keys.find((key) => state.corruptionTrack[key] === 0);
  return empty ? Math.abs(Number(empty)) : 0;
}

function currentOrder() {
  const enabled = moduleSpaces[state.module] || moduleSpaces.base;
  return clockwiseOrder.filter((space) => enabled.has(space));
}

function spacesForTarget(target) {
  if (target === "cliffwatch") return ["cliffA", "cliffB", "cliffC"];
  if (target === "harbor") return ["harbor1", "harbor2", "harbor3"];
  return Object.entries(spaceDefs)
    .filter(([, def]) => def.target === target)
    .map(([space]) => space);
}

function targetForSpace(spaceId) {
  if (spaceId === "manualAdvanced") return "advanced";
  if (spaceId?.startsWith("adv_")) return "advanced";
  if (isCustomActionSpace(spaceId)) return "custom";
  return spaceDefs[spaceId]?.target;
}

function displaySpaceName(spaceId) {
  if (!spaceId) return "无可用行动格";
  if (spaceId === "manualAdvanced") return "高级建筑";
  if (isCustomActionSpace(spaceId)) return customSlotName(spaceId);
  if (spaceId.startsWith("adv_")) {
    const item = state.advanced[Number(spaceId.slice(4))];
    const card = item ? cardById.get(item.id) : null;
    return card ? `高级建筑：${labelForCard(card)}` : `高级建筑：${item?.name || "未指定建筑"}`;
  }
  return spaceDefs[spaceId]?.name || spaceId;
}

function actionHintForSpace(spaceId) {
  if (!spaceId) return "请手动判定";
  if (spaceId === "manualAdvanced") return "按牌面执行";
  if (isCustomActionSpace(spaceId)) return "按牌面执行";
  if (spaceId.startsWith("adv_")) {
    const item = state.advanced[Number(spaceId.slice(4))];
    const card = item ? cardById.get(item.id) : null;
    if (!card) return "按牌面执行";
    const parts = [];
    if (card.staticResourcesText) parts.push(`行动资源：${card.staticResourcesText}`);
    if (card.ownerResourcesText) parts.push(`拥有者：${card.ownerResourcesText}`);
    return parts.join("；") || "按建筑牌面执行";
  }
  return spaceDefs[spaceId]?.detail || "按版图执行";
}

function actionHintForSpaceHtml(spaceId) {
  return `
    <span class="inline-action">
      ${spaceEffectHtml(spaceId)}
      <span>${escapeHtml(actionHintForSpace(spaceId))}</span>
    </span>
  `;
}

function spaceEffectHtml(spaceId) {
  if (!spaceId) return "";
  const effects = spaceId === "manualAdvanced" || spaceId.startsWith("adv_") || isCustomActionSpace(spaceId) ? ["building"] : (spaceDefs[spaceId]?.effects || []);
  if (!effects.length) return "";
  return `
    <span class="space-effects" aria-label="${escapeHtml(actionHintForSpace(spaceId))}">
      ${effects.map((effect) => `<img src="./assets/${effectIcon(effect)}" alt="${escapeHtml(effectAlt(effect))}" title="${escapeHtml(effectAlt(effect))}">`).join("")}
    </span>
  `;
}

function guideList(items) {
  return `
    <div class="guide-list">
      ${items.map((item) => `<div class="guide-item">${item}</div>`).join("")}
    </div>
  `;
}

function diceTrayHtml(dice) {
  if (!dice.length) return "";
  return `
    <div class="dice-tray" aria-label="骰子结果">
      ${dice.map(({ sides, value, label }) => `
        <div class="die-card">
          <div class="die-face d${sides}"><span>${escapeHtml(value)}</span></div>
          <div class="die-label">${escapeHtml(label)} · ${diceName(sides)}</div>
        </div>
      `).join("")}
    </div>
  `;
}

function dicePill(sides, value) {
  return `<span class="dice-pill">${diceName(sides)} <strong>${escapeHtml(value)}</strong></span>`;
}

function diceName(sides) {
  return {
    4: "四面骰",
    10: "十面骰",
    12: "十二面骰",
    20: "二十面骰",
  }[sides] || `${sides} 面骰`;
}

function fusionTermHtml() {
  return `
    <span class="rules-term" tabindex="0" role="button" aria-label="邪能融合说明">
      邪能融合
      <span class="term-card" role="tooltip">
        <strong>邪能融合</strong>
        <span>2 个同类型冒险者 -> 1 个其他类型；需帮助完成任务。</span>
        <span>拿任务时可预判；实际转换在任务检查时处理。</span>
        <span>快算：先看金币，再看直接完成，最后逐个补缺口。</span>
        <span>任务胜点只翻倍一次。</span>
      </span>
    </span>`;
}

function inlineResource(type, value = 1) {
  return `<span class="token inline-token ${type}">${iconStack(type, value)}</span>`;
}

function inlineEffect(effect) {
  return `<img class="inline-icon" src="./assets/${effectIcon(effect)}" alt="${escapeHtml(effectAlt(effect))}" title="${escapeHtml(effectAlt(effect))}">`;
}

function artForSpace(spaceId) {
  if (!spaceId) return "icon-waterdeep.png";
  if (spaceId === "manualAdvanced") return "ui-building-card.webp";
  if (spaceId.startsWith("adv_")) return "ui-building-card.webp";
  if (isCustomActionSpace(spaceId)) return "ui-building-card.webp";
  return targetArt[targetForSpace(spaceId)] || "icon-waterdeep.png";
}

function boardSortValue(spaceId) {
  if (isCustomActionSpace(spaceId)) return 1000 + customSlotNumber(spaceId);
  if (spaceId?.startsWith("adv_")) return 900 + Number(spaceId.slice(4));
  const index = currentOrder().indexOf(spaceId);
  return index >= 0 ? index : 2000;
}

function normalizeOccupantOwner(owner) {
  return ["human", "shadow", "ambassador"].includes(owner) ? owner : null;
}

function normalizePendingSpecialMove(move) {
  const owner = normalizeOccupantOwner(move?.owner);
  const from = move?.from;
  if (!owner || !from || state.occupied?.[from] !== owner) return null;
  return { from, owner };
}

function ownerShortLabel(owner) {
  if (owner === "human") return "你的代理人";
  if (owner === "shadow") return "暗影领主代理人";
  if (owner === "ambassador") return "大使/特殊代理人";
  return "代理人";
}

function coOwnerText(owner) {
  if (owner === "human") return "我";
  if (owner === "shadow") return "暗影领主";
  if (owner === "ambassador") return "特殊";
  return "特殊";
}

function harborOrder(spaceId) {
  return { harbor1: 1, harbor2: 2, harbor3: 3 }[spaceId] || 99;
}

function freeAdvancedIndexes() {
  return state.advanced
    .map((_, index) => index)
    .filter((index) => !state.occupied[`adv_${index}`]);
}

function totalAgentsThisRound() {
  return totalAgentsFor("shadow");
}

function totalAgentsFor(side) {
  const base = state.longGame ? 5 : 4;
  const roundTotal = state.round >= 5 ? base + 1 : base;
  return state.special?.lieutenantOwner === side ? roundTotal + 1 : roundTotal;
}

function parseTokens(tokens) {
  const result = {};
  (tokens || []).forEach((token) => {
    const match = String(token).match(/^(\d+)([a-z])$/i);
    if (!match) return;
    const amount = Number(match[1]);
    const type = match[2].toLowerCase();
    result[type] = (result[type] || 0) + amount;
  });
  return result;
}

function questVp(card) {
  return parseTokens(card.rewards).v || 0;
}

function tokenRow(tokens, label) {
  const parsed = parseTokens(tokens);
  const entries = Object.entries(parsed).filter(([, value]) => value);
  if (!entries.length) return "";
  return `
    <div class="token-row" aria-label="${label}">
      <span class="meta">${label}</span>
      ${entries.map(([type, value]) => `<span class="token ${type}">${iconStack(type, value)}</span>`).join("")}
    </div>
  `;
}

function questOptionsHtml(selected) {
  return quests
    .map((card) => `<option value="${card.id}" ${card.id === selected ? "selected" : ""}>${escapeHtml(labelForCard(card))}</option>`)
    .join("");
}

function buildingOptionsHtml(selected, includeEmpty = false) {
  const empty = includeEmpty ? `<option value="" ${selected ? "" : "selected"}>稍后选择具体建筑</option>` : "";
  return empty + purchasableBuildings
    .map((card) => `<option value="${card.id}" ${card.id === selected ? "selected" : ""}>${escapeHtml(labelForCard(card))} · ${card.cost} 金币</option>`)
    .join("");
}

function findCardByInput(value, list) {
  const normalized = value.toLowerCase();
  return list.find((card) => {
    const names = [labelForCard(card), card.name, card.zhName, buildingNameZh[card.name]].filter(Boolean);
    return names.some((name) => name.toLowerCase() === normalized);
  }) || list.find((card) => {
    const names = [labelForCard(card), card.name, card.zhName, buildingNameZh[card.name]].filter(Boolean);
    return names.some((name) => name.toLowerCase().includes(normalized));
  });
}

function labelForCard(card) {
  if (!card) return "";
  const zh = card.zhName || buildingNameZh[card.name] || "";
  return zh || card.name;
}

function setName(set) {
  return {
    base: "基础版",
    undermountain: "地脉迷城",
    skullport: "骷髅港",
  }[set] || set || "";
}

function questCardFromEntry(entry) {
  return typeof entry === "string" ? cardById.get(entry) : null;
}

function questLabelFromEntry(entry) {
  if (typeof entry === "string") return labelForCard(cardById.get(entry));
  return entry?.name || "未知任务";
}

function isQuickMode() {
  return true;
}

function resourceName(type) {
  return {
    g: "金币",
    c: "牧师",
    f: "战士",
    r: "盗贼",
    w: "法师",
    v: "胜点",
    x: "腐化",
  }[type] || type;
}

function resourceShort(type) {
  return { g: "金", c: "牧", f: "战", r: "贼", w: "法", v: "胜", x: "腐", any: "?" }[type] || type;
}

function resourceIcon(type) {
  return {
    g: "res-gold.png",
    c: "res-cleric.png",
    f: "res-fighter.png",
    r: "res-rogue.png",
    w: "res-wizard.png",
    v: "res-vp.png",
    x: "res-corruption.png",
    any: "res-any.png",
  }[type] || "icon-waterdeep.png";
}

function effectIcon(effect) {
  return {
    quest: "icon-quest.png",
    intrigue: "icon-intrigue.png",
    completed: "icon-quest-completed.png",
    refresh: "icon-arrow.png",
    arrow: "icon-arrow.png",
    first: "icon-first-player.png",
    building: "icon-building.png",
    any: "res-any.png",
  }[effect] || resourceIcon(effect);
}

function effectAlt(effect) {
  return {
    quest: "任务",
    intrigue: "阴谋",
    completed: "已完成任务",
    refresh: "刷新",
    arrow: "重指派",
    first: "先手标记",
    building: "建筑",
    any: "任意冒险者",
  }[effect] || resourceName(effect);
}

function iconStack(type, value) {
  const icon = resourceIcon(type);
  const count = Number(value) || 0;
  if (count > 0 && count <= 5) {
    return Array.from({ length: count }, () => `<img src="./assets/${icon}" alt="${escapeHtml(resourceName(type))}" title="${escapeHtml(resourceName(type))}">`).join("");
  }
  return `<img src="./assets/${icon}" alt="${escapeHtml(resourceName(type))}" title="${escapeHtml(resourceName(type))}"><span class="token-count">x${count}</span>`;
}

function questTypeName(type) {
  return {
    arcana: "奥术",
    commerce: "商业",
    piety: "虔诚",
    skullduggery: "阴谋",
    warfare: "战争",
    mandatory: "强制任务",
  }[type] || type || "任务";
}

function moduleName(module) {
  return {
    base: "基础版",
    undermountain: "地脉迷城",
    skullport: "骷髅港",
  }[module] || module;
}

function phaseName(phase) {
  return {
    setup: "开局",
    startRound: "轮开始",
    ambassador: "大使",
    shadowTurn: "暗影领主",
    humanTurn: "玩家",
    harbor: "深水港",
    endRound: "轮结束",
    final: "计分",
  }[phase] || phase;
}

function die(sides) {
  const array = new Uint32Array(1);
  crypto.getRandomValues(array);
  return (array[0] % sides) + 1;
}

function addLog(message) {
  state.log.push(`[第 ${state.round} 轮] ${message}`);
  if (state.log.length > 200) state.log = state.log.slice(-200);
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return null;
    const next = { ...defaultState(), ...parsed, decisionMode: "quick" };
    next.firstPlayer = normalizePlayer(next.firstPlayer);
    next.currentTurn = normalizePlayer(next.currentTurn);
    next.finalScore = normalizeFinalScore(next.finalScore);
    next.special = normalizeSpecialAgents(next.special);
    next.pendingHumanSpace = next.pendingHumanSpace || null;
    next.pendingHarborTarget = next.pendingHarborTarget || null;
    next.pendingAmbassadorSpace = next.pendingAmbassadorSpace || null;
    next.coOccupied = normalizeCoOccupied(next.coOccupied);
    next.boardUnlocked = Boolean(next.boardUnlocked);
    next.freeEditMode = normalizeFreeEditMode(next.freeEditMode);
    next.customSlotNames = normalizeCustomSlotNames(next.customSlotNames);
    next.editingCustomName = isCustomActionSpace(next.editingCustomName) ? next.editingCustomName : null;
    if (!parsed.customSlotNames && !hasOccupiedCustomSlot(next.occupied)) {
      next.customSlotCount = 0;
    } else {
      next.customSlotCount = normalizeCustomSlotCount(next.customSlotCount, next.occupied);
    }
    next.specialAdjust = false;
    next.specialPlaceOwner = normalizeOccupantOwner(next.specialPlaceOwner);
    next.pendingSpecialMove = normalizePendingSpecialMoveForState(next.pendingSpecialMove, next);
    if (next.configured && next.round === 1 && (next.agents?.shadow || 0) === 0) {
      if (next.pending?.kind === "shadowAction" && next.pending.forcedByNoQuest) {
        next.pending = null;
        next.phase = "shadowTurn";
      }
      if (!next.pending && ["startRound", "shadowTurn"].includes(next.phase)) {
        next.shadowNeedsQuest = false;
      }
    }
    return next;
  } catch {
    return null;
  }
}

function normalizePendingSpecialMoveForState(move, sourceState) {
  const owner = ["human", "shadow", "ambassador"].includes(move?.owner) ? move.owner : null;
  const from = move?.from;
  if (!owner || !from || sourceState?.occupied?.[from] !== owner) return null;
  return { from, owner };
}

function normalizeCustomSlotNames(names) {
  if (!names || typeof names !== "object") return {};
  return Object.fromEntries(
    Object.entries(names)
      .filter(([spaceId]) => isCustomActionSpace(spaceId))
      .map(([spaceId, name]) => [spaceId, String(name || "").trim()])
      .filter(([, name]) => name)
  );
}

function hasOccupiedCustomSlot(occupied) {
  return Object.keys(occupied || {}).some((spaceId) => isCustomActionSpace(spaceId));
}

function renumberAdvancedOccupancy(occupied) {
  const next = {};
  Object.entries(occupied).forEach(([space, owner]) => {
    if (!space.startsWith("adv_")) next[space] = owner;
  });
  return next;
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
