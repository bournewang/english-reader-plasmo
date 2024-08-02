import React, { useState, ChangeEvent, FormEvent,  useEffect } from 'react';
import { readFromUrl } from '../api/readingArticle';
import type { Article } from '../api/types';
// import Reader from './Reader';
// import React, { useState, ChangeEvent, FormEvent } from 'react';

interface UrlInputProps {
    initUrl: string | null;
    onFetchArticle: (article: any) => void;
}

const UrlInput: React.FC<UrlInputProps> = ({ initUrl, onFetchArticle }) => {
  const [url, setUrl] = useState('');

  useEffect(() => {
    // setUrl(url);
    console.log('initUrl', initUrl);
    // if (initUrl) {
    //     console.log("seturl ", initUrl)
    //     setUrl(initUrl);
        handleSubmit()
    // }
  }, [initUrl]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUrl(event.target.value);
  };

  const handleSubmit = async () => {
    // event.preventDefault();
    console.log('URL submitted:', url );
    console.log("initurl ", initUrl)
    
    // Simulate fetching article
    const requestUrl = url || initUrl
    if (requestUrl) {
        const response = await readFromUrl(requestUrl);
        const article = response.data;
        setArticle(article);
        onFetchArticle(article);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      {/* <form onSubmit={handleSubmit} className="flex flex-col items-center"> */}
        <div className="mb-4">
          <input
            type="text"
            value={url}
            onChange={handleInputChange}
            placeholder="Enter URL"
            className="w-80 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          onClick={handleSubmit}
          className="px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Go
        </button>
      {/* </form> */}
    </div>
  );
};

const fetchArticle = async (url: string) => {
  // Replace with actual fetch logic
  return new Promise<{ data: any }>((resolve) =>
    setTimeout(() => resolve({ data: { title: 'Article Title', content: 'Article Content' } }), 1000)
  );
};

const setArticle = (article: any) => {
  console.log('Article set:', article);
};

export default UrlInput;