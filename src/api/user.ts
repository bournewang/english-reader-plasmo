import { apiRequest, ResponseData } from './helper';
import type { Locale, User } from './types';

export const registerUser = async (email: string, password: string) => {
    return apiRequest('/auth/register', 'post', {email, password})
  };
  
  export const loginUser = async (email: string, password: string):Promise<ResponseData<{access_token: string, user: User}>> => {
    return apiRequest<{access_token: string, user: User}>('/auth/login', 'post', {email, password})
  };

export const userInfo = async () => {
    return apiRequest("/auth/info", "GET");
};

export const logoutUser = async () => {
    return apiRequest("/auth/logout", "POST");
};

export const updateLocale = async (locale: Locale) => {
    return apiRequest("/user/locale", "POST", {locale});
};