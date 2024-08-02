// import { AxiosError } from 'axios';
import { addArticle } from './article';
import type { Article } from './types';
import getStorage from './storage';
import type { StorageValue } from "./storage"
// shared/src/api/api.ts
import axios from 'axios';
import type { Method } from 'axios';

const BASE_API_URL = process.env.REACT_APP_API_URL 
//PLASMO_PUBLIC_BASE_API_URL;
// || 'http://localhost:5000';

console.log("base url: ", BASE_API_URL)

export type RequestData = string | number | object | undefined;
export interface ResponseData<T = any> {
    success: boolean;
    message: string;
    data: T;
}

const storage = getStorage();
export const apiRequest = async <T>(
    url: string,
    method: Method,
    data?: RequestData,
): Promise<ResponseData<T>> => {
    const accessToken = await storage.getItem<StorageValue>('accessToken');
    let headers: Record<string, string> = {};
    if (accessToken && typeof accessToken === 'string') {
        headers['Authorization'] = `Bearer ${accessToken}`;
    }

    try {
        const response = await axios({
            url: `${BASE_API_URL}${url}`,
            method,
            data,
            headers,
        });

        if (response.status !== 200 && response.status !== 201) {
            throw new Error(response.statusText);
        }

        return response.data;
    } catch (error: any) {
        if (error && error.response) {
            throw error.response.data;
        } else {
            throw new Error('An unknown error occurred');
        }
    }
};

export function fetchMainArticleElement() {
    // Check for common semantic tags
    const commonTags = ['article', 'main', 'section'];
    for (const tag of commonTags) {
        console.log("detect tag ", tag)
        const elements = document.getElementsByTagName(tag);
        console.log("length: ", elements.length)
        if (elements.length > 0) {
            return elements[0]; // Return the first matching element
        }
    }

    // Check for common class names
    const commonClasses = ['content', 'main', 'article', 'post'];
    for (const className of commonClasses) {
        const elements = document.getElementsByClassName(className);
        if (elements.length > 0) {
            return elements[0]; // Return the first matching element
        }
    }

    // Check for common ID names
    const commonIDs = ['content', 'main', 'article', 'post'];
    for (const id of commonIDs) {
        const element = document.getElementById(id);
        if (element) {
            return element; // Return the matching element
        }
    }

    // Check for the largest text block
    const allElements = Array.from(document.body.getElementsByTagName('*'));
    let largestElement: Element | null = null;
    let maxTextLength = 0;
    for (const element of allElements) {
        if (element instanceof HTMLElement && element.offsetWidth > 0 && element.offsetHeight > 0) { // Only consider visible elements
            const textLength = element.textContent?.length || 0;
            if (textLength > maxTextLength) {
                maxTextLength = textLength;
                largestElement = element;
            }
        }
    }

    return largestElement; // Return the largest text block element
}
// make fetchMainArticleContent return an Article declaration
export function fetchMainArticleContent(): Article {
    const articleElement = fetchMainArticleElement()
    if (!articleElement) {
        throw new Error('Could not find article element');
    }
    const ps = articleElement.querySelectorAll("p");
    const paragraphs: { [key: string]: string } = {};
    let i = 1;
    ps.forEach((p) => {
        paragraphs[(i++).toString()] = p.innerText;
    });

    const info = collectArticleInfo();

    // make return as an Article type
    return {
        ...info,
        id: 0,
        user_id: null,
        word_count: 0,
        site: "",
        created_at: "",
        paragraphs,
        unfamiliar_words: []
    };
}

export function addArticleFromDocument() {
    const article = fetchMainArticleContent();
    article.paragraphs = Object.values(article.paragraphs);
    console.log("fetch article: ");
    console.log(article);
    return addArticle(article);
}

// import { api } from './api';

function getMetaContentByName(name: string): string | null {
    const meta = document.querySelector(`meta[name='${name}']`);
    return meta ? meta.getAttribute('content') : null;
}

function getMetaContentByProperty(property: string): string | null {
    const meta = document.querySelector(`meta[property='${property}']`);
    return meta ? meta.getAttribute('content') : null;
}

export function collectArticleInfo() {
    // Collect the URL
    const url = window.location.href;

    // Collect the author (assuming it's stored in a meta tag)
    let author = getMetaContentByName('author') || getMetaContentByProperty('article:author') || null;

    // Collect the site name (assuming it's stored in a meta tag or can be derived from the document title)
    let siteName = getMetaContentByProperty('og:site_name') || document.title;

    const getSiteIcon = (): string | null => {
        // Query for the link element with rel='icon'
        const linkElement = document.querySelector("link[rel~='icon']");

        // Use a type assertion to cast it to HTMLLinkElement
        const siteIcon = linkElement ? (linkElement as HTMLLinkElement).href : null;

        return siteIcon;
    };
    // Collect the site icon (assuming it's stored in a link tag with rel='icon')
    let siteIcon = getSiteIcon()

    // Fallbacks for when the data is not found
    author = author || "Unknown Author";
    siteName = siteName || window.location.hostname;
    siteIcon = siteIcon || `https://${window.location.hostname}/favicon.ico`;

    return {
        url: url,
        title: document.title,
        author: author,
        site_name: siteName,
        site_icon: siteIcon
    };
}

export function cleanWord(word: string): string {
    return word.replace(/[.,/#?!$%^&*;:{}=\-_`~()]/g, "").toLowerCase();
}

export const getQueryParams = (): { [key: string]: string } => {
    const params = new URLSearchParams(window.location.search);
    const result: { [key: string]: string } = {};

    params.forEach((value, key) => {
        result[key] = value;
    });

    return result;
};