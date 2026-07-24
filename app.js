// ---------- Data ----------
const RANKS = [
  { name: "Koala", emoji: "🐨" },
  { name: "Dog", emoji: "🐕" },
  { name: "Fox", emoji: "🦊" },
  { name: "Deer", emoji: "🦌" },
  { name: "Wild Hog", emoji: "🐗" },
  { name: "Alligator", emoji: "🐊" },
  { name: "Jaguar", emoji: "🐆" },
  { name: "Gorilla", emoji: "🦍" },
  { name: "Grizzly", emoji: "🐻" },
  { name: "Tiger", emoji: "🐅" },
  { name: "Lion", emoji: "🦁" },
  { name: "Polar Bear", emoji: "🐻‍❄️" },
];
const DIVISIONS = ["III", "II", "I"]; // low -> high within a rank

// normalization ceilings (score 0 at 0, score 100 at ceiling)
const CEIL = {
  pushup: 50,   // reps
  squat: 60,    // reps / 60s
  plank: 300,   // seconds
  run: 1600,    // meters, floor 400
};
const RUN_FLOOR = 400;

const STORE_KEY = "fitrank_profile_v1";

// ---------- Calculation ----------
function normalize(value, ceiling, floor = 0) {
  const v = Math.max(0, value - floor);
  const c = ceiling - floor;
  return Math.max(0, Math.min(100, (v / c) * 100));
}

function calculateStats({ pushup, squat, plank, run }) {
  const sPushup = normalize(pushup, CEIL.pushup);
  const sSquat = normalize(squat, CEIL.squat);
  const sPlank = normalize(plank, CEIL.plank);
  const sRun = normalize(run, CEIL.run, RUN_FLOOR);

  const power = sPushup * 0.6 + sSquat * 0.4;
  const strength = sPushup * 0.4 + sSquat * 0.6;
  const stability = sPlank * 1.0;
  const endurance = sPlank * 0.4 + sRun * 0.6;
  const pace = sRun * 1.0;

  const provisionalBase = (power + strength + stability + endurance + pace) / 5;
  const agility = provisionalBase * 0.7;

  const stats = { pace, strength, endurance, agility, stability, power };
  Object.keys(stats).forEach((k) => (stats[k] = Math.round(stats[k])));
  return stats;
}

function calcOVR(stats) {
  const sum = Object.values(stats).reduce((a, b) => a + b, 0);
  return Math.round(sum / Object.values(stats).length);
}

function getRankInfo(ovr) {
  const bandSize = 100 / RANKS.length;
  let rankIndex = Math.floor(ovr / bandSize);
  rankIndex = Math.max(0, Math.min(RANKS.length - 1, rankIndex));
  const withinBand = ovr - rankIndex * bandSize;
  const divSize = bandSize / 3;
  let divIndex = Math.floor(withinBand / divSize);
  divIndex = Math.max(0, Math.min(2, divIndex));
  return {
    rank: RANKS[rankIndex].name,
    emoji: RANKS[rankIndex].emoji,
    division: DIVISIONS[divIndex],
    rankIndex,
    divIndex,
  };
}

function rankLabelSortValue(rankIndex, divIndex) {
  return rankIndex * 3 + divIndex;
}

// ---------- Storage ----------
function loadProfile() {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}
function saveProfile(profile) {
  localStorage.setItem(STORE_KEY, JSON.stringify(profile));
}

// ---------- Screens ----------
const screens = {
  welcome: document.getElementById("screen-welcome"),
  test: document.getElementById("screen-test"),
  result: document.getElementById("screen-result"),
  profile: document.getElementById("screen-profile"),
};
function showScreen(name) {
  Object.values(screens).forEach((s) => s.classList.add("hidden"));
  screens[name].classList.remove("hidden");
}

// ---------- Test flow ----------
const testSteps = ["pushup", "squat", "plank", "run"];
let currentStep = 0;
const testAnswers = {};

function renderTestStep() {
  testSteps.forEach((key, i) => {
    document.getElementById(`step-${key}`).classList.toggle("hidden", i !== currentStep);
  });
  document.getElementById("test-step-label").textContent = `Tes ${currentStep + 1} dari ${testSteps.length}`;
  document.getElementById("test-progress-fill").style.width = `${((currentStep + 1) / testSteps.length) * 100}%`;
  document.getElementById("btn-test-next").textContent = currentStep === testSteps.length - 1 ? "Lihat Hasil" : "Lanjut";
}

function currentInputEl() {
  return document.getElementById(`input-${testSteps[currentStep]}`);
}

document.getElementById("btn-start-test").addEventListener("click", () => {
  currentStep = 0;
  renderTestStep();
  showScreen("test");
});

document.getElementById("btn-test-back").addEventListener("click", () => {
  if (currentStep === 0) {
    showScreen("welcome");
    return;
  }
  currentStep -= 1;
  renderTestStep();
});

document.getElementById("btn-test-next").addEventListener("click", () => {
  const input = currentInputEl();
  const val = parseFloat(input.value);
  testAnswers[testSteps[currentStep]] = isNaN(val) ? 0 : Math.max(0, val);

  if (currentStep < testSteps.length - 1) {
    currentStep += 1;
    renderTestStep();
  } else {
    finishTest();
  }
});

function finishTest() {
  const stats = calculateStats(testAnswers);
  const ovr = calcOVR(stats);
  const fr = ovr;
  const rankInfo = getRankInfo(ovr);

  const existing = loadProfile();
  const peakSortVal = rankLabelSortValue(rankInfo.rankIndex, rankInfo.divIndex);
  let peak = { rank: rankInfo.rank, division: rankInfo.division, sortVal: peakSortVal };
  let streak = 1;
  let totalWorkout = 1;

  if (existing) {
    totalWorkout = (existing.totalWorkout || 0) + 1;
    streak = (existing.streak || 0) + 1;
    if (existing.peak && existing.peak.sortVal > peakSortVal) {
      peak = existing.peak;
    }
  }

  const profile = {
    stats,
    ovr,
    fr,
    rank: rankInfo.rank,
    emoji: rankInfo.emoji,
    division: rankInfo.division,
    peak,
    streak,
    totalWorkout,
    lastTestDate: new Date().toISOString(),
  };
  saveProfile(profile);

  renderResult(profile);
  showScreen("result");
}

function renderResult(profile) {
  document.getElementById("result-animal").textContent = profile.emoji;
  document.getElementById("result-rankname").textContent = profile.rank;
  document.getElementById("result-division").textContent = `Divisi ${profile.division}`;
  document.getElementById("result-ovr-num").textContent = profile.ovr;
}

document.getElementById("btn-see-profile").addEventListener("click", () => {
  renderProfile(loadProfile());
  showScreen("profile");
});

document.getElementById("btn-retest").addEventListener("click", () => {
  currentStep = 0;
  testSteps.forEach((key) => (document.getElementById(`input-${key}`).value = ""));
  renderTestStep();
  showScreen("test");
});

// ---------- Profile render ----------
function renderProfile(profile) {
  if (!profile) return;
  document.getElementById("profile-animal").textContent = profile.emoji;
  document.getElementById("profile-rankname").textContent = profile.rank;
  document.getElementById("profile-division").textContent = `Divisi ${profile.division}`;
  document.getElementById("profile-ovr").textContent = profile.ovr;
  document.getElementById("profile-peak").textContent = `${profile.peak.rank} ${profile.peak.division}`;
  document.getElementById("profile-fr").textContent = profile.fr;
  document.getElementById("profile-streak").textContent = profile.streak;
  document.getElementById("profile-workouts").textContent = profile.totalWorkout;

  Object.entries(profile.stats).forEach(([key, val]) => {
    const bar = document.getElementById(`bar-${key}`);
    const label = document.getElementById(`val-${key}`);
    if (bar) bar.style.width = `${val}%`;
    if (label) label.textContent = val;
  });
}

// ---------- Init ----------
(function init() {
  const profile = loadProfile();
  if (profile) {
    renderProfile(profile);
    showScreen("profile");
  } else {
    showScreen("welcome");
  }

  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("sw.js").catch(() => {});
  }
})();
