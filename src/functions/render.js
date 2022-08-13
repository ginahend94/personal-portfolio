import desktop from "../desktop/desktop";
import splash from "../desktop/splash";
import save from "./save";
import load from "./load";
import Chat from "../components/chat";

export default () => {
    const body = document.body;
    const loadedBefore = load('loadedBefore') ? load('loadedBefore') : false;

    if (!loadedBefore) {
        body.append(splash.container);
        save('loadedBefore', true);
        setTimeout(() => {
            body.removeChild(splash.container);
            Chat.showIntro();
        }, 4000);
    } else {
        Chat.renderHistory();
    }

    body.append(desktop.container);
}