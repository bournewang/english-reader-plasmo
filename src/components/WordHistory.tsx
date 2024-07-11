import React, { useEffect, useState } from 'react';
import { getLookingWords } from '../api/lookingWord';
import Reader from '../components/Reader';
import type { Article, Paragraphs, Word } from '../api/types';

const WordHistory = () => {
  const [words, setWords] = useState<Word[]>([]);
  // const [selectedWord, setSelectedWord] = useState(null);
  const [article, setArticle] = useState<Article | null>(null);

  // Retrieve words list in useEffect
  useEffect(() => {
    const init = async () => {
      const response = await getLookingWords();
      if (response.success) {
        setWords(response.data as Word[]);
      }
    };
    init();
  }, []);

  const handleWordClick = (word: Word) => {
    console.log("set word: ", word.word)
    // setSelectedWord(word);
    const paragraphs: Paragraphs = {};
    paragraphs["0"] = "..."
    paragraphs[word.paragraph_id] = word.paragraph_text
    paragraphs["-1"] = "..."
    // new an Article and assign data
    const article = {
      'id': word.article_id,
      'user_id': null,
      'title': word.article_title,
      'word_count': 0,
      'author': null,
      'url': null,
      'site': null,
      'site_name': null,
      'site_icon': null,
      'created_at': null,
      // paragraphs is an mapping with paragraph id to paragraph text
      'paragraphs': paragraphs,
      'unfamiliar_words': [word.word]
  }
    // console.log()
    setArticle(article)
  };
  return (
    <div className="flex">
      <div className="w-1/5 p-4 bg-white shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Vocabulary</h2>
        <ul className="h-[80vh] space-y-2 overflow-y-scroll mandatory-snap-x">
          {words && words.length > 0 ? (
            words.map((word) => (
              <li key={word.id} onClick={() => handleWordClick(word)} className="cursor-pointer hover:bg-gray-200 p-2 rounded">
                <div className="text-sm font-semibold">{word.word}</div>
                <div className="text-xs text-gray-600">{word.created_at}</div>
              </li>
            ))
          ) : (
            <li className="text-gray-500">No words found</li>
          )}
        </ul>
      </div>
      <div className="w-4/5">
        {article ? (
          <Reader selectedArticle={article} />
        ) : (
          <div className="text-gray-500">Select an article to view its content</div>
        )}
      </div>

    </div>
  )
};

export default WordHistory;
