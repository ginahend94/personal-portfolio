import { dragWindow } from "../functions/drag";
import icon from "../functions/icon";
import generateId from "../functions/generateId";
import isMobile from "../functions/isMobile";

export default (() => {
    const Modal = (classes = [], modalBody, appName, confirmText = 'OK', confirmFunction = () => Modal.close(modal), showCancel = false, showModalBg = false, draggable = false) => {
        const id = generateId();
        const modalContainer = document.createElement('div');
        modalContainer.classList.add('modal-container');
        modalContainer.dataset.id = id;
        const modalBg = document.createElement('div');
        modalBg.classList.add('modal-bg');
        if (showModalBg) modalContainer.append(modalBg);

        const modal = document.createElement('div');
        modalContainer.append(modal);
        modal.classList.add('modal', 'window', ...classes);

        const dragBar = document.createElement('div');
        const maximize = icon('fluent:maximize-16-regular', ['maximize']);
        const minimize = icon('fluent:subtract-16-regular', ['minimize']);
        const close = icon('fluent:dismiss-16-regular', ['close']);
        const title = document.createElement('span');
        title.textContent = appName;
        dragBar.append(title, close);

        // const toggleMaximize = () => {
        //     if (modal.classList.contains('minimized')) modal.classList.remove('minimized');
        //     modal.classList.toggle('maximized');
        //     console.log(modal.classList);
        // }
        // const toggleMinimize = () => {
        //     if (modal.classList.contains('maximized')) modal.classList.remove('maximized');
        //     modal.classList.toggle('minimized');
        //     console.log(modal.classList)
        // }

        close.addEventListener('click', () => closeModal(document.querySelector(`[data-id="${id}"]`)));

        modal.append(dragBar);
        dragBar.classList.add('drag-bar');

        modal.append(modalBody);
        modalBody.classList.add('modal-inner');

        const getId = () => id;

        return { modalContainer, id: getId };
    };

    const closeModal = modal => {
        console.log('closing')
        if (document.body.contains(modal.modalContainer)) document.body.removeChild(modal.modalContainer);
        else if (document.body.contains(modal)) document.body.removeChild(modal);
    };

    const openModal = modal => {
        document.body.append(modal.modalContainer);
    };

    return { create: Modal, open: openModal, close: closeModal }
})();