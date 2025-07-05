// background.js
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (tab.url && tab.url.includes("leetcode.com/problems")) {
    console.log("LeetCode problem page opened:", tab.url);
  }
});
