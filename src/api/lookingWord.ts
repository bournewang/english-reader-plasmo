import { apiRequest } from './helper';
import type { ResponseData } from './helper';
// import {ResponseData} from './types/ResponseData';
import type {Word, Article} from "./types"

export const addLookingWord = async (word: string, articleId: number, paragraphId: number): Promise<ResponseData<Word>> => {
    return apiRequest('/unfamiliar_word/add', 'POST', { word, article_id: articleId, paragraph_id: paragraphId });
};

export const removeLookingWord = async (word: string, articleId: number, paragraphId: number): Promise<ResponseData<{ article: Article }>> => {
    return apiRequest<{ article: Article }>(`/unfamiliar_word/delete`, 'DELETE', { word, article_id: articleId, paragraph_id: paragraphId });
  };

export const getLookingWords = async (): Promise<ResponseData<Word[]>> => {
    return apiRequest('/unfamiliar_word/get', 'GET');
};

export const getLookingWordsByArticle = async (articleId: number) => {
    return apiRequest('/unfamiliar_word/get/by_article/'+articleId, 'GET');
};