import { dragModal } from "../functions/drag";
import generateId from "../functions/generateId";

export default (() => {
    const Modal = (classes = [], modalBody, confirmFunction = () => Modal.close(modal), confirmText = 'OK', showCancel = false, showModalBg = false, draggable = false) => {
        const id = generateId();
        const modalContainer = document.createElement('div');
        modalContainer.classList.add('modal-container');
        modalContainer.dataset.id = id;
        const modalBg = document.createElement('div');
        modalBg.classList.add('modal-bg');
        if (showModalBg) modalContainer.append(modalBg);

        const modal = document.createElement('div');
        modalContainer.append(modal);
        modal.classList.add('modal', ...classes);

        if (draggable) {
            const dragBar = document.createElement('div');
            modal.append(dragBar);
            dragBar.classList.add('drag-bar');
        }

        modal.append(modalBody);
        modalBody.classList.add('modal-inner');

        if (draggable) dragModal(modalContainer);

        const getId = () => id;

        return { modalContainer, id:getId };
    };

    const closeModal = modal => {
        if (document.body.contains(modal)) document.body.removeChild(modal);
    };
    
    const openModal = modal => {
        document.body.append(modal.modalContainer);
    };

    return { create:Modal, open:openModal, close:closeModal }
})();