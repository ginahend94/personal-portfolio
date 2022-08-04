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

const History = (() => {
    const history = [];
    const future = [];
    const back = () => future.push(history.pop());
    const forward = () => history.push(future.pop());
    const movePages = (content) => history.push(content);
})();

const File = (name, thumbnail, date, size) => {
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


const appWindow = (() => {

    const fileExplorer = (() => {
        const container = document.createElement('div');
        container.classList.add('file-explorer');

        const header = (() => {
            const header = document.createElement('header');
            const backButton = icon(
                'charm:chevron-left',
                ['back-button'],
            );
            const span = document.createElement('span');

            backButton.addEventListener('click', () => {
                if (span.textContent == 'Gina Henderson/Files') close();
                else resetMainContent();
            });
            span.textContent = 'Gina Henderson/Files';

            header.append(
                backButton,
                span,
            );

            const setText = (text) => span.textContent = `Gina Henderson/Files/${text}`;
            const resetText = () => span.textContent = 'Gina Henderson/Files';

            return {
                header,
                setText,
                resetText,
            }
        })();
        const main = (() => {
            const main = document.createElement('main');
            return main;
        })();

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
            ]

            files.forEach((file) => {
                file.thumbnail.addEventListener('click', () => {
                    openFile(
                        file.url,
                        file.type,
                        `Documents/${file.filename}`,
                    );
                })
                container.append(file.thumbnail);
            })

            const description = document.createElement('span');
            description.classList.add('files-description');
            description.textContent = '1 item, 565 KB used';

            container.append(description);

            return container
        })();

        container.append(
            header.header,
            main,
        )

        const setMainContent = (content) => {
            container.removeChild(main);
            container.append(content.inner);
            header.setText(content.title);
        }

        const resetMainContent = () => {
            container.innerHTML = '';
            container.append(
                header.header,
                main,
            );
            header.resetText();
        }

        const modal = Modal.create(
            ['file-explorer'],
            container,
        );

        const open = () => Modal.open(modal);
        const close = () => Modal.close(modal);

        return {
            container,
            resetMainContent,
            setMainContent,
            open,
            close,
            documents,
        }
    })();

    return {
        fileExplorer,
    };
})();

export default appWindow;