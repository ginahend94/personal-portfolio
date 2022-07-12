import icon from "../functions/icon";

export default (() => {
    const container = document.createElement('div');
    const logo = document.createElement('div');
    const star1 = icon('fluent-star-12-filled');
    const star2 = icon('fluent-star-12-filled');
    const star3 = icon('fluent-star-12-filled');


    container.classList.add('splash');

    container.append(logo);
    logo.classList.add('logo');
    logo.textContent = 'StarryOS';

    logo.append(star1, star2, star3);
    

    return { container };
})()