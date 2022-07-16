import Swiper from "swiper/bundle";

const swiper = new Swiper('.features__swiper', {
    scrollbar: {
        el: '.swiper-scrollbar',
        draggable: true,
        dragSize: 400
    },
    
    freeMode: true,
    simulateTouch: true,
    grabCursor: true,

    // mousewheel: {
    //     sensitivity: 1,
    //     eventTarget: '.swiper'
    // },

    slidesPerView: 3
    
});

export default swiper