const intervalInput = document.getElementById("intervalInput");
const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const statusText = document.getElementById("statusText");
const timerEl = document.getElementById("timer");

let currentTabId = null;
let updateInterval = null;

async function getCurrentTabId() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  return tab.id;
}

async function updateStatus() {
  const tabId = await getCurrentTabId();
  currentTabId = tabId;

  chrome.storage.local.get([`active-${tabId}`, `timer-${tabId}`, `interval-${tabId}`], (result) => {
    const isActive = result[`active-${tabId}`];
    const remaining = result[`timer-${tabId}`];
    const interval = result[`interval-${tabId}`];

    statusText.innerHTML = `
      Status: <strong>${isActive ? "Active" : "Inactive"}</strong><br/>
      Interval: <strong>${isActive && interval ? interval + " seconds" : "--"}</strong>
    `;
    intervalInput.value = isActive && interval ? interval : 5;
    timerEl.textContent = isActive ? remaining ?? "--" : "--";

    if (updateInterval) clearInterval(updateInterval);
    if (isActive) {
      updateInterval = setInterval(() => {
        chrome.storage.local.get(`timer-${tabId}`, (res) => {
          timerEl.textContent = res[`timer-${tabId}`] ?? "--";
        });
      }, 1000);
    }
  });
}

startBtn.addEventListener("click", async () => {
  const interval = intervalInput.value;
  const tabId = await getCurrentTabId();

  chrome.runtime.sendMessage({ type: "START", interval, tabId }, () => {
    // Store the interval persistently
    chrome.storage.local.set({ [`interval-${tabId}`]: interval }, () => {
      updateStatus();
    });
  });
});

stopBtn.addEventListener("click", async () => {
  const tabId = await getCurrentTabId();

  chrome.runtime.sendMessage({ type: "STOP", tabId }, () => {
    updateStatus();
  });
});

document.addEventListener("DOMContentLoaded", updateStatus);
