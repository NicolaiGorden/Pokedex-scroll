import './App.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css'

function App() {
  return (
    <div className="App">
      <div className="Screen">

        <div className="Img-Container">
        </div>

        <div className="List-Container">
          <Swiper
            spaceBetween={2}
            slidesPerView={7}
            onSlideChange={() => console.log('slide change')}
            onSwiper={(swiper) => console.log(swiper)}
            direction='vertical'
            mousewheel= {true}
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
