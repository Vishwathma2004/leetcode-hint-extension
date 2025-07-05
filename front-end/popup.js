document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("fetch-hints").addEventListener("click", fetchHints);

  async function fetchHints() {
    chrome.tabs.query({ active: true, currentWindow: true }, async function (tabs) {
      const tab = tabs[0];
      const url = new URL(tab.url);

      const spinner = document.getElementById("spinner");
      const hintContainer = document.getElementById("hint-container");
      const problemNameDiv = document.getElementById("problem-name");

      spinner.classList.remove("hidden");
      hintContainer.innerHTML = ""; 

      if (!url.hostname.includes("leetcode.com")) {
        spinner.classList.add("hidden");
        problemNameDiv.innerText = "You are not on a LeetCode problem page. Please visit one.";
        return;
      }

      const problemName = url.pathname.split("/")[2];
      const code = document.getElementById("code-input")?.value || "";
      const language = document.getElementById("language-select")?.value || "auto";
      document.addEventListener('DOMContentLoaded', function () {
      console.log('DOMContentLoaded event triggered!');  // Check if this log appears
      
      const button = document.querySelector('button[aria-haspopup="dialog"]');
      if (button) {
        const languageFromButton = button.textContent.trim();
        console.log("Language from button:", languageFromButton);
      } else {
        console.error("Button with aria-haspopup='dialog' not found.");
      }
    });



      problemNameDiv.innerText = `🔍 Fetching hints for: ${problemName}`;

      try {
        const response = await fetch("https://leetcode-hint-extension.onrender.com/getHints", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ problemName, code, language })
        });

        if (response.ok) {
          const data = await response.json();
          hintContainer.innerHTML = data.hint;
        } else {
          hintContainer.innerHTML = "<div class='hint'>Failed to fetch hints</div>";
        }
      } catch (error) {
        console.error("Error fetching hints:", error);
        hintContainer.innerHTML = "<div class='hint'> Server error occurred</div>";
      } finally {
        spinner.classList.add("hidden");
      }
    });
  }
});
