import React, { useState } from 'react';
import type { ChangeEvent, KeyboardEvent } from'react';
import locales from '../api/locales';
import { updateLocale } from '../api/user';
import { useUser } from '../contexts/UserContext';
import { useLocale } from '../contexts/LocaleContext';

interface Locale {
  locale: string;
  country: string;
  flag: string;
}

const LocaleSelector = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const { locale, setLocale } = useLocale(); //useState({"locale": "zh-CN", "country": "China", "flag": "🇨🇳"});
    const [highlightedIndex, setHighlightedIndex] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const { user } = useUser();

    const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
        setIsOpen(true);
    };

    const handleSelect = (locale: Locale) => {
        setLocale(locale);
        setSearchTerm('');
        setIsOpen(false);

        // update locale to server if user logged in
        if (user && user.id) {
            updateLocale(locale);
        }
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (!isOpen) return;

        if (event.key === 'ArrowDown') {
            setHighlightedIndex((prevIndex) =>
                Math.min(prevIndex + 1, filteredLocales.length - 1)
            );
        } else if (event.key === 'ArrowUp') {
            setHighlightedIndex((prevIndex) =>
                Math.max(prevIndex - 1, 0)
            );
        } else if (event.key === 'Enter') {
            handleSelect(filteredLocales[highlightedIndex]);
        }
    };

    const filteredLocales = locales.filter(locale =>
        locale.country.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="w-full mx-auto mt-2 relative group" onMouseLeave={() => setIsOpen(false)}>
            <p>Native Language: </p>
            <input
                type="text"
                placeholder={locale ? `${locale.flag} ${locale.country}` : "Select or search country"}
                value={searchTerm}
                onChange={handleSearch}
                onClick={() => setIsOpen(true)}
                onKeyDown={handleKeyDown}
                className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {isOpen && (
                <div className="absolute z-10 w-full bg-white border rounded-lg shadow-lg max-h-60 overflow-y-auto">
                    <ul className="max-h-48 overflow-y-auto">
                        {filteredLocales.map((locale, index) => (
                            <li
                                key={index}
                                className={`px-4 py-2 cursor-pointer flex justify-between ${highlightedIndex === index ? 'bg-blue-100' : ''}`}
                                onClick={() => handleSelect(locale)}
                                onMouseEnter={() => setHighlightedIndex(index)}
                            >
                                <span>{locale.flag} {locale.country}</span>
                                {/* <span>{locale.locale}</span> */}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default LocaleSelector;