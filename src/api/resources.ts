interface Resource {
    name: string;
    icon_url: string;
    url: string;
  }
  
interface ReadingResources {
[category: string]: Resource[];
}

const readingResources: ReadingResources =  {
    "news": [
        {
            "name": "BBC News",
            "icon_url": "https://news.bbcimg.co.uk/nol/shared/img/bbc_news_120x60.gif",
            "url": "https://www.bbc.com/news"
        },
        {
            "name": "CNN",
            "icon_url": "https://cdn.cnn.com/cnn/.e/img/3.0/global/misc/cnn-logo.png",
            "url": "https://www.cnn.com"
        },
        {
            "name": "Reuters",
            "icon_url": "https://www.reuters.com/pf/resources/images/reuters/logo-graphics/logo-graphics-glyph.svg",
            "url": "https://www.reuters.com"
        },
        {
            "name": "The New York Times",
            "icon_url": "https://static01.nyt.com/vi-assets/images/share/1200x675_nameplate.png",
            "url": "https://www.nytimes.com"
        },
        {
            "name": "The Guardian",
            "icon_url": "https://assets.guim.co.uk/images/favicons/favicon-192x192.png",
            "url": "https://www.theguardian.com"
        },
        {
            "name": "China Daily",
            "icon_url": "http://www.chinadaily.com.cn/favicon.ico",
            "url": "https://www.chinadaily.com.cn/"
        },
        {
            "name": "Global Times",
            "icon_url": "https://www.globaltimes.cn/favicon.ico",
            "url": "https://www.globaltimes.cn/"
        },
        {
            "name": "South China Morning Post",
            "icon_url": "https://www.scmp.com/favicon.ico",
            "url": "https://www.scmp.com/"
        },
        {
            "name": "Xinhua News",
            "icon_url": "http://www.xinhuanet.com/favicon.ico",
            "url": "http://www.xinhuanet.com/english/"
        },
        {
            "name": "Shanghai Daily",
            "icon_url": "https://www.shine.cn/favicon.ico",
            "url": "https://www.shine.cn/"
        }
    ],
    "novels": [
        {
            "name": "Project Gutenberg",
            "icon_url": "https://www.gutenberg.org/images/gutenberg_logo_128.png",
            "url": "https://www.gutenberg.org"
        },
        {
            "name": "ManyBooks",
            "icon_url": "https://www.manybooks.net/sites/default/files/logo.png",
            "url": "https://manybooks.net"
        },
        {
            "name": "Open Library",
            "icon_url": "https://openlibrary.org/static/images/openlibrary-logo-tighter.svg",
            "url": "https://www.openlibrary.org"
        },
        {
            "name": "Smashwords",
            "icon_url": "https://www.smashwords.com/images/smashwords-logo-blue-black.png",
            "url": "https://www.smashwords.com"
        },
        {
            "name": "BookRix",
            "icon_url": "https://www.bookrix.com/files/bx/bx_logo_trans.png",
            "url": "https://www.bookrix.com"
        }
    ],
    "literature": [
        {
            "name": "Literature.org",
            "icon_url": "https://www.literature.org/images/litorg-logo.png",
            "url": "https://www.literature.org"
        },
        {
            "name": "Bartleby",
            "icon_url": "https://www.bartleby.com/content/bartleby/site_bartleby_logo.png",
            "url": "https://www.bartleby.com"
        },
        {
            "name": "Poetry Foundation",
            "icon_url": "https://www.poetryfoundation.org/themes/custom/poetryfoundation/images/apple-touch-icon.png",
            "url": "https://www.poetryfoundation.org"
        },
        {
            "name": "Classic Reader",
            "icon_url": "https://www.classicreader.com/static/img/logo.4a2d2ac1.svg",
            "url": "https://www.classicreader.com"
        },
        {
            "name": "American Literature",
            "icon_url": "https://americanliterature.com/favicon-32x32.png",
            "url": "https://www.americanliterature.com"
        }
    ],
    "educational_articles": [
        {
            "name": "Khan Academy Blog",
            "icon_url": "https://cdn.kastatic.org/images/khan-logo-dark-background.new.png",
            "url": "https://blog.khanacademy.org/"
        },
        {
            "name": "Academic Earth Blog",
            "icon_url": "https://www.academicearth.org/assets/images/logo.png",
            "url": "https://www.academicearth.org/blog/"
        },
        {
            "name": "edX Blog",
            "icon_url": "https://blog.edx.org/wp-content/uploads/2018/01/edX_Logo_White_RGB_FINAL-1-300x110.png",
            "url": "https://blog.edx.org/"
        },
        {
            "name": "TED Blog",
            "icon_url": "https://tedconfblog.files.wordpress.com/2018/08/cropped-ted_logo_square.jpg?w=240",
            "url": "https://blog.ted.com/"
        },
        {
            "name": "Coursera Blog",
            "icon_url": "https://blog.coursera.org/wp-content/uploads/2018/08/Coursera-blog-logo-150x150.png",
            "url": "https://blog.coursera.org/"
        }
    ],
    "magazines": [
        {
            "name": "The New Yorker",
            "icon_url": "https://www.newyorker.com/favicon.ico",
            "url": "https://www.newyorker.com"
        },
        {
            "name": "National Geographic",
            "icon_url": "https://www.nationalgeographic.com/etc/designs/platform/refresh/img/favicon.ico",
            "url": "https://www.nationalgeographic.com"
        },
        {
            "name": "Time",
            "icon_url": "https://time.com/favicon.ico",
            "url": "https://www.time.com"
        },
        {
            "name": "The Atlantic",
            "icon_url": "https://www.theatlantic.com/static/front/images/favicon.ico",
            "url": "https://www.theatlantic.com"
        },
        {
            "name": "Scientific American",
            "icon_url": "https://www.scientificamerican.com/sciam/cache/file/AFB42BD5-3EBC-4516-A3E6A8F488B396B7.png?w=48&h=48",
            "url": "https://www.scientificamerican.com"
        }
    ],
    "science": [
        {
            "name": "Scientific American",
            "icon_url": "https://www.scientificamerican.com/sciam/cache/file/AFB42BD5-3EBC-4516-A3E6A8F488B396B7.png?w=48&h=48",
            "url": "https://www.scientificamerican.com"
        },
        {
            "name": "Nature",
            "icon_url": "https://www.nature.com/static/publish/images/favicon.ico",
            "url": "https://www.nature.com"
        },
        {
            "name": "Science Daily",
            "icon_url": "https://www.sciencedaily.com/images/logos/logo2.png",
            "url": "https://www.sciencedaily.com"
        },
        {
            "name": "Popular Science",
            "icon_url": "https://www.popsci.com/favicon.ico",
            "url": "https://www.popsci.com"
        },
        {
            "name": "Live Science",
            "icon_url": "https://www.livescience.com/favicon.ico",
            "url": "https://www.livescience.com"
        }
    ],
    "technology": [
        {
            "name": "TechCrunch",
            "icon_url": "https://techcrunch.com/favicon.ico",
            "url": "https://www.techcrunch.com"
        },
        {
            "name": "Wired",
            "icon_url": "https://www.wired.com/favicon.ico",
            "url": "https://www.wired.com"
        },
        {
            "name": "Ars Technica",
            "icon_url": "https://arstechnica.com/favicon.ico",
            "url": "https://www.arstechnica.com"
        },
        {
            "name": "The Verge",
            "icon_url": "https://www.theverge.com/favicon.ico",
            "url": "https://www.theverge.com"
        },
        {
            "name": "Gizmodo",
            "icon_url": "https://gizmodo.com/favicon.ico",
            "url": "https://www.gizmodo.com"
        }
    ]
}

export default readingResources