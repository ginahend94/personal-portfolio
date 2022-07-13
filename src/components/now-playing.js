export const nowPlaying = () => {
    const container = document.createElement('div');
    container.classList.add('now-playing', 'container');
    container.append('NOW PLAYING....');
    
    return container
}