import { apiRequest } from './helper';
import type { ResponseData } from './helper';
import type { Article } from './types';

export const addArticle = async (data = {}) => {
    return apiRequest('/articles/create', 'POST', data);
};

export const getArticle = async (articleId: number): Promise<Article> => {
    const response = await apiRequest<Article>(`/articles/${articleId}`, 'GET');
    if (response.success) {
        return response.data;
    } else {
        throw new Error(response.message);
    }
};

export const getArticles = async (): Promise<ResponseData<Article[]>> => {
    return apiRequest<Article[]>(`/articles/list`, 'GET');
};
