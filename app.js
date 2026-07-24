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

// Daily mission targets per rank per division
// Format: { pushup, squat, plank (sec), run (m) }
const MISSION_TARGETS = {
  0: { III: { pushup: 15, squat: 20, plank: 60, run: 800 }, II: { pushup: 20, squat: 25, plank: 90, run: 1000 }, I: { pushup: 25, squat: 30, plank: 120, run: 1200 } },
  1: { III: { pushup: 25, squat: 30, plank: 120, run: 1200 }, II: { pushup: 30, squat: 35, plank: 150, run: 1400 }, I: { pushup: 35, squat: 40, plank: 180, run: 1600 } },
  2: { III: { pushup: 30, squat: 35, plank: 150, run: 1200 }, II: { pushup: 35, squat: 42, plank: 180, run: 1400 }, I: { pushup: 40, squat: 50, plank: 210, run: 1600 } },
  3: { III: { pushup: 30, squat: 40, plank: 180, run: 1400 }, II: { pushup: 35, squat: 50, plank: 210, run: 1600 }, I: { pushup: 45, squat: 60, plank: 240, run: 1800 } },
  4: { III: { pushup: 40, squat: 50, plank: 210, run: 1400 }, II: { pushup: 45, squat: 60, plank: 240, run: 1600 }, I: { pushup: 50, squat: 70, plank: 270, run: 1800 } },
  5: { III: { pushup: 40, squat: 50, plank: 240, run: 1600 }, II: { pushup: 50, squat: 60, plank: 270, run: 1800 }, I: { pushup: 60, squat: 75, plank: 300, run: 2000 } },
  6: { III: { pushup: 50, squat: 60, plank: 270, run: 1800 }, II: { pushup: 60, squat: 70, plank: 300, run: 2000 }, I: { pushup: 70, squat: 80, plank: 330, run: 2200 } },
  7: { III: { pushup: 60, squat: 70, plank: 300, run: 1800 }, II: { pushup: 70, squat: 80, plank: 330, run: 2000 }, I: { pushup: 80, squat: 90, plank: 360, run: 2200 } },
  8: { III: { pushup: 70, squat: 80, plank: 330, run: 2000 }, II: { pushup: 80, squat: 90, plank: 360, run: 2200 }, I: { pushup: 90, squat: 100, plank: 390, run: 2400 } },
  9: { III: { pushup: 50, squat: 60, plank: 300, run: 1600 }, II: { pushup: 60, squat: 70, plank: 330, run: 1800 }, I: { pushup: 70, squat: 80, plank: 360, run: 2000 } },
  10: { III: { pushup: 60, squat: 70, plank: 330, run: 1800 }, II: { pushup: 70, squat: 85, plank: 360, run: 2000 }, I: { pushup: 80, squat: 100, plank: 390, run: 2200 } },
  11: { III: { pushup: 100, squat: 100, plank: 600, run: 2000 }, II: { pushup: 100, squat: 100, plank: 600, run: 2000 }, I: { pushup: 100, squat: 100, plank: 600, run: 2000 } },
};

// Boss fight unique tests per rank - [{ type, value, description }]
const BOSS_FIGHTS = {
  0: [{ type: "pushup", value: 20, desc: "Push-up" }, { type: "squat", value: 30, desc: "Squat" }],
  1: [{ type: "run", value: 1000, desc: "Lari 1km" }, { type: "plank", value: 120, desc: "Plank 120s" }],
  2: [{ type: "pushup", value: 30, desc: "Push-up" }, { type: "squat", value: 40, desc: "Squat" }, { type: "burpee", value: 15, desc: "Burpee" }],
  3: [{ type: "pushup", value: 30, desc: "Push-up" }, { type: "squat", value: 40, desc: "Squat" }, { type: "run", value: 1200, desc: "Lari 1.2km" }, { type: "plank", value: 150, desc: "Plank 150s" }],
  4: [{ type: "pushup", value: 40, desc: "Push-up" }, { type: "squat", value: 50, desc: "Squat" }],
  5: [{ type: "pushup", value: 45, desc: "Power Push-up" }, { type: "squat", value: 55, desc: "Power Squat" }],
  6: [{ type: "pushup", value: 40, desc: "Push-up" }, { type: "squat", value: 50, desc: "Squat" }],
  7: [{ type: "pushup", value: 60, desc: "Push-up" }, { type: "squat", value: 70, desc: "Squat" }],
  8: [{ type: "plank", value: 300, desc: "Plank 300s" }, { type: "run", value: 1400, desc: "Lari 1.4km" }],
  9: [{ type: "pushup", value: 50, desc: "Push-up" }, { type: "squat", value: 60, desc: "Squat" }, { type: "run", value: 1600, desc: "Lari 1.6km" }, { type: "plank", value: 300, desc: "Plank 300s" }],
  10: [{ type: "pushup", value: 70, desc: "Push-up" }, { type: "squat", value: 80, desc: "Squat" }, { type: "run", value: 1800, desc: "Lari 1.8km" }],
  11: [{ type: "pushup", value: 100, desc: "Push-up" }, { type: "squat", value: 100, desc: "Squat" }, { type: "plank", value: 600, desc: "Plank 600s" }, { type: "run", value: 2000, desc: "Lari 2km" }],
};

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

// Get 2 weakest stats and map to mission types
function getWeakestStats(stats) {
  const entries = Object.entries(stats).map(([k, v]) => ({ stat: k, val: v }));
  entries.sort((a, b) => a.val - b.val);
  const weakest = entries.slice(0, 2).map(e => e.stat);
  
  const statToMission = {
    pace: "run",
    strength: Math.random() > 0.5 ? "pushup" : "squat",
    endurance: "plank",
    power: Math.random() > 0.5 ? "pushup" : "squat",
    agility: "burpee",
    stability: "plank",
  };
  return weakest.map(s => statToMission[s]);
}

// Generate daily missions
function generateTodaysMissions(profile) {
  const today = new Date().toISOString().split("T")[0];
  const existing = profile.missions || {};
  if (existing[today]) return existing[today];
  
  const weakest = getWeakestStats(profile.stats);
  const targets = MISSION_TARGETS[profile.rankIndex][profile.divIndex.toLowerCase()];
  const missions = weakest.map(type => ({
    type,
    target: targets[type],
    result: 0,
    completed: false,
  }));
  return missions;
}

// Check if division up based on today's missions
function checkDivisionUp(missions, profile) {
  const allComplete = missions.every(m => m.completed && m.result >= m.target);
  if (allComplete && profile.divIndex < 2) {
    return true;
  }
  return false;
}

// Submit mission result and check auto-divup
function submitMission(profile, missionIndex, result) {
  const today = new Date().toISOString().split("T")[0];
  if (!profile.missions) profile.missions = {};
  if (!profile.missions[today]) profile.missions[today] = generateTodaysMissions(profile);
  
  const missions = profile.missions[today];
  missions[missionIndex].result = result;
  missions[missionIndex].completed = result >= missions[missionIndex].target;
  
  const divUp = checkDivisionUp(missions, profile);
  if (divUp) {
    profile.divIndex += 1;
    const rankInfo = getRankInfo(profile.ovr);
    profile.division = rankInfo.division;
  }
  return { divUp, missions };
}

// Calculate boss fight result (FR update)
function calculateBossFightResult(bossTests, results) {
  let totalScore = 0;
  bossTests.forEach((test, i) => {
    const result = results[i] || 0;
    const normalized = normalize(result, test.value);
    totalScore += normalized;
  });
  const avgScore = totalScore / bossTests.length;
  return Math.round(avgScore);
}

// Try rank up via boss fight
function attemptBossFight(profile, results) {
  if (profile.divIndex !== 2) return { pass: false, reason: "Must be Division I" };
  
  const bossTest = BOSS_FIGHTS[profile.rankIndex];
  const frFromBoss = calculateBossFightResult(bossTest, results);
  
  const pass = frFromBoss >= 60;
  if (pass && profile.rankIndex < 11) {
    profile.rankIndex += 1;
    profile.divIndex = 0;
    const rankInfo = getRankInfo(profile.ovr);
    profile.rank = rankInfo.rank;
    profile.emoji = rankInfo.emoji;
    profile.division = rankInfo.division;
    
    if (!profile.peak || rankLabelSortValue(profile.rankIndex, profile.divIndex) > profile.peak.sortVal) {
      profile.peak = { rank: profile.rank, division: profile.division, sortVal: rankLabelSortValue(profile.rankIndex, profile.divIndex) };
    }
  }
  
  profile.fr = frFromBoss;
  return { pass, fr: frFromBoss };
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
  ranks: document.getElementById("screen-ranks"),
  missions: document.getElementById("screen-missions"),
  bossfight: document.getElementById("screen-bossfight"),
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

// Rank list navigation
document.getElementById("btn-see-ranks").addEventListener("click", () => {
  const profile = loadProfile();
  renderRankList(profile);
  showScreen("ranks");
});

document.getElementById("btn-ranks-back").addEventListener("click", () => {
  showScreen("profile");
});

// Missions navigation
document.getElementById("btn-see-missions").addEventListener("click", () => {
  const profile = loadProfile();
  renderMissions(profile);
  showScreen("missions");
});

document.getElementById("btn-missions-back").addEventListener("click", () => {
  showScreen("profile");
});

// Boss Fight navigation
function openBossFightIfEligible(profile) {
  if (profile.divIndex !== 2) {
    alert("Kamu harus mencapai Divisi I dulu!");
    return;
  }
  renderBossFight(profile);
  showScreen("bossfight");
}

document.getElementById("btn-boss-back").addEventListener("click", () => {
  showScreen("profile");
});

document.getElementById("btn-boss-submit").addEventListener("click", () => {
  const profile = loadProfile();
  const bossTest = BOSS_FIGHTS[profile.rankIndex];
  const results = bossTest.map((_, i) => {
    const input = document.getElementById(`boss-input-${i}`);
    return parseInt(input.value) || 0;
  });
  
  const { pass, fr } = attemptBossFight(profile, results);
  saveProfile(profile);
  
  // Show result popup
  const msg = pass 
    ? `✓ Ujian Lulus!\nFR: ${fr}\nRank Up ke ${profile.rank}!`
    : `✗ Ujian Gagal\nFR: ${fr} (perlu ≥60)`;
  alert(msg);
  
  renderProfile(profile);
  showScreen("profile");
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

  // Update boss fight button state
  const bossBtn = document.getElementById("btn-boss-fight");
  const bossHint = document.getElementById("boss-fight-hint");
  if (profile.divIndex === 2) {
    bossBtn.disabled = false;
    bossBtn.style.opacity = "1";
    bossHint.textContent = "Siap untuk ujian naik rank?";
    bossBtn.onclick = () => openBossFightIfEligible(profile);
  } else {
    bossBtn.disabled = true;
    bossBtn.style.opacity = "0.5";
    bossHint.textContent = `Capai Divisi I dulu (saat ini: ${profile.division})`;
  }
}

// ---------- Rank List render ----------
function renderRankList(profile) {
  const list = document.getElementById("ranks-list");
  list.innerHTML = "";
  RANKS.forEach((rank, i) => {
    const isCurrent = profile.rankIndex === i;
    const item = document.createElement("div");
    item.className = `rank-item ${isCurrent ? "current" : ""}`;
    item.innerHTML = `
      <div class="rank-item-emoji">${rank.emoji}</div>
      <div class="rank-item-info">
        <div class="rank-item-name">${rank.name}</div>
        <div class="rank-item-meta">Rank ${i + 1} / 12</div>
      </div>
      ${isCurrent ? `<div class="rank-item-status">Divisi ${profile.division}</div>` : ""}
    `;
    list.appendChild(item);
  });
}

// ---------- Missions render ----------
function renderMissions(profile) {
  const missions = generateTodaysMissions(profile);
  const list = document.getElementById("missions-list");
  list.innerHTML = "";
  
  missions.forEach((mission, i) => {
    const card = document.createElement("div");
    card.className = "mission-card";
    const icon = { pushup: "💪", squat: "🦵", plank: "🧘", run: "🏃", burpee: "⚡" }[mission.type] || "💪";
    const label = { pushup: "Push-up", squat: "Squat", plank: "Plank (s)", run: "Lari (m)", burpee: "Burpee" }[mission.type];
    const isComplete = mission.completed;
    
    card.innerHTML = `
      <h3 class="mission-title">${icon} ${label}</h3>
      <div class="mission-target">Target: ${mission.target}</div>
      <div class="mission-input-row">
        <input type="number" class="mission-input" id="mission-input-${i}" inputmode="numeric" placeholder="0" value="${mission.result || ''}">
        <button class="mission-submit-btn" onclick="submitMissionHandler(${i})">✓</button>
      </div>
      <div class="mission-status ${isComplete ? 'complete' : 'incomplete'}">
        ${isComplete ? `✓ Selesai (${mission.result}/${mission.target})` : "Belum selesai"}
      </div>
    `;
    list.appendChild(card);
  });
  
  const divisionUpCheck = checkDivisionUp(missions, profile);
  const container = document.getElementById("missions-btn-container");
  container.innerHTML = "";
  if (divisionUpCheck) {
    const note = document.createElement("div");
    note.className = "missions-footer-note";
    note.textContent = "✓ Semua misi selesai! Naik divisi otomatis.";
    container.appendChild(note);
  }
}

function submitMissionHandler(index) {
  const profile = loadProfile();
  const inputEl = document.getElementById(`mission-input-${index}`);
  const result = parseInt(inputEl.value) || 0;
  const { divUp } = submitMission(profile, index, result);
  saveProfile(profile);
  renderMissions(profile);
  if (divUp) {
    setTimeout(() => {
      renderProfile(profile);
    }, 300);
  }
}

// ---------- Boss Fight render ----------
function renderBossFight(profile) {
  const bossTest = BOSS_FIGHTS[profile.rankIndex];
  const nextRankIdx = profile.rankIndex + 1;
  const nextRank = nextRankIdx < RANKS.length ? RANKS[nextRankIdx] : null;
  
  if (!nextRank) {
    document.getElementById("bossfight-body").innerHTML = `<div style="padding: 40px 20px; text-align: center;"><p>Kamu sudah mencapai rank tertinggi!</p></div>`;
    return;
  }
  
  document.getElementById("boss-emoji").textContent = nextRank.emoji;
  document.getElementById("boss-rankname").textContent = nextRank.name;
  
  const testsContainer = document.getElementById("bossfight-tests");
  testsContainer.innerHTML = "";
  bossTest.forEach((test, i) => {
    const testDiv = document.createElement("div");
    testDiv.className = "boss-test";
    testDiv.innerHTML = `
      <h3 class="boss-test-title">${test.desc}</h3>
      <div class="boss-test-req">Target: ${test.value}</div>
      <input type="number" class="boss-test-input" id="boss-input-${i}" inputmode="numeric" placeholder="0">
    `;
    testsContainer.appendChild(testDiv);
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
