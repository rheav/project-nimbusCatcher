// background.js

// Function to inject content script
function injectContentScript(tabId) {
  chrome.scripting.executeScript(
    {
      target: { tabId: tabId },
      files: ["contentScript.js"],
    },
    (injectionResults) => {
      // Handle any errors from injecting the content script
      if (
        chrome.runtime.lastError ||
        !injectionResults ||
        injectionResults.length === 0
      ) {
        console.error(
          `Error injecting content script: ${chrome.runtime.lastError?.message}`
        );
      }
    }
  );
}

// Listener for when a tab is activated
chrome.tabs.onActivated.addListener((activeInfo) => {
  chrome.tabs.get(activeInfo.tabId, (tab) => {
    // Check if the tab is not an internal Chrome page and the content script has not been run yet
    if (tab.url && !tab.url.startsWith("chrome://")) {
      chrome.storage.local.get([`scriptRun_${activeInfo.tabId}`], (result) => {
        if (!result[`scriptRun_${activeInfo.tabId}`]) {
          injectContentScript(activeInfo.tabId);
        }
      });
    }
  });
});

// Listener for when a tab is updated
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (
    changeInfo.status === "complete" &&
    tab.url &&
    !tab.url.startsWith("chrome://")
  ) {
    // Set the flag indicating the content script has not been run yet
    chrome.storage.local.set({ [`scriptRun_${tabId}`]: false });
    injectContentScript(tabId);
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.totalOccurences !== undefined) {
    chrome.action.setBadgeText({
      text: message.totalOccurences.toString(),
      tabId: sender.tab.id,
    });
  }
});

// Listener for when a tab is removed (closed)
chrome.tabs.onRemoved.addListener((tabId, removeInfo) => {
  // Clear the flag when the tab is closedaaaaa
  chrome.storage.local.remove([`scriptRun_${tabId}`]);
});
