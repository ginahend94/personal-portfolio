import { format } from "date-fns";
import icon from "../functions/icon";
import Modal from "./modal";
import GinaResume from '../files/Gina_Henderson_Resume.pdf';
import Diddit from '../images/diddit.png';
import Rainey from '../images/rainey.png';
import Minecraft from '../images/minecraft.png';
import GinaTharinIcon from '../images/gina-tharin-favicon.png';
import GinaTharin from '../images/ginatharin.png';
import Caffeine from '../images/caffeine.png';

const closeModal = () => Modal.close(document.querySelector('.modal-container'));
const AppHeader = (label) => {
    const header = document.createElement('header');
    header.classList.add('window-header');
    header.append(icon('eva:arrow-ios-back-fill', ['back-button']), `Gina Henderson/Files/${label.replace(label[0], label[0].toUpperCase())}`);
    header.querySelector('.back-button').addEventListener('click', closeModal);

    const setBackButton = (id) => {
        header.querySelector('.back-button').removeEventListener('click', closeModal);
        header.querySelector('.back-button').addEventListener('click', () => {
            Modal.close(document.querySelector(`.modal-container[data-id="${id}"]`));
        })
    }
    return { header, setBackButton }
}

const BrowserElements = (() => {
    const header = (() => {
        const header = document.createElement('header');
        header.classList.add('browser-header');
        const lock = icon('fa6-solid:lock', ['lock']);
        const searchBar = document.createElement('div');
        searchBar.classList.add('search-bar');
        searchBar.setAttribute('contenteditable', true);
        searchBar.setAttribute('spellcheck', false);
        searchBar.textContent = 'My Work';
        searchBar.dataset.page = 'My Work';
        searchBar.addEventListener('blur', () => searchBar.textContent = searchBar.dataset.page);
        searchBar.addEventListener('keydown', (e) => {
            if (e.key != 'Enter') return;
            e.preventDefault();
            searchBar.blur();
        })
        const refresh = icon('ic:round-refresh', ['refresh']);
        refresh.classList.add('refresh');
        header.append(lock, searchBar, refresh);

        const setSearchText = (text) => {
            searchBar.dataset.page = text;
            searchBar.textContent = searchBar.dataset.page;
        }

        return { header, setSearchText };
    })()

    const body = document.createElement('div');
    body.classList.add('browser-body');

    const footer = document.createElement('footer');
    footer.classList.add('browser-footer');
    const backButton = icon('eva:arrow-back-fill', ['browser-back']);
    const forwardButton = icon('eva:arrow-forward-fill', ['browser-forward']);
    const home = icon('fa6-solid:house-chimney', ['browser-home']);
    home.addEventListener('click', closeModal);
    const tabs = icon('fluent:tabs-24-filled', ['browser-tabs']);
    footer.append(backButton, forwardButton, home, tabs);

    return { header: header.header, body, footer, setSearchText: header.setSearchText }
})()

const fileExplorer = (() => {
    const container = (label) => {
        const container = document.createElement('div');
        container.classList.add('file-explorer', `${label}-container`);

        container.append(AppHeader(label).header);

        const main = document.createElement('main');
        container.append(main)
        return {container, main}
    }

    const file = (name, thumbnail, date, size) => {
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

        const dateLabel = document.createElement('span');
        container.append(dateLabel)
        dateLabel.classList.add('file-info');
        dateLabel.textContent = format(new Date(date), 'P');

        const sizeLabel = document.createElement('span');
        container.append(sizeLabel);
        sizeLabel.classList.add('file-info');
        sizeLabel.textContent = size;

        return container;
    }

    return { container, file }
})();

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

        return container
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

    return {
        diddit,
        raineyIceCream,
        minecraft,
        caffeineClub,
        ginaTharin,
    };
})()

export default (() => {

    const openFile = (url, type, filename) => {
        const inner = document.createElement('div');
        const file = document.createElement('object');
        const header = AppHeader(filename);
        inner.append(header.header, file);
        file.setAttribute('data', url);
        file.setAttribute('type', type);

        const modal = Modal.create(
            ['file-window'],
            inner
        );
        Modal.open(modal);
        header.setBackButton(modal.id())
    }

    const documents = (() => {
        const explorer = fileExplorer;
        const container = explorer.container('documents');
        const files = [
            {
                thumbnail: explorer.file('Resume.pdf', 'uiw:file-pdf', '2021-11-20', '565 KB'),
                url: GinaResume,
                type: 'application/pdf',
                filename: 'Resume.pdf',
            }
        ]

        files.forEach((file) => {
            file.thumbnail.addEventListener('click', () => {
                openFile(file.url, file.type, `Documents/${file.filename}`);
            })
            container.main.append(file.thumbnail);
        })
        const description = document.createElement('span');
        description.classList.add('files-description');
        description.textContent = '1 item, 565 KB used';

        container.main.append(description);

        return { container: container.container }
    })();

    const browser = (() => {
        const pageThumbnail = (page) => {
            const container = document.createElement('div');
            container.classList.add('bookmark-icon');
            container.append(page.favicon);

            const pageName = document.createElement('span');
            container.append(pageName);
            pageName.textContent = page.name;

            container.content = page.content;
            container.dataset.type = page.type;
            container.dataset.name = page.name;
            return container;
        }

        const setPageLink = (thumbnail) => {
            if (thumbnail.dataset.type == 'page') {
                thumbnail.addEventListener('click', () => openPage(thumbnail));
            } else if (thumbnail.dataset.type == 'link') {
                const link = document.createElement('a');
                link.setAttribute('href', thumbnail.content);
                link.target = '_blank';
                link.append(thumbnail);
                return link;
            }
        }

        const container = document.createElement('div');

        const header = BrowserElements.header;
        const body = BrowserElements.body;
        const footer = BrowserElements.footer;

        const homeScreen = document.createElement('div');
        body.append(homeScreen);

        const logo = document.createElement('header');
        logo.classList.add('browser-home-screen-header');
        homeScreen.append(logo);
        const logoText = document.createElement('span');
        logoText.textContent = 'StarryOS Browser';
        logo.append(icon('bi:moon-stars-fill', ['browser-logo']), logoText);

        const work = document.createElement('div');
        homeScreen.append(work);
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
                content: Pages.diddit,
                type: 'page',
            },
            {
                name: 'Rainey Ice Cream',
                favicon: icon('fa-solid:ice-cream', ['rainey']),
                content: Pages.raineyIceCream,
                type: 'page',
            },
            {
                name: 'Minecraft Beginner\'s Guide',
                favicon: icon('file-icons:minecraft', ['minecraft']),
                content: Pages.minecraft,
                type: 'page',
            },
            {
                name: 'Gina Tharin Official Artist Website',
                favicon: ginaTharinIcon,
                content: Pages.ginaTharin,
                type: 'page',
            },
            {
                name: 'Caffeine Club',
                favicon: icon('fa-solid:coffee', ['caffeine']),
                content: Pages.caffeineClub,
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
        homeScreen.append(bookmarks);
        bookmarks.classList.add('bookmarks');
        const bookmarksH2 = document.createElement('h2');
        bookmarks.append(bookmarksH2);
        bookmarksH2.textContent = 'Bookmarks';

        bookmarkList.forEach(bookmark => {
            const thumbnail = pageThumbnail(bookmark);
            bookmarks.append(setPageLink(thumbnail));
        })

        container.append(header, body, footer);

        const openPage = page => {
            if (body.contains(homeScreen)) body.removeChild(homeScreen);
            body.append(page.content);
            BrowserElements.setSearchText(page.dataset.name);
        }

        const closePage = () => {
            const content = body.querySelector('.content')
            if (content) {
                body.removeChild(content);
                body.append(homeScreen);
                BrowserElements.setSearchText('My Work');
            }
            else {
                closeModal();
            }
        }

        const backButton = footer.querySelector('.browser-back');
        backButton.addEventListener('click', () => {
            closePage();
            backButton.removeEventListener('click', closePage);
        });

        return { container }
    })();

    const games = (() => {
        const explorer = fileExplorer;
        const container = explorer.container('games');
        const games = [
            {
                name:'Zen Balloons',
                file: explorer.file(
                    'Zen Balloons',
                    'icon-park-solid:game-handle',
                    '2021-09-22', ''
                ),
                link: 'zen-balloons',
            },
            {
                name: 'Tic-Tac-Toe',
                file: explorer.file(
                    'Tic-Tac-Toe',
                    'icon-park-solid:game-handle',
                    '2022-04-17', ''
                ),
                link: 'tic-tac-toe',
            },
            {
                name:'Rock Paper Scissors',
                file: explorer.file(
                    'Rock Paper Scissors',
                    'icon-park-solid:game-handle',
                    '2022-02-23', ''
                ),
                link: 'rock-paper-scissors',
            },
        ]

        games.forEach((game) => {
            game.file.addEventListener('click', () => {
                openFile(
                    `https://ginahenderson.me/${game.link}`,
                    'text/html',
                    `Games/${game.name}`
                )
            })
            container.main.append(game.file);
        })

        const description = document.createElement('span');
        description.classList.add('files-description');
        description.textContent = '3 items';
        container.main.append(description);

        return { container:container.container }
    })();

    return { documents: documents.container, browser: browser.container, games: games.container, }
})();