// Article export interface
export interface Article {
    id: number;
    user_id: number | null;
    title: string;
    word_count: number;
    author?: string | null;
    url?: string | null;
    site?: string | null;
    site_name?: string | null;
    site_icon?: string | null;
    created_at?: string | null;
    paragraphs: Paragraphs;
    // FIXME
    unfamiliar_words: string[]
    // reading_articles: ReadingArticle[];
}

// Paragraph export interface
export interface Paragraph {
    id: number;
    article_id: number;
    text: string;
    word_count: number;
    unfamiliar_words: UnfamiliarWord[];
}

// Plan export interface
export interface Plan {
    id: string;
    product_id: string;
    name: string;
    description: string;
    interval_unit: string;
    interval_count: number;
    value: string;
    currency: string;
    subscriptions: Subscription[];
}

// ReadingArticle export interface
export interface ReadingArticle {
    id: number;
    user_id: number;
    article_id: number;
    title: string;
    word_count: number;
    created_at?: string | null;
    unfamiliar_words: UnfamiliarWord[];
}

// Subscription export interface
export interface Subscription {
    id: string;
    user_id: number;
    plan_id: string;
    plan_name: string;
    status: 'PENDING' | 'ACTIVE' | 'INACTIVE' | 'CANCELLED' | 'EXPIRED';
    created_at: string;
    updated_at: string;
}

// UnfamiliarWord export interface
export interface UnfamiliarWord {
    id: number;
    user_id: number;
    word: string;
    reading_article_id: number;
    paragraph_id: number;
    created_at?: string | null;
}

// User export interface
export interface User {
    id: number;
    email: string;
    password_hash: string;
    created_at: string;
    premium: boolean;
    expires_at?: string | null;
    status: 'ACTIVE' | 'INACTIVE' | 'BANNED';
    locale: string;
    country: string;
    subscriptions: Subscription[];
}

export interface Locale {
    locale: string;
    country: string;
    flag: string;
}

export interface Word {
    id: number;
    word: string;
    article_id: number;
    article_title: string;
    paragraph_id: number;
    paragraph_text: string;
    created_at: string;
    // FIXME
    article: Article;
}



export interface License {
    name: string;
    url: string;
}

export interface Phonetic {
    text: string;
    audio: string;
    sourceUrl?: string;
    license?: License;
}

export interface Definition {
    definition: string;
    synonyms: string[];
    antonyms: string[];
    example?: string;
}

export interface Meaning {
    partOfSpeech: string;
    definitions: Definition[];
    synonyms: string[];
    antonyms: string[];
}

export interface DictDetail {
    word: string;
    phonetic: string;
    phonetics: Phonetic[];
    meanings: Meaning[];
    license: License;
    sourceUrls: string[];
}

export type Paragraphs = { [paragraphId: number]: string | null};
export type Translations = { [paragraphId: number]: string | null };

export interface Stats {
    today_word_count: number;
    today_word_count_change: number;
    week_word_count: number;
    week_word_count_change: number;
    month_word_count: number;
    month_word_count_change: number;
    total_word_count: number;
    total_word_count_change: number;
    today_words: number;
    today_words_change: number;
    week_words: number;
    week_words_change: number;
    month_words: number;
    month_words_change: number;
    total_words: number;
    total_words_change: number;
    today_articles: number;
    today_articles_change: number;
    week_articles: number;
    week_articles_change: number;
    month_articles: number;
    month_articles_change: number;
    total_articles: number;
    total_articles_change: number;
  }