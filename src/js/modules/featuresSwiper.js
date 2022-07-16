import Swiper from "swiper/bundle";

function slider() {
    new Swiper('.features__swiper', {
    
        scrollbar: {
            el: '.swiper-scrollbar',
            draggable: true
        },
        
        freeMode: true,
        grabCursor: true,
    
        breakpoints: {
            600: {
                slidesPerView: 1
            },
    
            800: {
                slidesPerView: 2
            },
    
            1000: {
                slidesPerView: 3
            }
        }
        
    })
}


export default slider