import { apiRequest } from './helper';

export const translateText = async (text: string, target_lang?: string): Promise<string | null> => {
    const response = await apiRequest(`/translate/text`, 'POST', { text, target_lang });
    if (response.success) {
      return response.data as string;
    }
    return null;
  };
