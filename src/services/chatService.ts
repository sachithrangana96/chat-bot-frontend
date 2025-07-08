import { IChatRequest, IChatResponse } from "@/interfaces";

export const sendMessageToBot = async (payload: IChatRequest): Promise<IChatResponse> => {
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
