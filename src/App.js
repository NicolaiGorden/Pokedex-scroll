import './App.css';
import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCreative, Virtual } from 'swiper/modules';
import SwiperCore from 'swiper'
import 'swiper/css'

SwiperCore.use([EffectCreative, Virtual])

function App() {

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon-species/?limit=20000')
      .then(res => res.json())
      .then((data) => {
        populatePokemonList(data.results)
      })
  }, [])

  const [allSpecies, setAllSpecies] = useState([])

  function populatePokemonList(arr) {
    let speciesArray = arr.map(e => (e.name))
    setAllSpecies(s => [...speciesArray])
    console.log(allSpecies)
  }

  return (
    <div className="App">
      <div className="Screen">

        <div className="Img-Container">
        </div>

        <div className="List-Container">
          <Swiper
            spaceBetween={-5}
            slidesPerView={7}
            onSlideChange={index => { console.log(allSpecies[index.snapIndex])}}
            onSwiper={(swiper) => console.log(swiper)}
            grabCursor= {true}
            centeredSlides= {true}
            direction='vertical'
            initialSlide={0}
            speed= {2}
            preventClicks= {true}
            virtual
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
            {allSpecies.map((e) => <SwiperSlide>{e}</SwiperSlide>)}
          </Swiper>
        </div>
      </div>
    </div>
  );
}

export default App;
