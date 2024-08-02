import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import UrlGo from './components/UrlGo';
import { LocaleProvider } from './contexts/LocaleContext';
import { UserProvider } from './contexts/UserContext';
import './styles/tailwind.css';
import { Reader } from './components';
// import Reading from './reading';
import type { Article } from './api';

const IndexPage: React.FC = () => {
    const [url, setUrl] = useState<string | null>(null);
    const [article, setArticle] = useState<Article | null>(null);
    
    useEffect(() => {
        console.log("---------------- use effect")
        const params = new URLSearchParams(window.location.search);
        console.log("params: ", params)
        const url = params.get('url');
        console.log("url: ", url)
        if (url) {
            setUrl(url);
        }
    }, [])

    return (
        <UserProvider>
            <LocaleProvider>
                {article ?
                    <Reader selectedArticle={article} /> :
                    // <Reading article={article} /> :
                    <UrlGo initUrl={url} onFetchArticle={(article) => setArticle(article)} />
                }
            </LocaleProvider>
        </UserProvider>
    );
}

ReactDOM.render(
    <React.StrictMode>
        <IndexPage />
    </React.StrictMode>,
    document.getElementById('root')
);
