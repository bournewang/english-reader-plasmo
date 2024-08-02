import React from 'react';
import ReactDOM from'react-dom';
import UrlGo from './components/UrlGo';
import { LocaleProvider } from './contexts/LocaleContext';
import { UserProvider } from './contexts/UserContext';
import Reader from './components/Reader';
import type { Article } from './api/types';
import './styles/tailwind.css';
 
interface readingProps {
    article: Article
}
const Reading: React.FC<readingProps> = ({ article }) => {
    return (
        <React.StrictMode>
            <UserProvider>
                <LocaleProvider>
                    <Reader selectedArticle={article}/>
                </LocaleProvider>
            </UserProvider>
        </React.StrictMode>
    );
}

export default Reading;