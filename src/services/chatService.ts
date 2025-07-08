import { ChatRequest, ChatResponse } from "@/interfaces";

export const sendMessageToBot = async (payload: ChatRequest): Promise<ChatResponse> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error('Failed to get bot response');
  }

  return await response.json();
};
