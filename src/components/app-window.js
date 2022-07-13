import Modal from "./modal";

export default ((contents) => {
    const container = document.createElement('div');
    

    return {container}
})()

const windowInner = () => {
    const container = document.createElement('div');
    container.classList.add('container', 'app-window-inner');

    container.append('Hello1!!1!');

    return container
}

export const appWindow = () => {
    const modal = Modal.create(
        [],
        windowInner(),
        () => Modal.close(modal),
        "Close",
        false,
        false,
        true
    )
   return Modal
}