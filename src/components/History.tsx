import React, { useEffect, useState } from 'react';
import { getArticles, getArticle } from '../api/article';
import Reader from '../components/Reader';
import Loading from './Loading';
import type {Article} from '../api/types';
import "../styles/history.css"
// import defaultSiteLogo from "../assets/default-site-logo.png" 

const History = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<Article|null>(null);
  const [loading, setLoading] = useState(false)
  const defaultSiteLogo = ""

  // Retrieve articles list in useEffect
  useEffect(() => {
    const init = async () => {
      const response = await getArticles();
      if (response.success) {
        setArticles(response.data);
      }
    };
    init();
  }, []);

  const handleArticleClick = async (article: Article) => {
    console.log("set article: ", article.title)
    setLoading(true)
    const newArticle = await getArticle(article.id);
    console.log(newArticle)
    setLoading(false)
    setSelectedArticle(newArticle);
  };

  return (
    <div className="flex">
      <div className="w-1/5 ">
        <div className="p-4 bg-white shadow-lg rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Articles</h2>
          {/* add tailwind style to make ul scroll in height, set its height to 100% and set its overflow to auto. See https://tailwindcss.com/docs/scroll-snap-scroll-snap-x-y#scroll-snap-properties for more info.  */}
          <ul className="h-[80vh] space-y-2 overflow-y-auto mandatory-snap-x">
            {articles && articles.length > 0 ? (
              articles.map((article) => (
                <li key={article.id} onClick={() => handleArticleClick(article)} className="cursor-pointer hover:bg-gray-200 p-2 rounded">
                  <div className="text-sm font-semibold h-10 overflow-hidden text-ellipsis" title={article.title}>
                    {article.title}
                  </div>
                  <div className="flex space-x-4">
                    <span className="site-icon"><img src={article.site_icon ? article.site_icon : defaultSiteLogo} /></span>
                    <span className="text-md pt-1 text-gray-600">Word Count: {article.word_count}</span>
                  </div>
                </li>
              ))
            ) : (
              <li className="text-gray-500">No articles found</li>
            )}
          </ul>
        </div>
      </div>
      <div className="w-4/5">
        <div className="">
          {loading && <Loading />}
          {selectedArticle ? (
            <Reader selectedArticle={selectedArticle} />
          ) : (
            <div className="w-100 h-100 flex items-center justify-center">
              <p className="text-gray-500 ">Select an article to view its content</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default History;
