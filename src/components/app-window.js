import { format, min } from "date-fns";
import icon from "../functions/icon";
import Modal from "./modal";
import GinaResume from '../files/Gina_Henderson_Resume.pdf';
import Diddit from '../images/diddit.png';
import Rainey from '../images/rainey.png';
import Minecraft from '../images/minecraft.png';
import GinaTharinIcon from '../images/gina-tharin-favicon.png';
import GinaTharin from '../images/ginatharin.png';

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
    const header = document.createElement('header');
    header.classList.add('browser-header');
    const lock = icon('fa6-solid:lock', ['lock']);
    const searchBar = document.createElement('div');
    searchBar.classList.add('search-bar');
    searchBar.setAttribute('contenteditable', true);
    searchBar.setAttribute('spellcheck', false);
    searchBar.textContent = 'My Work';
    searchBar.addEventListener('blur', () => searchBar.textContent = 'My Work');
    const refresh = icon('ic:round-refresh', ['refresh']);
    refresh.classList.add('refresh');
    header.append(lock, searchBar, refresh);

    const footer = document.createElement('footer');
    footer.classList.add('browser-footer');
    const backButton = icon('eva:arrow-back-fill', ['browser-back']);
    const forwardButton = icon('eva:arrow-forward-fill', ['browser-forward']);
    const home = icon('fa6-solid:house-chimney', ['browser-home']);
    home.addEventListener('click', closeModal);
    const tabs = icon('fluent:tabs-24-filled', ['browser-tabs']);
    footer.append(backButton, forwardButton, home, tabs);

    return { header, footer }
})()

const fileExplorer = (label) => {
    const container = document.createElement('div');
    container.classList.add('file-explorer', `${label}-container`);

    container.append(AppHeader(label).header);

    const main = document.createElement('main');
    container.append(main)

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

    return { container, main, file }
}

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

    const diddit = content(
        'diddit',
        Diddit,
        `<a href="https://ginahend94.github.io/to-do-list" target="_blank">Diddit</a> is a CRUD to-do list app that utilizes local storage to maintain the user's unput. It also features UI customization features.`,
        'Diddit',
        'To-Do List Web App'
    );

    const raineyIceCream = content(
        'rainey',
        Rainey,
        `<a href="https://ginahend94.github.io/rainey-ice-cream" target="_blank">Rainey Ice Cream</a> is a single-page mock website for the fictional restaurant Rainey Ice Cream. The site is built with HTML, CSS, and Vanilla Javascript utilizing Webpack. The site also has a custom Locations tab that uses the Mapbox API and GeoJSON to create fake worldwide locations for the restaurant.`,
        'Rainey Ice Cream',
        'Restaurant Website'
    )

    const minecraft = content(
        'minecraft',
        Minecraft,
        `<a href="https://ginahend94.github.io/minecraft-guide" target = "_blank">Gina's Unofficial Minecraft Beginner's Guide</a> is a responsive website to teach novice Minecraft players how to beat the game. Vanilla CSS was used to style the page.`,
        'Gina\'s Unofficial Minecraft Guide',
        'Instructional Website'
    )
    // const crunchyCookieCo = (() => {
    //     const container = document.createElement('div');
    //     container.textContent = 'Crunchy'
    //     container.classList.add('content')
    //     return container
    // })()
    const caffeineClub = (() => {
        const container = document.createElement('div');
        container.textContent = 'Caffeine Club'
        container.classList.add('content');
        return container
    })()
    const ginaTharin = content(
        'gina-tharin',
        GinaTharin,
        `<a href="https://ginatharin.com/" target="_blank">GinaTharin.com</a> is the official website for my side-project as a Singer-Songwriter. The site is built with HTML, CSS, and Vanilla Javascript. The site also incorporates the Twitter API to display tweets in real-time.`,
        'Gina Tharin',
        'Official Artist Website',
    )

    return { diddit, raineyIceCream, minecraft, caffeineClub, ginaTharin };
})()

export default (() => {

    const openFile = (url, type, filename) => {
        const inner = document.createElement('div');
        const file = document.createElement('object');
        const header = AppHeader(`documents/${filename}`);
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
        const explorer = fileExplorer('documents');
        const container = explorer.container;
        const resume = explorer.file('Resume.pdf', 'uiw:file-pdf', '2021-11-20', '565 KB');
        const description = document.createElement('span');
        description.classList.add('files-description');
        description.textContent = '1 item, 565 KB used';
        explorer.main.append(resume, description);
        resume.addEventListener('click', () => {
            openFile(GinaResume, 'application/pdf', 'Resume.pdf');
        })
        return { container }
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
            return container;
        }

        const setPageLink = (thumbnail) => {
            if (thumbnail.dataset.type == 'page') {
                thumbnail.addEventListener('click', () => openPage(thumbnail.content));
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
        const footer = BrowserElements.footer;

        const body = document.createElement('div');
        body.classList.add('browser-body');

        const logo = document.createElement('header');
        body.append(logo)
        const logoText = document.createElement('span');
        logoText.textContent = 'StarryOS Browser';
        logo.append(icon('bi:moon-stars-fill', ['browser-logo']), logoText);

        const work = document.createElement('div');
        body.append(work);
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
            // {
            //     name: 'Crunchy Cookie Co.',
            //     favicon: icon('la:cookie-bite', ['cookie']),
            //     content: Pages.crunchyCookieCo,
            //     type: 'page',
            // },
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
        body.append(bookmarks);
        bookmarks.classList.add('bookmarks');
        const bookmarksH2 = document.createElement('h2');
        bookmarks.append(bookmarksH2);
        bookmarksH2.textContent = 'Bookmarks';

        bookmarkList.forEach(bookmark => {
            const thumbnail = pageThumbnail(bookmark);
            bookmarks.append(setPageLink(thumbnail));
        })

        container.append(header, body, footer);

        const openPage = content => {
            if (body.contains(logo)) body.removeChild(logo);
            if (body.contains(work)) body.removeChild(work);
            if (body.contains(bookmarks)) body.removeChild(bookmarks)
            body.append(content);
        }

        const closePage = () => {
            const content = body.querySelector('.content')
            if (content) {
                body.removeChild(content);
                body.append(logo, work, bookmarks);
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

    return { documents: documents.container, browser: browser.container }
})();