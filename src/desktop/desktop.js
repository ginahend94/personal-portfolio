import taskbar from "./taskbar";
import { createTooltip } from "../functions/tooltip";
import icon from "../functions/icon";
import appWindow from "../components/app-window";
import Chat from "../components/chat";
import soundControl from "../functions/soundControl";
import { dragWindow } from "../functions/drag";

const fileExplorer = appWindow.fileExplorer;
const browser = appWindow.browser;
const contact = appWindow.contact;

const Apps = (() => {
    const container = document.createElement('div');
    container.classList.add('apps-container');

    const openApp = (app) => {
        app.window.open();
        if (app.window == fileExplorer) {
            app.window.setMainContent(app.inner);
        }
    }

    const apps = [
        {
            name: 'Resume',
            // appIcon: 'jam:folder-f',
            appIcon: 'ic:twotone-folder',
            tooltip: 'Resume',
            classes: ['documents'],
            title: 'Documents',
            window: fileExplorer,
            inner: fileExplorer.documents,
        },
        {
            name: 'Websites',
            appIcon: 'wpf:globe-earth',
            tooltip: 'My work',
            classes: ['browser'],
            title: 'Browser',
            window: browser,
            inner: null,
        },
        {
            name: 'Web Apps',
            appIcon: 'ic:round-calculate',
            tooltip: 'Utilities',
            classes: ['utilities'],
            title: 'Utilities',
            window: fileExplorer,
            inner: fileExplorer.webApps,
        },
        {
            name: 'Games',
            // appIcon: 'jam:folder-f',
            appIcon: 'ic:twotone-folder',
            tooltip: 'Games',
            classes: ['games'],
            title: 'Games',
            window: fileExplorer,
            inner: fileExplorer.games,
        },
        {
            name: 'Contact',
            appIcon: 'ic:round-perm-contact-calendar',
            tooltip: 'Contact me',
            classes: ['contact'],
            title: 'Contact Me',
            window: contact,
            inner: null,
        },
        // {
        //     name: 'Recycling Bin',
        //     appIcon: 'wpf:full-trash',
        //     tooltip: 'Recycling Bin',
        //     classes: ['trash'],
        //     title: 'Recycling Bin',
        //     window: fileExplorer,
        //     inner: fileExplorer.trash,
        // },
    ]

    const appIcon = (name, appIcon, tooltip = name, classes = []) => {
        const container = document.createElement('div');
        container.classList.add('app-icon', ...classes);
        container.append(icon(appIcon));

        const appName = document.createElement('span');
        container.append(appName);
        appName.textContent = name;

        //createTooltip(container, tooltip);

        return container;
    }

    apps.forEach(app => {
        const renderedAppIcon = appIcon(
            app.name,
            app.appIcon,
            app.tooltip,
            app.classes
        );
        container.append(renderedAppIcon);
        renderedAppIcon.addEventListener('click', () => {
            openApp(app);
        });
    })

    return { container }
})();

export default (() => {
    const container = document.createElement('div');
    container.classList.add('desktop');

    //container.append(soundControl);
    container.append(taskbar.container);
    container.append(Chat.container);
    container.append(Apps.container);

    //dragWindow(container)

    return { container };
})();