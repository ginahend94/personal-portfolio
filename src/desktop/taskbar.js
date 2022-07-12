import icon from "../functions/icon";
import { createTooltip } from "../functions/tooltip";
import format from "date-fns/format";

const Clock = (() => {

    const container = document.createElement('div');
    const time = document.createElement('span');
    const date = document.createElement('span');
    let dateTime = new Date();

    container.classList.add('clock');
    container.append(date);
    container.append(time);

    time.textContent = format(dateTime, 'P');
    date.textContent = format(dateTime, 'p');

    const showDate = () => {
        dateTime = new Date();
        time.textContent = format(dateTime, 'P');
        date.textContent = format(dateTime, 'p');
    }

    setInterval(showDate, 10);

    return { container };

})();

export default (() => {

    const container = document.createElement('div');
    container.classList.add('taskbar', 'container');

    const startButton = document.createElement('button');
    container.append(startButton);
    startButton.append(icon('bi:moon-stars-fill'));
    startButton.classList.add('start-button');
    createTooltip(startButton, 'Start');

    const appTray = document.createElement('div');
    container.append(appTray);
    appTray.classList.add('app-tray');
    

    const message = icon('jam-message-f');
    container.append(message);
    message.classList.add('messages');

    const wifi = icon('fa6-solid:wifi')
    container.append(wifi);
    wifi.classList.add('wifi');

    const volume = icon('fa6-solid:volume-high');
    container.append(volume);
    volume.classList.add('volume');

    container.append(Clock.container);

    return { container }
})()