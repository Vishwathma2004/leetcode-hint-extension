const problemTitle = document.querySelector('h1[data-cy="question-title"]');
if (problemTitle) {
  chrome.storage.local.set({ problemTitle: problemTitle.textContent });
  console.log("Saved problem title:", problemTitle.textContent);
} else {
  console.warn("Problem title not found.");
}
