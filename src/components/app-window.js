import { format } from "date-fns";
import icon from "../functions/icon";
import Modal from "./modal";
import GinaResume from '../files/Gina_Henderson_Resume.pdf';

const Header = (label) => {
    const header = document.createElement('header');
    header.classList.add('window-header');
    header.append(icon('eva:arrow-ios-back-fill', ['back-button']), `Gina Henderson/Files/${label.replace(label[0], label[0].toUpperCase())}`);
    const closeModal = () => Modal.close(document.querySelector('.modal-container'));
    header.querySelector('.back-button').addEventListener('click', closeModal);

    const setBackButton = (id) => {
        header.querySelector('.back-button').removeEventListener('click', closeModal);
        header.querySelector('.back-button').addEventListener('click', () => {
            Modal.close(document.querySelector(`.modal-container[data-id="${id}"]`));
        })
    }
    return { header, setBackButton }
}

const fileExplorer = (label) => {
    const container = document.createElement('div');
    container.classList.add('file-explorer', `${label}-container`);

    container.append(Header(label).header);

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
    const inner = document.createElement('div');
    const pdf = document.createElement('object');
    const header = Header('documents/Resume.pdf');
    inner.append(header.header, pdf);
    pdf.setAttribute('data', url);
    pdf.setAttribute('type', 'application/pdf');
    
    const modal = Modal.create(
        ['file-window'],
        inner
    );
    Modal.open(modal);
    header.setBackButton(modal.id())
}

export default (() => {
    const documents = (() => {
        const explorer = fileExplorer('documents');
        const container = explorer.container;
        const resume = explorer.file('Resume.pdf', 'uiw:file-pdf', '2021-11-20', '565 KB');
        const description = document.createElement('span');
        description.classList.add('files-description');
        description.textContent = '1 item, 565 KB used';
        explorer.main.append(resume, description);
        resume.addEventListener('click', () => {
            openFile(GinaResume);
        })
        return { container }
    })();

    return { documents: documents.container }
})();