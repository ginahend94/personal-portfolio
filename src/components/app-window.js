import { format, min } from "date-fns";
import icon from "../functions/icon";
import Modal from "./modal";
import GinaResume from '../files/Gina_Henderson_Resume.pdf';

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
    const diddit = document.createElement('div');
    diddit.textContent = 'Diddit!'
    diddit.classList.add('content')
    const raineyIceCream = document.createElement('div');
    raineyIceCream.classList.add('content')
    raineyIceCream.textContent = 'Rainey Ice Cream';
    const minecraft = document.createElement('div');
    minecraft.textContent = 'Minecraft Guide'
    minecraft.classList.add('content')
    const crunchyCookieCo = document.createElement('div');
    crunchyCookieCo.textContent = 'Crunchy'
    crunchyCookieCo.classList.add('content')
    const caffeineClub = document.createElement('div');
    caffeineClub.textContent = 'Caffeine Club'
    caffeineClub.classList.add('content')
    return { diddit, raineyIceCream, minecraft, crunchyCookieCo, caffeineClub };
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
            console.log(container.content)
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
                name: 'Crunchy Cookie Co.',
                favicon: icon('la:cookie-bite', ['cookie']),
                content: Pages.crunchyCookieCo,
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
                name: 'Codepen',
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