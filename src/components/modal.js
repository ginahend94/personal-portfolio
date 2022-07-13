import {dragModal} from "../functions/drag";

export default (() => {
    const Modal = (classes = [], modalBody, confirmFunction, confirmText, showCancel, showModalBg, draggable) => {
        const modalContainer = document.createElement('div');
        modalContainer.classList.add('modal-container');
        const modalBg = document.createElement('div');
        modalContainer.append(modalBg);
        modalBg.classList.add('modal-bg');
        if (!showModalBg) modalBg.classList.add('hidden');

        const modal = document.createElement('div');
        modalContainer.append(modal);
        modal.classList.add('modal', ...classes);

        if (draggable) {
            const dragBar = document.createElement('div');
            modal.append(dragBar);
            dragBar.classList.add('drag-bar');
            for (let i = 0; i < 3; i++) {
                dragBar.append(document.createElement('div'));
            };
        }

        modal.append(modalBody);
        modalBody.classList.add('modal-inner');

        const buttons = document.createElement('div');
        modal.append(buttons);
        buttons.classList.add('buttons');
        const confirm = document.createElement('button');
        buttons.append(confirm);
        confirm.textContent = confirmText;
        confirm.addEventListener('click', confirmFunction);

        if (showCancel) {
            const cancel = document.createElement('button');
            buttons.append(cancel);
            cancel.classList.add('cancel');
            cancel.textContent = 'Cancel';
            cancel.addEventListener('click', closeModal.bind(cancel, modalContainer));
        }

        modalBg.addEventListener('click', closeModal.bind(modalBg, modalContainer));
        modalContainer.addEventListener('keydown', e => {
            if (e.key !== 'Enter') return;
            if (document.activeElement.type == 'textarea') return;
            e.preventDefault();
            confirmFunction();
        })

        if (draggable) dragModal(modalContainer);

        return modalContainer;
    };

    const closeModal = modal => {
        modal.classList.remove('shown');
        modal.classList.add('hidden');
        if (document.body.contains(modal)) document.body.removeChild(modal);
    };
    
    const openModal = modal => {
        document.body.append(modal);
        modal.classList.remove('hidden');
        modal.classList.add('shown');
    };

    return { create:Modal, open:openModal, close:closeModal }
})();