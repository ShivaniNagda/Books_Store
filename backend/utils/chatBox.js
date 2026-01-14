import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { DynamicStructuredTool } from "@langchain/core/tools";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { RunnableSequence } from "@langchain/core/runnables";
import { z } from "zod";

/* ================= PROMPT ================= */

const prompt = ChatPromptTemplate.fromMessages([
  [
    "system",
    `
You are an AI book assistant.

Response rules (VERY IMPORTANT):
- Do NOT use markdown, bullets, asterisks (*), or numbering symbols.
- Do NOT use headings like ### or lists with symbols.
- When suggesting books:
  - Group them by category name (plain text).
  - For each book, show:
    Book Title – one-line summary only.
- Keep responses concise and chat-friendly.
- Do NOT ask follow-up questions unless explicitly requested.
`,
  ],
  ["human", "{input}"],
]);

/* ================= BOOK TOOL ================= */

const getBookDetailsTool = new DynamicStructuredTool({
  name: "getBookDetails",
  description: "Fetch details about a book when the exact title is known",
  schema: z.object({
    title: z.string(),
  }),
  func: async ({ title }) => {
    const details = {
      "harry potter":
        "Harry Potter is a fantasy series by J.K. Rowling about a young wizard and his journey at Hogwarts.",
      "the alchemist":
        "The Alchemist by Paulo Coelho is a philosophical novel about following your dreams.",
    };

    return (
      details[title.toLowerCase()] ||
      "Sorry, I don't have details for that book."
    );
  },
});

/* ================= MODELS ================= */

// Base model
const baseModel = new ChatGoogleGenerativeAI({
  model: "models/gemini-2.5-flash",
  temperature: 0.6,
  maxOutputTokens: 2048,
  apiKey: process.env.GOOGLE_API_KEY,
});

// 🔹 Chain for general chat (NO TOOLS)
const chatChain = RunnableSequence.from([
  prompt,
  baseModel,
]);

// 🔹 Chain for tool-based queries
const toolChain = RunnableSequence.from([
  prompt,
  baseModel.bindTools([getBookDetailsTool]),
]);

/* ================= INTENT CHECK ================= */

const isSpecificBookQuery = (message = "") => {
  const keywords = [
    "tell me about",
    "details of",
    "who wrote",
    "summary of",
    "about book",
  ];

  return keywords.some(k =>
    message.toLowerCase().includes(k)
  );
};

/* ================= CONTROLLER ================= */

export const chatBox = async (req, res) => {
  try {
    const { message } = req.body;
    console.log("message:", message);

    // 1️⃣ CATEGORY / SUGGESTIONS / GENERAL QUESTIONS
    if (!isSpecificBookQuery(message)) {
      const response = await chatChain.invoke({ input: message });
      return res.json({ reply: response.content });
    }

    // 2️⃣ SPECIFIC BOOK DETAILS → TOOL CHAIN
    const response = await toolChain.invoke({ input: message });

    if (Array.isArray(response.content)) {
      const toolCall = response.content.find(
        (c) => c.type === "functionCall"
      );

      if (toolCall?.functionCall?.name === "getBookDetails") {
        const result = await getBookDetailsTool.func(
          toolCall.functionCall.args
        );
        return res.json({ reply: result });
      }
    }

    return res.json({ reply: response.content });

  } catch (error) {
    console.error("AI Error:", error);
    res.status(500).json({ error: "AI error" });
  }
};
