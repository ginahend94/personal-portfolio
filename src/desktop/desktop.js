import taskbar from "./taskbar";
import { createTooltip } from "../functions/tooltip";
import icon from "../functions/icon";

const Apps = (() => {
    const container = document.createElement('div');
    container.classList.add('apps-container');

    const apps = [
        {
            name: 'Documents',
            appIcon: 'jam:folder-f',
            tooltip: 'Resume',
            classes: ['documents'],
        },
        {
            name: 'Browser',
            appIcon: 'wpf:globe-earth',
            tooltip: 'My work',
            classes: ['browser'],
        },
        {
            name: 'Games',
            appIcon: 'jam:folder-f',
            tooltip: 'Games',
            classes: ['games'],
        },
        {
            name: 'Recycling Bin',
            appIcon: 'wpf:full-trash',
            tooltip: 'Recycling Bin',
            classes: ['trash'],
        },
        {
            name: 'Diddit',
            appIcon: 'mdi:checkbox-marked-outline',
            tooltip: 'To-Do List app',
            classes: ['diddit'],
        },
        {
            name: 'Weather',
            appIcon: 'fluent:weather-partly-cloudy-day-48-filled',
            tooltip: 'Weather app',
            classes: ['weather'],
        },
        {
            name: 'Music',
            appIcon: 'bxs:music',
            tooltip: 'Music player app',
            classes: ['music'],
        },
        {
            name: 'News',
            appIcon: 'ion:newspaper-outline',
            tooltip: 'News app',
            classes: ['news'],
        }
    ]

    const appIcon = (name, appIcon, tooltip = name, classes = []) => {
        const container = document.createElement('div');
        container.classList.add('app-icon', ...classes);
        container.append(icon(appIcon));

        const appName = document.createElement('span');
        container.append(appName);
        appName.textContent = name;

        createTooltip(container, tooltip);

        return container;
    }

    apps.forEach(app => {
        const renderedAppIcon = appIcon(app.name, app.appIcon, app.tooltip, app.classes);
        container.append(renderedAppIcon);
    })

    return { container }
})();

export default (() => {
    const container = document.createElement('div');
    container.classList.add('desktop');

    container.append(taskbar.container);
    container.append(Apps.container);

    return { container };
})();