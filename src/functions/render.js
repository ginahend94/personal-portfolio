import desktop from "../desktop/desktop";
import splash from "../desktop/splash";
import save from "./save";
import load from "./load";

export default () => {
    const body = document.body;
    const loadedBefore = load('loadedBefore') ? load('loadedBefore') : false;

    if (!loadedBefore) {
        body.append(splash.container)
        console.log(loadedBefore);
        console.log('First time!');
        save('loadedBefore', true);
        setTimeout(() => body.removeChild(splash.container), 4000);
    }

    body.append(desktop.container);
}