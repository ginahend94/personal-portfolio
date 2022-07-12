import taskbar from "./taskbar";

export default (() => {
    const container = document.createElement('div');
    container.textContent = "DESKTOP";
    container.append(taskbar.container);
    return { container };
})();