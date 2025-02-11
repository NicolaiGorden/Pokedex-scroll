import './App.css';
import { Swiper, SwiperSlide } from 'swiper/react';
// import { EffectCoverflow } from 'swiper/modules';
import { EffectCreative } from 'swiper/modules';
import SwiperCore from 'swiper'
import 'swiper/css'

SwiperCore.use([EffectCreative])

function App() {
  return (
    <div className="App">
      <div className="Screen">

        <div className="Img-Container">
        </div>

        <div className="List-Container">
          <Swiper
            spaceBetween={-5}
            slidesPerView={7}
            onSlideChange={() => console.log('slide change')}
            onSwiper={(swiper) => console.log(swiper)}
            grabCursor= {true}
            centeredSlides= {true}
            direction='vertical'
            initialSlide={0}
            speed= {600}
            preventClicks= {true}
            // effect="coverflow"
            // coverflowEffect= {{
            //   rotate: 0,
            //   stretch: 0,
            //   depth: 350,
            //   modifier: 1,
            //   slideShadows: false
            // }}

            effect="creative"
            creativeEffect= {{
              next: {
                translate: [10, "100%", 0],
              },
              prev: {
                translate: [10, "-100%", 0],
              },
              limitProgress: 3,
            }}
          >
            <SwiperSlide>Slide 1</SwiperSlide>
            <SwiperSlide>Slide 2</SwiperSlide>
            <SwiperSlide>Slide 3</SwiperSlide>
            <SwiperSlide>Slide 4</SwiperSlide>
            <SwiperSlide>Slide 5</SwiperSlide>
            <SwiperSlide>Slide 6</SwiperSlide>
            <SwiperSlide>Slide 7</SwiperSlide>
            <SwiperSlide>Slide 8</SwiperSlide>
            <SwiperSlide>Slide 9</SwiperSlide>
            <SwiperSlide>Slide 10</SwiperSlide>
            <SwiperSlide>Slide 11</SwiperSlide>
            <SwiperSlide>Slide 12</SwiperSlide>
          </Swiper>
        </div>
      </div>
    </div>
  );
}

export default App;
