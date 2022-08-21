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

export const mute = (() => {
    let muted = false;
    const toggleMuted = () => muted = !muted;
    const isMuted = () => muted;

    return {
        isMuted,
        toggleMuted
    }
})()

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

    const message = document.createElement('span');
    message.append(icon('jam-message-f', ['messages']));
    container.append(message);
    createTooltip(message, 'In a conversation with Gina Henderson');

    const wifi = document.createElement('span');
    wifi.append(icon('fa6-solid:wifi', ['wifi']));
    container.append(wifi);
    createTooltip(wifi, 'Wi-Fi connected');

    const volume = document.createElement('span');
    createTooltip(volume, 'Volume: 100%');
    const volIcon = icon('fa6-solid:volume-high', ['volume']);
    const volMuted = icon('fa6-solid:volume-xmark', ['volume', 'muted']);
    volume.append(volIcon);
    container.append(volume);
    volume.addEventListener('click', () => {
        mute.toggleMuted();
        volume.innerHTML = '';
        if (mute.isMuted()) {
            createTooltip(volume, 'Volume: 0%');
            return volume.append(volMuted);
        }
        createTooltip(volume, 'Volume: 100%');
        return volume.append(volIcon);
    })

    container.append(Clock.container);

    return { container }
})()