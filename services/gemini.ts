
import { GoogleGenAI, Type } from "@google/genai";
import { HRContact } from "../types";
import { IIS_HR_CONTACTS, SYSTEM_PROMPT } from "../constants";

// 優先從 process.env 讀取，這在 Vite define 後會生效
const getApiKey = () => {
  try {
    return process.env.API_KEY || "";
  } catch (e) {
    return "";
  }
};

const ai = new GoogleGenAI({ apiKey: getApiKey() });

export async function processQuery(query: string, history: {role: string, content: string}[]) {
  const apiKey = getApiKey();
  if (!apiKey) {
    return {
      response: "API Key is missing. Please check your environment variables.\n密鑰遺失，請檢查環境變數設定。",
      foundContact: undefined
    };
  }

  try {
    const model = ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        ...history.map(h => ({
          role: h.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: h.content }]
        })),
        { role: 'user', parts: [{ text: query }] }
      ],
      config: {
        systemInstruction: SYSTEM_PROMPT,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            responseMessage: {
              type: Type.STRING,
              description: "The professional response to the user's inquiry."
            },
            matchedName: {
              type: Type.STRING,
              description: "The name of the HR contact person if a match is found, otherwise empty string."
            }
          },
          required: ["responseMessage"]
        }
      }
    });

    const result = await model;
    const jsonStr = result.text.trim();
    const data = JSON.parse(jsonStr);

    let foundContact: HRContact | undefined = undefined;
    if (data.matchedName) {
      foundContact = IIS_HR_CONTACTS.find(c => 
        data.matchedName.toLowerCase().includes(c.name.split(' ').pop()?.toLowerCase() || "") ||
        data.matchedName.toLowerCase().includes(c.name.split(' ').shift()?.toLowerCase() || "")
      );
    }

    return {
      response: data.responseMessage,
      foundContact
    };
  } catch (error) {
    console.error("Gemini API Error:", error);
    return {
      response: "I'm sorry, I'm having trouble processing your request right now. Please try again or contact the HR office directly.\n抱歉，處理您的請求時出現問題。請稍後再試，或直接聯絡人事室。",
      foundContact: undefined
    };
  }
}
