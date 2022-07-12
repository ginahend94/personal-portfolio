import taskbar from "./taskbar";
import appIcon from "../components/app-icon";

export default (() => {
    const container = document.createElement('div');
    
    container.append(taskbar.container);

    container.append(appIcon('Browser', 'wpf:globe-earth', 'My work', ['browser']));

    container.append(appIcon('Games', 'jam:folder-f', 'Games', ['games']));

    container.append(appIcon('Documents', 'jam:folder-f', 'Resume', ['documents']));

    

    return { container };
})();