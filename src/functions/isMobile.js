export default () => {
    const mediaQuery = window.matchMedia('(max-width:775px)');
    let mobile = mediaQuery.matches;
    mediaQuery.addEventListener('change', e => {
        if (e.matches) {
            console.log('Mobile');
        }
        else {
            console.log('Desktop');
        }
        mobile = e.matches;
    })
    return mobile;
}