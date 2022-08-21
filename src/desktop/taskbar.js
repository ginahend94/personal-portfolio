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
    const toggleMuted = () => isMuted = !isMuted;
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

    const volume = document.createElement('span')
    volume.append(icon('fa6-solid:volume-high', ['volume']));
    container.append(volume);
    createTooltip(volume, ['Volume: 100%']);
    volume.addEventListener('click', () => {

    })

    container.append(Clock.container);

    const audio = document.querySelectorAll('audio');
    console.log(audio)

    return { container }
})()