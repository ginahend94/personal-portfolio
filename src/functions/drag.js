import save from "./save";

export default (page) => {
    const draggables = page.querySelectorAll('.drag-element');
    const containers = page.querySelectorAll('.drag-container');
    const icons = page.querySelectorAll('.drag');

    icons.forEach(icon => {
        icon.addEventListener('mousedown', () => {
            icon.parentNode.setAttribute('draggable', true);
        });
        icon.addEventListener('mouseup', () => {
            icon.parentNode.setAttribute('draggable', false);
        });
        icon.addEventListener('dragend', () => {
            icon.parentNode.setAttribute('draggable', false)
        })
    })

    draggables.forEach(a => {
        a.addEventListener('dragstart', () => {
            a.classList.add('dragging');
            if (a.classList.contains('subtask')) {
                setTimeout(() => {
                    a.parentNode.parentNode.classList.remove('dragging');
                }, 1);
            }
        });
        a.addEventListener('dragend', () => {
            a.classList.remove('dragging');
            a.setAttribute('draggable', false);
        })
    })

    containers.forEach(a => {
        a.addEventListener('dragover', e => {
            e.preventDefault();
            const afterElement = getDragAfterElement(a, e.clientY);
            const draggable = page.querySelector('.dragging');
            if (draggable.classList.contains('subtask')) {
                let container = page.querySelector(`[id='${draggable.dataset.container}']`)
                    .querySelector('.subtasks');
                if (afterElement == null) {
                    container.append(draggable);
                } else {
                    container.insertBefore(draggable, afterElement);
                }
                return
            }
            if (afterElement == null) {
                if (a == draggable) return;
                a.append(draggable);
            } else {
                a.insertBefore(draggable, afterElement);
            }
        })
    })

    function getDragAfterElement(container, y) {
        const draggableElements = [...container.querySelectorAll(`.drag-element:not(.dragging)`)]
            .filter(a => a.dataset.container == page.querySelector('.dragging').dataset.container);
        return draggableElements.reduce((closest, child) => {
            const box = child.getBoundingClientRect();
            const offset = y - box.top - box.height / 2;
            if (offset < 0 && offset > closest.offset) {
                return { offset: offset, element: child }
            } else {
                return closest;
            }
        }, { offset: Number.NEGATIVE_INFINITY }).element
    }
};

export const dragModal = (modalContainer) => {
    const dragElements = modalContainer.querySelectorAll('.modal');
        dragElements.forEach(element => dragElement(element));

        function dragElement(modal) {
            var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
            modal.querySelector('.drag-bar').onmousedown = dragMouseDown;

            function dragMouseDown(e) {
                e = e || window.event;
                e.preventDefault();
                // get the mouse cursor position at startup:
                pos3 = e.clientX;
                pos4 = e.clientY;
                modalContainer.onmouseup = closeDragElement;
                // call a function whenever the cursor moves:
                modalContainer.onmousemove = elementDrag;
            }

            function elementDrag(e) {
                e = e || window.event;
                e.preventDefault();
                // calculate the new cursor position:
                pos1 = pos3 - e.clientX;
                pos2 = pos4 - e.clientY;
                pos3 = e.clientX;
                pos4 = e.clientY;

                // set the element's new position:
                modal.style.top = (() => {
                // prevent dragging outside window
                    if (modal.offsetTop - pos2 < 0) {
                        return '0';
                    }
                    if ((modal.offsetTop - pos2) >= window.innerHeight - modal.offsetHeight / 2) {
                        return (window.innerHeight - modal.offsetHeight / 2) + 'px';
                    }
                    return (modal.offsetTop - pos2) + "px";
                })();
                modal.style.left = (() => {
                    if (modal.offsetLeft - pos1 < 0) {
                        return 0;
                    }
                    if ((modal.offsetLeft + modal.offsetWidth) - pos1 > window.innerWidth) {
                        return window.innerWidth - modal.offsetWidth + 'px';
                    }
                    return (modal.offsetLeft - pos1) + "px"
                })();
            }

            function closeDragElement() {
                /* stop moving when mouse button is released:*/
                modalContainer.onmouseup = null;
                modalContainer.onmousemove = null;
            }
        }
} 

export const resize = (section, direction) => {
    const resizeBar = section.querySelector('.resize-bar');
    let mousePosition;
    let xOrY = direction == 'width' ? 'X' : 'Y';
    let dragging = false;

    resizeBar.addEventListener('mousedown', e => {
        mousePosition = section.getBoundingClientRect()[direction] + resizeBar.getBoundingClientRect()[direction] / 2;
        if (direction == 'height') mousePosition = window.innerHeight - mousePosition;
        dragging = true;
        resizeBar.classList.add('visible');
        document.body.style.userSelect = 'none';
        document.body.style.cursor = `${direction == 'width' ? 'col' : 'row'}-resize`;
    })
    
    document.body.addEventListener('mousemove', e => {
        mousePosition = e[`client${xOrY}`];
        if (direction == 'height') mousePosition = window.innerHeight - mousePosition;
        if (!dragging) return;
        section.style[direction] = mousePosition + 'px';
        if (direction == 'width') save('navWidth', section.style[direction]);
        if (direction == 'height') save('notesHeight', section.style[direction]);
    })

    document.body.addEventListener('mouseup', e => {
        document.body.style.cursor = 'auto';
        dragging = false;
        resizeBar.classList.remove('visible');
        document.body.style.userSelect = 'auto';
    })
}