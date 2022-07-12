import "iconify-icon";

export default (iconName, classes = []) => {
    if (!iconName) return false;
    const icon = document.createElement('iconify-icon');
    icon.classList.add('iconify');
    icon.classList.add(...classes);
    icon.setAttribute('icon', iconName);
    return icon;
}