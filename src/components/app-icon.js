import icon from "../functions/icon";
import { createTooltip } from "../functions/tooltip";

export default (name, appIcon, tooltip = name, classes = []) => {
    const container = document.createElement('div');
    container.classList.add('app-icon',...classes);
    container.append(icon(appIcon));

    const appName = document.createElement('span');
    container.append(appName);
    appName.textContent = name;

    createTooltip(container, tooltip);

    return container;
}