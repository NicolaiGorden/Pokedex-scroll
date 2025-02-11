import './App.css';
import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCreative, Virtual } from 'swiper/modules';
import SwiperCore from 'swiper'
import { TbPokeball } from "react-icons/tb"
import 'swiper/css'

SwiperCore.use([EffectCreative, Virtual])

function App() {

  const [allSpecies, setAllSpecies] = useState([])
  const [activeMon, setActiveMon] = useState(1)
  const [imgURL, setImgUrl] = useState([])

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon-species/?limit=20000')
      .then(res => res.json())
      .then((data) => {
        populatePokemonList(data.results)
      })
  }, [])

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${activeMon}`)
      .then(res => res.json())
      .then((data) => {
        setImgUrl(data.sprites.front_default)
      })
  }, [activeMon])

  function populatePokemonList(arr) {
    let speciesArray = arr.map(e => (e.name))
    setAllSpecies(s => [...speciesArray])
    console.log(allSpecies)
  }

  function swiperStylingHandler(i) {
    if (i + 1 === activeMon) {
      return 'active'
    } else if (i === activeMon || i + 2 === activeMon) {
      return 'first-from-active'
    } else if (i - 1 === activeMon  || i + 3 === activeMon){
      return 'second-from-active'
    } else if (i - 2 === activeMon  || i + 4 === activeMon){
      return 'third-from-active'
    } else if (i - 3 === activeMon  || i + 5 === activeMon){
      return 'fourth-from-active'
    } else {
      return 'hidden'
    }
  }

  return (
    <div className="App">
      <div className="Screen">

        <div className="Img-Search-Container">
          <div className='Border'>
            <div className='Img-Container'>
              <img className='Sprite' src={imgURL}></img>
            </div>
          </div>
          <input className="Searchbar" type="text" placeholder="Search.."></input>
        </div>

        <div className="List-Container">
          <Swiper
            spaceBetween={0}
            slidesPerView={7}
            onSlideChange={index => { 
              setActiveMon(index.activeIndex + 1)
            }}
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
            {allSpecies.map((e, i) => {
              return (
              // <SwiperSlide className={ i + 1 === activeMon ? 'active' : ''}> 
              <SwiperSlide className={swiperStylingHandler(i)}> 
                <a className="ball"><TbPokeball size= {40}/></a>
                <a className="slide-inner">{String(i+1).padStart(4, '0')}</a>
                <a className="slide-inner">{e}</a>
              </SwiperSlide>)
              })}
          </Swiper>
        </div>
      </div>
    </div>
  );
}

export default App;
