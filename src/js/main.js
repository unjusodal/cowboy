const navMenu = document.querySelector('.nav__menu')
const burgerBtn = document.querySelector('.nav__burger-menu')

burgerBtn.addEventListener('click', () => {
    navMenu.classList.toggle('nav__menu--active')
})