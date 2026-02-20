import { GoogleGenAI, Chat } from "@google/genai";
import { FLEET_DATA, SERVICES_DATA } from '../constants';

/* Guideline: API key must be obtained exclusively from process.env.API_KEY and used directly. */

let chatSession: Chat | null = null;

export const initializeChat = async () => {
  /* Use process.env.API_KEY directly in the named parameter. */
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const systemInstruction = `
    You are 'FastPoint Assistant', the helpful AI assistant for FastPoint Cab.
    
    Here is our Fleet information:
    ${JSON.stringify(FLEET_DATA.map(v => `${v.name} (${v.type}): $${v.pricePerHour}/hr, Seats: ${v.capacity}`))}
    
    Here are our Services:
    ${JSON.stringify(SERVICES_DATA.map(s => `${s.title}: ${s.description}`))}
    
    Your goal is to help users find the right vehicle, explain our services, or guide them to the booking form.
    Keep responses concise (under 50 words unless detailed info is requested).
    Be polite, professional, and friendly.
    If asked for a booking, guide them to use the booking form on the home page.
    We do not process payments in the chat.
  `;

  chatSession = ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction,
    },
  });

  return chatSession;
};

export const sendMessageToGemini = async (message: string): Promise<string> => {
  if (!chatSession) {
    await initializeChat();
  }
  
  if (!chatSession) {
    return "I'm sorry, I cannot connect to the server right now. Please try again later.";
  }

  try {
    const result = await chatSession.sendMessage({ message });
    /* Guideline: Use the .text property directly, not as a method. */
    return result.text || "I didn't quite catch that.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Sorry, I'm having trouble processing your request.";
  }
};