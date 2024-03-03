import { ShareGPTSubmitBodyInterface } from '@type/api';
import { ConfigInterface, MessageInterface } from '@type/chat';
import { supabase } from '@utils/supabaseClient';
// Environment variables - remember to define in Vercel
const endpoint =
  `${import.meta.env.VITE_OPENAI_BASE_URL}/chat/completions` ??
  'https://api.openai.com/v1/chat/completions';
const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
const client = supabase;
export const getChatCompletion = async (
  messages: MessageInterface[],
  config: ConfigInterface,
  customHeaders?: Record<string, string>
) => {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...customHeaders,
  };
  if (apiKey) headers.Authorization = `Bearer ${apiKey}`;
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      ...headers,
    },
    body: JSON.stringify({
      messages,
      ...config,
      model: config.model,
      max_tokens: undefined,
      token: await getIdToken(),
      web_search: false,
    }),
    mode: 'cors',
  });
  // Error handling (catch-all)
  if (!response.ok) throw new Error(await response.json());

  const data = await response.json();
  return data;
};

export const getChatCompletionStream = async (
  messages: MessageInterface[],
  config: ConfigInterface,
  customHeaders?: Record<string, string>
) => {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...customHeaders,
  };
  if (apiKey) headers.Authorization = `Bearer ${apiKey}`;
  const response = await fetch(endpoint, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      messages,
      ...config,
      max_tokens: undefined,
      token: await getIdToken(),
      stream: true,
    }),
    mode: 'cors',
  });

  if (!response.ok) {
    const responseText = await response.text();
    let message = '';
    try {
      const parsedResponse = JSON.parse(responseText);
      message = JSON.stringify(parsedResponse);
    } catch (error) {
      message = responseText;
    }
    throw new Error(message);
  }
  const stream = response.body;
  return stream;
};

export const submitShareGPT = async (body: ShareGPTSubmitBodyInterface) => {
  const request = await fetch('https://sharegpt.com/api/conversations', {
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
  });

  const response = await request.json();
  const { id } = response;
  const url = `https://shareg.pt/${id}`;
  window.open(url, '_blank');
};

const getIdToken = async () => {
  const session = await client.auth.getSession();

  if (session?.data?.session) {
    const token = session.data.session.access_token;
    return token;
  }

  console.error('Invalid session.');
  return '';
};
