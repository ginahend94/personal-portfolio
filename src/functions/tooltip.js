const tooltip = (() => {
    const tooltip = document.createElement('div');
    tooltip.classList.add('tooltip');
    return { tooltip };
})();

const handleTooltip = (e, boolean,) => {
    let mouseIsOver = boolean;

    const showTooltip = () => {
        document.body.append(tooltip.tooltip);
        tooltip.tooltip.style = `top:${e.clientY + 20}px;left:${e.clientX}px`;
    };

    if (mouseIsOver) {
        showTooltip();
    }
}

export const createTooltip = (element, text) => {
    let timeout;
    const observer = new MutationObserver((mutationList) => {
        mutationList.forEach(record => {
            record.removedNodes.forEach(a => {
                if (a.classList.contains('modal-container')) {
                    clearTimeout(timeout);
                    observer.disconnect();
                }
            })
        })
    });
    observer.observe(document.body, { childList: true });
    element.addEventListener('mouseenter', () => {
        tooltip.tooltip.textContent = text;
    })
    element.addEventListener('mousemove', e => {
        if (document.body.contains(tooltip.tooltip)) document.body.removeChild(tooltip.tooltip);
        clearTimeout(timeout);
        timeout = setTimeout(() => handleTooltip(e, true), 500)
    })
    element.addEventListener('mouseleave', e => {
        if (document.body.contains(tooltip.tooltip)) document.body.removeChild(tooltip.tooltip);
        clearTimeout(timeout);
        handleTooltip(e, false);
    })
}