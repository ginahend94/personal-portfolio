import { format } from "date-fns";
import icon from "../functions/icon";
import Modal from "./modal";
// import GinaResume from '../files/Gina Henderson Resume.pdf';

const fileExplorer = (label) => {
    const container = document.createElement('div');
    container.classList.add('file-explorer', `${label}-container`);

    const header = document.createElement('header');
    container.append(header);
    header.append(icon('eva:arrow-ios-back-fill', ['back-button']), `Gina Henderson/Files/${label.replace(label[0], label[0].toUpperCase())}`);
    header.querySelector('.back-button').addEventListener('click', () => Modal.close(document.querySelector('.modal-container')));

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

const openFile = (url) => {
    const inner = document.createElement('object');
    inner.setAttribute('data', url);
    inner.setAttribute('type', 'application/pdf');
    const modal = Modal.create(
        ['file-window'],
        inner,
    );
    Modal.open(modal);
}

export default (() => {
    const documents = (() => {
        const explorer = fileExplorer('documents')
        const container = explorer.container;
        const resume = explorer.file('Resume.pdf', 'uiw:file-pdf', '2021-11-20', '565 KB');
        explorer.main.append(resume);
        resume.addEventListener('click', () => {
            openFile('https://github.com/ginahend94/personal-portfolio/blob/main/src/files/Gina_Henderson_Resume.pdf');
        })
        return { container }
    })();

    return { documents: documents.container }
})();