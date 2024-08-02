import { apiRequest } from './helper';
import type { ResponseData } from './helper';
import type { Article } from './types';

export const readFromUrl = async (url: string): Promise<ResponseData<Article>> => {
    return apiRequest(`/reading?url=${url}`, 'GET');
};