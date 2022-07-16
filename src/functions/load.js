export default (name) => {
    if (sessionStorage.getItem(name) == null) {
        // console.log('You haven\'t created this value yet.')
        return false;
    }
    return JSON.parse(sessionStorage.getItem(name));
}