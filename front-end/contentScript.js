///this can be used to extract the code from the monaco-code-editor
//to check the working of the code you can execute htis code in the console

function extractCodeWhenReady() {
  const viewLines = document.querySelector('.view-lines');
  if (viewLines) {
    const lines = viewLines.querySelectorAll('.view-line');
    const code = Array.from(lines).map(line => line.innerText).join('\n');
    console.log("✅ Extracted Code:\n", code);
  } else {
    console.log("⏳ Waiting for Monaco editor to load...");
    setTimeout(extractCodeWhenReady, 1000);
  }
}

extractCodeWhenReady();