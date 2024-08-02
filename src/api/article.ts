import { apiRequest } from './helper';
import type { ResponseData } from './helper';
import type { Article, Idiom } from './types';

export const addArticle = async (data = {}) => {
    return apiRequest('/articles/create', 'POST', data);
};

export const getArticle = async (articleId: number): Promise<Article> => {
    const response = await apiRequest<Article>(`/reading_articles/${articleId}`, 'GET');
    if (response.success) {
        return response.data;
    } else {
        throw new Error(response.message);
    }
};

export const getArticles = async (): Promise<ResponseData<Article[]>> => {
    return apiRequest<Article[]>(`/reading_articles/list`, 'GET');
};

export const analyzeArticle = async (article_id: number): Promise<ResponseData<Idiom[]>> => {
    return apiRequest<Idiom[]>(`/ai/analyze/${article_id}`, 'GET');
};