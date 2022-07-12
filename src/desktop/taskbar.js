import icon from "../functions/icon";
import { createTooltip } from "../functions/tooltip";

export default (() => {
    const container = document.createElement('div');
    container.classList.add('taskbar', 'container');

    const startButton = document.createElement('button');
    container.append(startButton);
    startButton.append(icon('bi-moon-stars-fill'));
    createTooltip(startButton, 'Start')

    return { container }
})()