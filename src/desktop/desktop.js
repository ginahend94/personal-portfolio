import taskbar from "./taskbar";
import { createTooltip } from "../functions/tooltip";
import icon from "../functions/icon";
import Modal from "../components/modal";
import appWindow from "../components/app-window";
import { nowPlaying } from "../components/now-playing";

const Apps = (() => {
    const container = document.createElement('div');
    container.classList.add('apps-container');

    const openApp = (inner) => {
        const modal = Modal.create(
            [],
            inner,
            () => Modal.close(modal),
            'k',
            false,
            false,
            true
        )
        Modal.open(modal);
    }

    const apps = [
        {
            name: 'Documents',
            appIcon: 'jam:folder-f',
            tooltip: 'Resume',
            classes: ['documents'],
            content: appWindow.documents,
        },
        {
            name: 'Browser',
            appIcon: 'wpf:globe-earth',
            tooltip: 'My work',
            classes: ['browser'],
            content: () => console.log('web'),
        },
        {
            name: 'Games',
            appIcon: 'jam:folder-f',
            tooltip: 'Games',
            classes: ['games'],
            content: () => console.log('games'),
        },
        {
            name: 'Recycling Bin',
            appIcon: 'wpf:full-trash',
            tooltip: 'Recycling Bin',
            classes: ['trash'],
            content: () => console.log('trash'),
        },
        {
            name: 'Diddit',
            appIcon: 'mdi:checkbox-marked-outline',
            tooltip: 'To-Do List app',
            classes: ['diddit'],
            content: () => console.log('todo'),
        },
        {
            name: 'Weather',
            appIcon: 'fluent:weather-partly-cloudy-day-48-filled',
            tooltip: 'Weather app',
            classes: ['weather'],
            content: () => console.log('weather'),
        },
        {
            name: 'Music',
            appIcon: 'bxs:music',
            tooltip: 'Music player app',
            classes: ['music'],
            content: () => console.log('music'),
        },
        {
            name: 'News',
            appIcon: 'ion:newspaper-outline',
            tooltip: 'News app',
            classes: ['news'],
            content: () => console.log('news'),
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
        renderedAppIcon.addEventListener('click', () => openApp(app.content));
    })

    return { container }
})();

const isMobile = () => {
    const mediaQuery = window.matchMedia('(max-width:775px)');
    let mobile = mediaQuery.matches;
    mediaQuery.addEventListener('change', e => {
        if (e.matches) {
            console.log('Mobile');
        }
        else {
            console.log('Desktop');
        }
        mobile = e.matches;
    })
    return mobile;
}

export default (() => {
    const container = document.createElement('div');
    container.classList.add('desktop');

    container.append(taskbar.container);
    container.append(nowPlaying());
    container.append(Apps.container);

    return { container };
})();