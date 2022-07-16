export default function accordion() {
    const accordionBlock= document.querySelectorAll('.accordion__block')

    accordionBlock.forEach(block => {
        block.addEventListener('click', () => {
            block.classList.toggle('accordion__block--active')
        })
    })
}