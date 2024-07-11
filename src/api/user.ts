import axios from 'axios';

const BASE_API_URL = process.env.REACT_APP_API_URL;
// const BASE_API_URL = "http://127.0.0.1:5000"
import { apiRequest } from './helper';
import type { Locale } from './types';


export const registerUser = async (email: string, password: string) => {
    try {
      const response = await axios.post(`${BASE_API_URL}/auth/register`, { email, password });
      console.log("response: ", response);
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        throw error.response.data;
      } else {
        throw new Error('An unknown error occurred');
      }
    }
  };
  
  export const loginUser = async (email: string, password: string) => {
    try {
      const response = await axios.post(`${BASE_API_URL}/auth/login`, { email, password });
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        throw error.response?.data;
      } else {
        throw new Error('An unknown error occurred');
      }
    }
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