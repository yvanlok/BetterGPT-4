import { ShareGPTSubmitBodyInterface } from '@type/api';
import { ConfigInterface, MessageInterface } from '@type/chat';
import firebase from '@utils/firebase-auth';
// Environment variables - remember to define in Vercel
const endpoint =
  import.meta.env.VITE_OPENAI_BASE_URL ??
  'https://api.openai.com/v1/chat/completions';
const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

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
  headers.firebase_token = await getIdToken();
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
    }),
    mode: 'cors',
  });
  // Error handling (catch-all)
  if (!response.ok) throw new Error(await response.text());

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
  headers.firebase_token = await getIdToken();
  const response = await fetch(endpoint, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      messages,
      ...config,
      max_tokens: undefined,
      stream: true,
    }),
    mode: 'cors',
  });

  if (!response.ok) {
    const responseText = JSON.parse(await response.text());
    throw new Error(
      'Status Code: ' +
        (await response.status) +
        '\nError Message: ' +
        responseText.error.message
    );
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
  const currentUser = firebase.auth().currentUser;

  if (currentUser) {
    const idToken = await currentUser.getIdToken(true);
    return idToken;
  } else {
    return ''; // Return an empty string if currentUser is null
  }
};
