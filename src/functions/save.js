export default (name, data) => {
    sessionStorage.setItem(name, JSON.stringify(data));
}
