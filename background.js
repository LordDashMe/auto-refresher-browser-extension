const tabTimers = {};

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  const tabId = message.tabId;

  if (!tabId) return;

  if (message.type === "START") {
    const interval = parseInt(message.interval, 10);

    clearInterval(tabTimers[tabId]?.intervalId);
    clearInterval(tabTimers[tabId]?.countdown);

    const intervalId = setInterval(() => {
      chrome.tabs.reload(tabId);
    }, interval * 1000);

    tabTimers[tabId] = {
      interval,
      intervalId,
      remaining: interval,
    };

    tabTimers[tabId].countdown = setInterval(() => {
      tabTimers[tabId].remaining--;
      if (tabTimers[tabId].remaining <= 0) {
        tabTimers[tabId].remaining = tabTimers[tabId].interval;
      }
      chrome.storage.local.set({ [`timer-${tabId}`]: tabTimers[tabId].remaining });
    }, 1000);

    chrome.storage.local.set({ [`active-${tabId}`]: true });
    sendResponse({ status: "started" });
  } else if (message.type === "STOP") {
    clearInterval(tabTimers[tabId]?.intervalId);
    clearInterval(tabTimers[tabId]?.countdown);
    delete tabTimers[tabId];
    chrome.storage.local.set({ [`active-${tabId}`]: false });
    sendResponse({ status: "stopped" });
  }
});
