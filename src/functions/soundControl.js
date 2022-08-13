import icon from "./icon";

export default (() => {
    const label = document.createElement('label');
    label.classList.add('sound-control');
    const checkbox = document.createElement('input');
    label.append(checkbox);

    checkbox.type = 'checkbox';
    checkbox.checked = 'false';
    const mute = icon('ph:speaker-simple-x-fill', ['mute']);
    const play = icon('ph:speaker-simple-high-fill', ['play', 'hidden']);

    const toggle = () => {
        mute.classList.toggle('hidden');
        play.classList.toggle('hidden');
    }

    

    return label;
})();