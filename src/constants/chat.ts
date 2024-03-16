import { v4 as uuidv4 } from 'uuid';
import { ChatInterface, ConfigInterface, ModelOptions } from '@type/chat';
import useStore from '@store/store';

export const _defaultSystemMessage =
  import.meta.env.VITE_DEFAULT_SYSTEM_MESSAGE ??
  `Carefully heed the user's instructions and follow the user's will to the best of your ability.
Respond using Markdown.`;

export const defaultModel = 'gpt-3.5-turbo';

export let modelOptions: ModelOptions[] = [];

export let modelMaxToken: Record<string, number> = {};

const fetchModels = async (): Promise<void> => {
  const apiUrl = `${import.meta.env.VITE_OPENAI_BASE_URL}/v1/models`;

  try {
    const response = await fetch(apiUrl, { mode: 'cors' });
    const data: { object: string; data: any[] } = await response.json();

    if (data.object === 'list' && Array.isArray(data.data)) {
      modelOptions = data.data
        .filter((model) => model.tokens)
        .map((model) => model.id)
        .sort();

      modelMaxToken = data.data.reduce((acc, model) => {
        if (model.tokens) {
          acc[model.id] = model.tokens;
        }
        return acc;
      }, {} as Record<string, number>);
    } else {
      console.error('Invalid API response format');
    }
  } catch (error) {
    console.error('Error fetching models from the API', error);
  }
};

fetchModels();

export const modelCost = {};

export const defaultUserMaxToken = 16384;

export const _defaultChatConfig: ConfigInterface = {
  model: defaultModel,
  max_tokens: defaultUserMaxToken,
  temperature: 1,
  presence_penalty: 0,
  top_p: 1,
  frequency_penalty: 0,
  web_search: false,
};

export const generateDefaultChat = (
  title?: string,
  folder?: string
): ChatInterface => ({
  id: uuidv4(),
  title: title ? title : 'New Chat',
  messages:
    useStore.getState().defaultSystemMessage.length > 0
      ? [{ role: 'system', content: useStore.getState().defaultSystemMessage }]
      : [],
  config: { ...useStore.getState().defaultChatConfig },
  titleSet: false,
  folder,
});

export const codeLanguageSubset = [
  'python',
  'javascript',
  'java',
  'go',
  'bash',
  'c',
  'cpp',
  'csharp',
  'css',
  'diff',
  'graphql',
  'json',
  'kotlin',
  'less',
  'lua',
  'makefile',
  'markdown',
  'objectivec',
  'perl',
  'php',
  'php-template',
  'plaintext',
  'python-repl',
  'r',
  'ruby',
  'rust',
  'scss',
  'shell',
  'sql',
  'swift',
  'typescript',
  'vbnet',
  'wasm',
  'xml',
  'yaml',
];
