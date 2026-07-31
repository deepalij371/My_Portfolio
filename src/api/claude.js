import { RESUME_CONTEXT } from "../constants/resume.js";

/**
 * Calls the Claude API with the given messages array.
 * @param {Array<{role: string, content: string}>} messages
 * @returns {Promise<string>}
 */
export async function callClaude(messages) {
  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-6",
      max_tokens: 1000,
      system: `You are a terse, helpful assistant embedded in Deepali Jena's portfolio site. Answer only using this context, in 2-4 sentences max, plain text, no markdown:\n${RESUME_CONTEXT}`,
      messages,
    }),
  });

  const data = await response.json();
  const text = (data.content || [])
    .filter((b) => b.type === "text")
    .map((b) => b.text)
    .join("\n")
    .trim();

  return text || "No response.";
}
