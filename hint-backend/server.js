import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { GoogleGenerativeAI } from '@google/generative-ai';
import showdown from 'showdown';

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

console.log("🔑 API_KEY loaded:", process.env.GEMINI_API_KEY?.slice(0, 10));
function detectLanguage(code) {
  if (!code) return "unknown";
  if (code.includes("import") && code.includes("def")) return "Python";
  if (code.includes("#include") || code.includes("std::")) return "C++";
  if (code.includes("public class") || code.includes("System.out")) return "Java";
  if (code.includes("function") || code.includes("console.log")) return "JavaScript";
  return "unknown";
}
app.post("/getHints", async (req, res) => {
  const { problemName, code } = req.body;
  const apiKey = process.env.GEMINI_API_KEY;

  if (!problemName) {
    return res.status(400).send("Missing 'problemName' in request body.");
  }

  if (!apiKey) {
    console.error(" Missing API_KEY in environment variables");
    return res.status(500).send("Server misconfiguration: missing API key");
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const lang = detectLanguage(code);
    // Generate a dynamic prompt
    let prompt = "";

    if (code && code.trim() !== "") {
      prompt = `
Problem: ${problemName}
Here is the user's code: (Language: ${lang}):
\`\`\`${lang.toLowerCase()}
${code}
\`\`\`

if the question related to sql then generate the sql related answers only

Instructions:
1. Analyze whether the code is correct and mention any issues or edge cases missed.
2. Suggest improvements or optimizations.
3. Finally, explain the core algorithm and idea behind solving the problem (without giving the full solution).
4.give the algorithm without giving the full solution based on the if the user gives his errorneous code
`;
    } else {
      prompt = `
${problemName}: Explain how to solve this problem in plain text and algorithm only. 
Don't give the exact solution. Instead, explain the algorithm, idea, and approach for solving it along with that give the 3 approach like 1)bruete force approach,2)Optimised3)Efficient Approach ,.
`;
    }

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    const converter = new showdown.Converter();
    const html = converter.makeHtml(responseText);

    res.json({ hint: html });
  } catch (error) {
    console.error("Error generating content:", error?.message || error);
    res.status(500).send("Error generating hints");
  }
});

app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:3000/`);
});
