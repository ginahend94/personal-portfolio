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
            content: appWindow.browser,
        },
        {
            name: 'Games',
            appIcon: 'jam:folder-f',
            tooltip: 'Games',
            classes: ['games'],
            content: appWindow.games,
        },
        {
            name: 'Recycling Bin',
            appIcon: 'wpf:full-trash',
            tooltip: 'Recycling Bin',
            classes: ['trash'],
            content: appWindow.trash,
        },
        {
            name: 'Utilities',
            appIcon: 'ic:round-calculate',
            tooltip: 'To-Do List app',
            classes: ['diddit'],
            content: () => console.log('todo'),
        },
        {
            name: 'Contact',
            appIcon: 'ic:round-perm-contact-calendar',
            tooltip: 'Contact me',
            classes: ['contact'],
            content: () => console.log('contact'),
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