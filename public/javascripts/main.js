// javascripts/main.js
document.addEventListener('DOMContentLoaded', function() {
    const menuButton = document.getElementById('menu-button');
    const menu = document.getElementById('menu');

    menuButton.addEventListener('click', function() {
        if (menu.style.right === '0px') {
            menu.style.right = '-100%';
        } else {
            menu.style.right = '0px';
        }
    });
});
