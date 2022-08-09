import { format, set } from "date-fns";
import icon from "../functions/icon";
import Modal from "./modal";
import GinaResume from '../files/Gina_Henderson_Resume.pdf';
import Diddit from '../images/diddit.png';
import Rainey from '../images/rainey.png';
import Minecraft from '../images/minecraft.png';
import GinaTharinIcon from '../images/gina-tharin-favicon.png';
import GinaTharin from '../images/ginatharin.png';
import Caffeine from '../images/caffeine.png';

function History() {
    const past = [];
    const future = [];
    let currentPage = '';
    const setCurrentPage = (page) => {
        if (!page) return;
        currentPage = page;
    };
    const goForwards = () => {
        if (!future.length) return;
        past.push(currentPage);
        setCurrentPage(future.pop());
    };
    const goBackwards = () => {
        if (!past.length) return;
        future.push(currentPage);
        setCurrentPage(past.pop());
    };
    const movePages = (page) => {
        if (currentPage) past.push(currentPage);
        setCurrentPage(page);
    }
    const getPast = () => past;
    const getFuture = () => future;
    const getCurrentPage = () => currentPage;

    return {
        goForwards,
        goBackwards,
        setCurrentPage,
        movePages,
        getPast,
        getFuture,
        getCurrentPage,
    }
};

const File = (name, thumbnail, date = '', size = '') => {
    const container = document.createElement('div');
    container.classList.add('file');
    if (typeof thumbnail == 'string') {
        container.append(icon(thumbnail));
    }
    else {
        container.append(thumbnail);
    }
    const label = document.createElement('span');
    container.append(label);
    label.textContent = name;

    if (date) {
        const dateLabel = document.createElement('span');
        container.append(dateLabel)
        dateLabel.classList.add('file-info');
        dateLabel.textContent = format(new Date(date), 'P');
    }

    if (size) {
        const sizeLabel = document.createElement('span');
        container.append(sizeLabel);
        sizeLabel.classList.add('file-info');
        sizeLabel.textContent = size;
    }

    return container;
}

const appWindow = (() => {

    const fileExplorer = (() => {

        const fileHistory = History();

        const goBack = () => {
            if (!fileHistory.getPast().length) return close();
            fileHistory.goBackwards();
            updatePage();
        }

        const generateFile = (url, type, filename) => {
            const inner = (() => {
                const file = document.createElement('object');
                file.setAttribute('data', url);
                file.setAttribute('type', type);
                return file;
            })()
            const title = `Documents/${filename}`;
            return {
                inner,
                title
            }
        };
        const openFile = (url, type, filename) => {
            const file = generateFile(url, type, filename);
            setMainContent(file);
            if (filename == 'none') hideHeader();
            else showHeader();
        };

        const container = document.createElement('div');
        container.classList.add('file-explorer');

        const header = (() => {
            const header = document.createElement('header');
            const backButton = icon(
                'charm:chevron-left',
                ['back-button'],
            );
            const span = document.createElement('span');
            const exit = icon(
                'ep:close-bold',
                ['app-exit'],
            )

            backButton.addEventListener('click', goBack);
            span.textContent = 'Gina Henderson/Files';
            exit.addEventListener('click', () => close());

            header.append(
                backButton,
                span,
                exit,
            );

            const setText = (text) => span.textContent = `Gina Henderson/Files${text? '/' + text:''}`;

            return {
                header,
                setText,
            }
        })();
        const main = document.createElement('main');

        const backButton = icon('charm:chevron-left', ['app-back-button']);
        backButton.addEventListener('click', goBack);

        // Folders
        const documents = (() => {
            const container = document.createElement('div');
            container.classList.add('documents-inner');

            const files = [
                {
                    thumbnail: File(
                        'Resume.pdf',
                        'uiw:file-pdf',
                        '2021-11-20',
                        '565 KB',
                    ),
                    url: GinaResume,
                    type: 'application/pdf',
                    filename: 'Resume.pdf',
                },
            ];

            files.forEach((file) => {
                file.thumbnail.addEventListener('click', () => {
                    openFile(
                        file.url,
                        file.type,
                        `${file.filename}`,
                    );
                })
                container.append(file.thumbnail);
            })

            const description = document.createElement('span');
            description.classList.add('files-description');
            description.textContent = '1 item, 565 KB used';

            container.append(description);

            return {
                inner: container,
                title: 'Documents',
            };
        })();
        const webApps = (() => {
            const container = document.createElement('div');

            const files = [
                {
                    thumbnail: File(
                        'Diddit - To-Do List',
                        'mdi:checkbox-marked-outline',
                        '2022-07-09',
                    ),
                    url: 'https://ginahenderson.me/to-do-list/',
                    type: 'text/html',
                    filename: 'Diddit',
                },
                {
                    thumbnail: File(
                        'Calculator',
                        'fa-solid:calculator',
                        '2022-02-28',
                    ),
                    url: 'https://ginahenderson.me/calculator/',
                    type: 'text/html',
                    filename: 'Calculator',
                },
                {
                    thumbnail: File(
                        'My Library - Virtual Reading List',
                        'fa6-solid:book',
                        '2022-03-27',
                    ),
                    url: 'https://ginahenderson.me/library/',
                    type: 'text/html',
                    filename: 'My Library',
                },
            ]

            files.forEach((file) => {
                file.thumbnail.addEventListener('click', () => {
                    openFile(
                        file.url,
                        file.type,
                        'none',
                    );
                })
                container.append(file.thumbnail);
            })

            const description = document.createElement('span');
            description.classList.add('files-description');
            description.textContent = '3 items';

            container.append(description);

            return {
                inner: container,
                title: 'Web Apps',
            };
        })();
        const games = (() => {
            const container = document.createElement('div');

            const files = [
                {
                    thumbnail: File(
                        'Tic Tac Toe',
                        'mdi:checkbox-marked-outline',
                        '2022-07-09',
                    ),
                    url: 'https://ginahenderson.me/to-do-list/',
                    type: 'text/html',
                    filename: 'Diddit',
                },
                {
                    thumbnail: File(
                        'Calculator',
                        'fa-solid:calculator',
                        '2022-02-28',
                    ),
                    url: 'https://ginahenderson.me/calculator/',
                    type: 'text/html',
                    filename: 'Calculator',
                },
                {
                    thumbnail: File(
                        'My Library - Virtual Reading List',
                        'fa6-solid:book',
                        '2022-03-27',
                    ),
                    url: 'https://ginahenderson.me/library/',
                    type: 'text/html',
                    filename: 'My Library',
                },
            ]

            files.forEach((file) => {
                file.thumbnail.addEventListener('click', () => {
                    openFile(
                        file.url,
                        file.type,
                        'none',
                    );
                })
                container.append(file.thumbnail);
            })

            const description = document.createElement('span');
            description.classList.add('files-description');
            description.textContent = '3 items';

            container.append(description);

            return {
                inner: container,
                title: 'Games',
            }
        })();
        const trash = (() => {
            const container = document.createElement('div');
            container.textContent = 'traaaaash'

            return {
                inner: container,
                title: 'Recycling Bin',
            };
        })();

        const homePage = (() => {
            const container = document.createElement('div');

            const folders = [
                {
                    thumbnail: File(
                        'Documents',
                        'jam:folder-f',
                        '',
                        '1 item',
                    ),
                    content: documents,
                },
                {
                    thumbnail: File(
                        'Web Apps',
                        'jam:folder-f',
                        '',
                        '3 items',
                    ),
                    content: webApps,
                },
                {
                    thumbnail: File(
                        'Games',
                        'jam:folder-f',
                        '',
                        '4 items',
                    ),
                    content: games,
                },
                {
                    thumbnail: File(
                        'Recycling Bin',
                        'jam:folder-f',
                        '',
                        '1 item',
                    ),
                    content: trash,
                },
            ]

            folders.forEach((folder) => {
                folder.thumbnail.addEventListener('click', () => {
                    setMainContent(folder.content);
                })
                container.append(folder.thumbnail);
            })

            return {
                inner: container,
                title: '',
            };
        })();

        container.append(
            header.header,
            main,
            backButton,
        )

        const hideHeader = () => {
            header.header.classList.add('hidden');
            backButton.classList.add('shown');
        }
        const showHeader = () => {
            header.header.classList.remove('hidden');
            backButton.classList.remove('shown');
        }

        const setMainContent = (content) => {
            main.innerHTML = '';
            main.append(content.inner);
            if (content.title) showHeader();
            header.setText(content.title);
            if (fileHistory.getCurrentPage() !== content) fileHistory.movePages(content);
        }

        const updatePage = () => setMainContent(fileHistory.getCurrentPage());

        const resetMainContent = () => setMainContent(homePage);

        const modal = Modal.create(
            ['file-explorer'],
            container,
        );

        const open = () => Modal.open(modal);
        const close = () => Modal.close(modal);

        setMainContent(homePage);

        return {
            container,
            resetMainContent,
            setMainContent,
            open,
            close,
            documents,
            webApps,
            games,
            trash,
        }
    })();

    const browser = (() => {

        const Pages = (() => {
            const content = (name, img, desc, title, subtitle) => {
                const container = document.createElement('div');
                container.classList.add('content', name);

                const header = document.createElement('header');
                container.append(header);
                const h2 = document.createElement('h2');
                header.append(h2);
                h2.textContent = title;
                const h3 = document.createElement('h3');
                header.append(h3);
                h3.textContent = subtitle;

                const image = new Image();
                image.src = img;
                image.classList.add(name);

                container.append(image);

                const description = document.createElement('p');
                description.innerHTML = desc;

                container.append(description);

                return {
                    title,
                    content: container,
                }
            }

            const app = (link) => {
                const obj = document.createElement('object');
                obj.setAttribute('data', link);
                obj.setAttribute('type', 'text/html');
                obj.classList.add('app-screen');
                return obj;
            }

            const diddit = content(
                'diddit',
                Diddit,
                `<a href="https://ginahenderson.me/to-do-list" target="_blank">Diddit</a> is a CRUD to-do list app that utilizes local storage to maintain the user's unput. It also features UI customization features.`,
                'Diddit',
                'To-Do List Web App'
            );

            const raineyIceCream = content(
                'rainey',
                Rainey,
                `<a href="https://ginahenderson.me/rainey-ice-cream" target="_blank">Rainey Ice Cream</a> is a single-page mock website for the fictional restaurant Rainey Ice Cream. The site is built with HTML, CSS, and Vanilla Javascript utilizing Webpack. The site also has a custom Locations tab that uses the Mapbox API and GeoJSON to create fake worldwide locations for the restaurant.`,
                'Rainey Ice Cream',
                'Restaurant Website'
            )

            const minecraft = content(
                'minecraft',
                Minecraft,
                '<a href="https://ginahenderson.me/minecraft-guide" target = "_blank">Gina\'s Unofficial Minecraft Beginner\'s Guide</a> is a responsive website to teach novice Minecraft players how to beat the game. Vanilla CSS was used to style the page.',
                'Gina\'s Unofficial Minecraft Guide',
                'Instructional Website'
            )

            const caffeineClub = content(
                'caffeine',
                Caffeine,
                `<a href="https://ginahenderson.me/sign-up-form" target="_blank">Caffeine Club</a> is a mock sign-up form. The site uses Vanilla Javascript for client-side form validation.`,
                'Caffeine Club',
                'Sign-up Form'
            )

            const ginaTharin = content(
                'gina-tharin',
                GinaTharin,
                `<a href="https://ginatharin.com/" target="_blank">GinaTharin.com</a> is the official website for my side-project as a Singer-Songwriter. The site is built with HTML, CSS, and Vanilla Javascript. The site also incorporates the Twitter API to display tweets in real-time.`,
                'Gina Tharin',
                'Official Artist Website',
            )

            const homePage = (() => {
                const pageThumbnail = (page) => {
                    const container = document.createElement('div');
                    container.classList.add('bookmark-icon');
                    container.append(page.favicon);

                    const pageName = document.createElement('span');
                    container.append(pageName);
                    pageName.textContent = page.name;

                    container.content = page.content;
                    container.dataset.type = page.type;
                    return container;
                }

                const setPageLink = (thumbnail) => {
                    if (thumbnail.dataset.type == 'page') {
                        thumbnail.addEventListener('click', () => openPage(thumbnail.content));
                    } else if (thumbnail.dataset.type == 'link') {
                        const link = document.createElement('a');
                        link.setAttribute('href', thumbnail.content);
                        link.target = '_blank';
                        link.title = 'Opens in a new tab';
                        link.append(thumbnail);
                        return link;
                    }
                }

                const container = document.createElement('div');
                container.classList.add('home-page');

                const logo = document.createElement('header');
                container.append(logo)
                const logoText = document.createElement('span');
                logoText.textContent = 'StarryOS Browser';
                logo.append(icon('bi:moon-stars-fill', ['logo']), logoText);

                const work = document.createElement('div');
                container.append(work);
                work.classList.add('work');
                const h2 = document.createElement('h2');
                work.append(h2);
                h2.textContent = 'My Work';

                const ginaTharinIcon = new Image();
                ginaTharinIcon.src = GinaTharinIcon;
                ginaTharinIcon.classList.add('iconify');

                const pages = [
                    {
                        name: 'Diddit - To-Do App',
                        favicon: icon('mdi:checkbox-marked-outline', ['diddit']),
                        content: diddit,
                        type: 'page',
                    },
                    {
                        name: 'Rainey Ice Cream',
                        favicon: icon('fa-solid:ice-cream', ['rainey']),
                        content: raineyIceCream,
                        type: 'page',
                    },
                    {
                        name: 'Minecraft Beginner\'s Guide',
                        favicon: icon('file-icons:minecraft', ['minecraft']),
                        content: minecraft,
                        type: 'page',
                    },
                    {
                        name: 'Gina Tharin Official Artist Website',
                        favicon: ginaTharinIcon,
                        content: ginaTharin,
                        type: 'page',
                    },
                    {
                        name: 'Caffeine Club',
                        favicon: icon('fa-solid:coffee', ['caffeine']),
                        content: caffeineClub,
                        type: 'page',
                    }
                ];

                pages.forEach(page => {
                    const thumbnail = pageThumbnail(page);
                    setPageLink(thumbnail);
                    work.append(thumbnail);
                })

                const bookmarkList = [
                    {
                        name: 'GitHub',
                        favicon: icon('logos:github-icon'),
                        content: 'https://github.com/',
                        type: 'link'
                    },
                    {
                        name: 'CodePen',
                        favicon: icon('logos:codepen-icon'),
                        content: 'https://codepen.io',
                        type: 'link'
                    },
                    {
                        name: 'YouTube',
                        favicon: icon('logos:youtube-icon'),
                        content: 'https://youtube.com',
                        type: 'link'
                    },
                    {
                        name: 'Stack Overflow',
                        favicon: icon('logos:stackoverflow-icon'),
                        content: 'https://stackoverflow.com',
                        type: 'link'
                    }
                ]

                const bookmarks = document.createElement('div');
                container.append(bookmarks);
                bookmarks.classList.add('bookmarks');
                const bookmarksH2 = document.createElement('h2');
                bookmarks.append(bookmarksH2);
                bookmarksH2.textContent = 'Bookmarks';

                bookmarkList.forEach(bookmark => {
                    const thumbnail = pageThumbnail(bookmark);
                    bookmarks.append(setPageLink(thumbnail));
                })

                return {
                    content: container,
                    title: 'My Work',
                };
            })();

            return {
                homePage,
                diddit,
                raineyIceCream,
                minecraft,
                caffeineClub,
                ginaTharin,
            };
        })()

        const container = document.createElement('div');
        container.classList.add('browser');

        const header = (() => {
            const container = document.createElement('header');
            container.classList.add('browser-header');
            const lock = icon('fa6-solid:lock', ['lock']);
            const searchBar = document.createElement('div');
            searchBar.classList.add('search-bar');
            searchBar.setAttribute('contenteditable', true);
            searchBar.setAttribute('spellcheck', false);
            searchBar.textContent = 'My Work';
            searchBar.addEventListener('blur', () => searchBar.textContent = browserHistory.getCurrentPage().title);
            const refresh = icon('ic:round-refresh', ['refresh']);
            refresh.classList.add('refresh');
            container.append(lock, searchBar, refresh);

            const setSearchBarText = (text) => searchBar.textContent = text;

            return {
                container,
                setSearchBarText,
            };
        })();

        const main = document.createElement('main');

        const footer = (() => {
            const container = document.createElement('footer');
            container.classList.add('browser-footer');
            const backButton = icon('eva:arrow-back-fill', ['browser-back', 'disabled']);
            backButton.title = 'Go back';
            backButton.addEventListener('click', () => {
                browserHistory.goBackwards();
                updatePage();
                if (!browserHistory.getPast().length) {
                    return backButton.classList.add('disabled');
                }
            })
            const forwardButton = icon('eva:arrow-forward-fill', ['browser-forward', 'disabled']);
            forwardButton.title = 'Go forward';
            forwardButton.addEventListener('click', () => {
                browserHistory.goForwards();
                updatePage();
                if (!browserHistory.getFuture().length) {
                    return forwardButton.classList.add('disabled');
                }
            })
            const home = icon('fa6-solid:house-chimney', ['browser-home']);
            home.title = 'Go home';
            home.addEventListener('click', () => openPage(Pages.homePage));
            const exit = icon('radix-icons:exit', ['browser-exit']);
            exit.title = 'Exit app';
            exit.addEventListener('click', () => close());
            container.append(backButton, forwardButton, home, exit);
            return container;
        })();

        container.append(
            header.container,
            main,
            footer,
        );

        const browserHistory = History();

        const backButton = footer.querySelector('.browser-back');
        const forwardButton = footer.querySelector('.browser-forward');

        const openPage = (page) => {
            main.innerHTML = '';
            main.append(page.content);
            if (browserHistory.getCurrentPage() !== page) browserHistory.movePages(page);
            header.setSearchBarText(page.title);
            if (!browserHistory.getPast().length) {
                backButton.classList.add('disabled');
            } else {
                backButton.classList.remove('disabled');
            }
            if (!browserHistory.getFuture().length) {
                forwardButton.classList.add('disabled');
            } else {
                forwardButton.classList.remove('disabled');
            }
        };

        const updatePage = () => openPage(browserHistory.getCurrentPage());

        const modal = Modal.create(
            ['browser'],
            container,
        );

        const open = () => Modal.open(modal);
        const close = () => Modal.close(modal);

        openPage(Pages.homePage);

        return {
            open,
            close
        }
    })();

    return {
        fileExplorer,
        browser,
    };
})();

export default appWindow;