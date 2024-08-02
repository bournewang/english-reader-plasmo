import React, { useEffect, useState } from "react";
import DictPanel from "./DictPanel";
import { fetchDefinition } from "../api/dict";
import { translateText } from "../api/translate";
import { analyzeArticle } from "../api/article";
import type { Article, DictDetail, Paragraphs, Translations, Idiom } from "../api/types";
import { speakText } from "../api/tts";
import Loading from "../components/Loading";
import { addLookingWord, removeLookingWord } from "../api/lookingWord";
import { useUser } from "../contexts/UserContext";
import { cleanWord } from "../api/helper";
import LongPress from "./LongPress";
import "../styles/reader.css";
import { useLocale } from "../contexts/LocaleContext";

interface ReaderProps {
  selectedArticle: Article;
}

const Reader: React.FC<ReaderProps> = ({ selectedArticle }) => {
  const [definition, setDefinition] = useState<DictDetail | null>(null);
  const [bilingualMode, setBilingualMode] = useState(false);
  const [hint, setHint] = useState(true);
  const [article, setArticle] = useState<Article>({} as Article);
  const [translating, setTranslating] = useState<boolean[]>([]);
  const [analyzing, setAnalyzing] = useState(false);
  const [idioms, setIdioms] = useState<Idiom[]>([]);
  const [looking, setLooking] = useState(false);
  const [highlightParagraphs, setHighlightParagraphs] = useState<Paragraphs>({});
  const [translations, setTranslations] = useState<Translations>({});
  const { locale } = useLocale();
  // const [locale] = useState({ locale: "zh-CN" });
  const { user } = useUser();

  useEffect(() => {
    console.log("in reader: ")
    console.log(selectedArticle);
    const newArticle = { ...selectedArticle, translations: [] };
    setArticle(newArticle);

    setBilingualMode(false);

    // handle highlight paragraph
    const newParagraphs: Paragraphs = {};
    // setHighlightParagraphs()
    newArticle.paragraphs && Object.entries(newArticle.paragraphs).map(([index, paragraph]) => {
      console.log("paragraph: ", index, paragraph);
      if (paragraph && index)
        newParagraphs[parseInt(index)] = highlightText(paragraph, []) // FIXME: //newArticle.unfamiliar_words)
    })
    setHighlightParagraphs(newParagraphs);
  }, [selectedArticle]);

  const updateHighlightParagraphs = (paragraphId: number, unfamiliar_words: string[]) => {
    // console.log("new looking words: ", newArticle.unfamiliar_words);
    const newHighlightParagraphs = { ...highlightParagraphs };
    const text = article.paragraphs[paragraphId]
    if (text) {
      newHighlightParagraphs[paragraphId] = highlightText(text, unfamiliar_words)
      setHighlightParagraphs(newHighlightParagraphs);
    }
  }
  const handleDoubleClick = async (e: React.MouseEvent<HTMLParagraphElement>) => {
    const select = window?.getSelection()?.toString().trim();
    if (!select) return;
    const selectedWord = cleanWord(select);
    setDefinition(null);

    const paragraphElement = e.currentTarget.closest('.paragraph');
    if (!paragraphElement) return
    if (!(paragraphElement instanceof HTMLElement)) return
    const pid = paragraphElement.dataset.paragraphId;
    if (typeof pid !== 'string') {
      return
    }
    const paragraphId = parseInt(pid)
    // test if the target has a class "highlight"
    if (e.currentTarget.classList.contains("highlight")) {
      removeLookingWord(selectedWord, article.id, paragraphId).then(response => {
        console.log(response)
        if (response.success) {
          updateHighlightParagraphs(paragraphId, response?.data?.article?.unfamiliar_words)
        }
      })
    } else if (selectedWord && !selectedWord.includes(' ')) {
      setLooking(true);
      const result = await fetchDefinition(selectedWord);
      setLooking(false);
      if (result && result.length > 0) {
        setDefinition(result[0]);
        setHint(false);
        if (user?.id) {
          if (paragraphElement) {
            addLookingWord(selectedWord, article.id, paragraphId).then(response => {
              console.log(response)
              if (response.success) {
                const newArticle = response?.data?.article
                console.log("new looking words: ", newArticle.unfamiliar_words);
                const newHighlightParagraphs = { ...highlightParagraphs };
                if (paragraphId) {
                  const text = article.paragraphs[paragraphId]
                  if (text) {
                    newHighlightParagraphs[paragraphId] = highlightText(text, newArticle.unfamiliar_words)
                    setHighlightParagraphs(newHighlightParagraphs);
                  }
                }
              }
            })
          }
        }
      }
    }
  };
  const handleClick = async (e: React.MouseEvent<HTMLParagraphElement | HTMLSpanElement>) => {
    // if (!(e.currentTarget instanceof HTMLElement)){return}
    console.log(e.currentTarget)
    if (e.currentTarget.classList.contains("speaker-btn")) {
      const paragraphElement = e.currentTarget.closest('.paragraph');
      if (paragraphElement instanceof HTMLElement) {
        const pid = paragraphElement ? paragraphElement.dataset.paragraphId : null;
        // const pid = parseInt(paragraphId);
        if (pid) {
          const paragraphText = article.paragraphs[parseInt(pid)];
          if (paragraphText) speakText(paragraphText);
        }
      }
    } else if (e.currentTarget.classList.contains("highlight")) {
      if (e.currentTarget instanceof HTMLElement) {
        const select = e.currentTarget.innerText;
        const selectedWord = cleanWord(select)
        const result = await fetchDefinition(selectedWord);
        if (result && result.length > 0) {
          setDefinition(result[0]);
          setLooking(false);
          setHint(false);
        }
      }
    }
  };

  const handleTranslate = async (e: React.MouseEvent<HTMLParagraphElement>) => {
    const paragraphId = e.currentTarget.dataset.paragraphId;
    if (!paragraphId) return;
    const pid = parseInt(paragraphId);
    const text = article.paragraphs[pid];
    if (!text) return;

    setBilingualMode(true);

    setTranslating((prev) => {
      const newTranslating = [...prev];
      newTranslating[pid] = true;
      return newTranslating;
    });
    const newTranslations = { ...translations };

    try {
      console.log("locale: ", locale);
      newTranslations[pid] = await translateText(text, locale?.locale);
    } catch (e) {
      console.log(e)
    }

    setTranslating((prev) => {
      const newTranslating = [...prev];
      newTranslating[pid] = false;
      return newTranslating;
    });
    setTranslations(newTranslations);
  }

  const highlightText = (text: string, words_list: string[]) => {
    const words = text.split(' ');
    return words.map((text: string) => {
      const word = cleanWord(text)
      if (words_list.includes(word)) {
        return `<span key={index} className="highlight bg-green-300 cursor-pointer" onClick={handleClick}>{text} </span>`;
      }
      return text;
    }).join(' ');
  };

  const handleLongPress = async(e: React.TouchEvent, selection: string) => {
    // alert(`Long Pressed! Selected word: ${selection}`);
    console.log(e, selection); // Handle the event and selected word
    const selectedWord = cleanWord(selection)
    const result = await fetchDefinition(selectedWord);
    if (result && result.length > 0) {
      setDefinition(result[0]);
      setLooking(false);
      setHint(false);
    }

  };  

  const readArticle = () => {
    const articleText = Object.values(article.paragraphs).join("\n");
    speakText(articleText);
  };

  const analyzeWithAI = () => {
    setAnalyzing(true);
    analyzeArticle(article.id).then(response => {
      console.log(response)
      setAnalyzing(false);
      if (response.data) {
        setIdioms(response.data)
        markParagraphs()
      }
    })
  };

  const markParagraphs = () => {
    // const newHighlightParagraphs = { ...highlightParagraphs };
    if (article.paragraphs) {
      const idiomParagraphs: Paragraphs = {};
      // setHighlightParagraphs()
      article.paragraphs && Object.entries(article.paragraphs).map(([index, paragraph]) => {
        console.log("paragraph: ", index, paragraph);
        if (paragraph && index)
          // newParagraphs[parseInt(index)] = highlightText(paragraph, []) // FIXME: //newArticle.unfamiliar_words)
          idiomParagraphs[parseInt(index)] = paragraph
          for (let i = 0; i < idioms.length; i++) {
            const idiom = idioms[i];
            // console.log("check idiom: ", idiom.content)
            if (paragraph && paragraph.includes(idiom.content)) {
              console.log("found idiom: ", idiom.content)
              const replaced = paragraph.replace(idiom.content, `<span class="highlight bg-green-300 cursor-pointer" data-paragraph-id=${index}>${idiom.content}</span>`);
              console.log("replaced: ", replaced)
              idiomParagraphs[parseInt(index)] = replaced
            }
          }

      })
      setHighlightParagraphs(idiomParagraphs);
    }
  };

  return (article &&
    // <div id="reader-wrap1" className="flex w-full h-[90vh] overflow-y-scroll">
    <div id="reader-wrap" className="flex w-full h-[100vh] overflow-y-scroll flex-col md:flex-row">
      {/* <div id="main-article" className="mx-2 p-2 bg-white shadow-lg rounded-lg overflow-y-auto" style={{ width: '70%' }}> */}
      
      <div id="main-article" className="m-2 p-2 bg-white shadow-lg rounded-lg overflow-y-auto md:w-[70%] w-full h-full">
        <LongPress onLongPress={handleLongPress}>
        <div className="prose-lg max-w-full " style={{ maxWidth: '100%' }}>
          <h1 className="text-3xl font-bold mb-4 mr-2">{article.title}

            <button onClick={readArticle} className="ml-2 text-sm text-blue-600 font-bold py-2 px-4 rounded-md">
              Speech 🔊
            </button>
          </h1>
          <p>locale: {locale?.locale} {locale?.country}</p>
          {/* <p>{article.unfamiliar_words.map((word, index) => (
          <span key={word}>{word}, </span>
        ))}</p> */}

          <table className="min-w-full">
            <tbody>
              {highlightParagraphs && Object.entries(highlightParagraphs).map(([index, paragraph]: [string, string | null]) => {
                const numericIndex = Number(index);
                return (
                  <tr key={numericIndex} className="paragraph" data-paragraph-id={numericIndex}>
                    <td className="relative">
                      {paragraph && <p onDoubleClick={handleDoubleClick} dangerouslySetInnerHTML={{ __html: paragraph }}></p>}
                      {/* paragraph: {paragraph} */}
                      {bilingualMode && translations[numericIndex] &&
                        <p className={`text-blue-600 bg-gray-100 animate-slideDown`}>
                          {translations[numericIndex]}
                        </p>
                      }
                      {bilingualMode && translating[numericIndex] && <Loading />}
                    </td>
                    <td>
                      <p className="speaker-btn cursor-pointer" data-paragraph-id={numericIndex} onClick={handleClick}>🔊</p>
                      <p className="translate-icon cursor-pointer" data-paragraph-id={numericIndex} onClick={handleTranslate}>🌐</p>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        </LongPress>
      </div>
      
      {/* <div id="sidebar" className="bg-white mx-2 p-2 shadow-lg rounded-lg overflow-y-auto" style={{ width: '30%' }}> */}
      <div id="sidebar" className="bg-white m-2 p-2 shadow-lg rounded-lg overflow-y-auto md:w-[30%] w-full md:h-auto hidden md:block bg-gray-100 border-t-2 border-gray shadow-md shadow-black/10">
        <div id="controls-section" className="flex items-center space-x-4">
        </div>
        {hint &&
          <div className="pt- bg-blue-100 border border-blue-200 text-sm text-blue-800 rounded-lg p-4 dark:bg-blue-800/10 dark:border-blue-900 dark:text-blue-500" role="alert">
            <span className="font-bold">Info</span> Double-click any word in the article to see its definition and details here.
          </div>
        }
        {looking && <div className="mt-20 relative" ><Loading /></div>}
        {!hint && !looking && !definition &&
          <div className="mt-2 bg-red-100 border border-red-200 text-sm text-gray-800 rounded-lg p-4 dark:bg-gray-800/10 dark:border-gray-900 dark:text-blue-500" role="alert">
            <span className="font-bold">Error</span> Sorry pal, we couldnot find definitions for the word you were looking for.
          </div>
        }
        {<DictPanel detail={definition} />}
        <hr />
        <div className="">
          <button onClick={analyzeWithAI} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Analyze with ChatGPT</button>

          <div>
            {idioms && idioms.length > 0 && idioms.map((idiom, index) => (
              <div key={index} className="mt-2 text-sm text-gray-800 rounded-lg p-4 dark:bg-gray-800/10 dark:border-gray-900 dark:text-blue-500" role="alert">
                {idiom.type}: <span className="font-bold">{idiom.content}</span> 
                <span>{idiom.explain}</span>
                <span>{idiom.explain_1}</span>
              </div>
            )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reader;
