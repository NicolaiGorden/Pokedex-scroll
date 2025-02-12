import './App.css';
import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCreative, Virtual } from 'swiper/modules';
import SwiperCore from 'swiper'
import { TbPokeball } from "react-icons/tb"
import { IoSearch } from "react-icons/io5"
import 'swiper/css'

SwiperCore.use([EffectCreative, Virtual])

function App() {

  const [allSpecies, setAllSpecies] = useState([])
  const [imgURL, setImgUrl] = useState([])

  const [query, setQuery] = useState('')
  const [queryResults, setQueryResults] =useState([])

  const [activeIndexRef, setActiveIndexRef] = useState(1)
  const [activeMonNum, setActiveMonNum] = useState(1)


  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon-species/?limit=20000')
      .then(res => res.json())
      .then((data) => {
        populatePokemonList(data.results)
      })
  }, [])

  useEffect(() => {
    if (document.querySelectorAll('.active')[0]?.id) {
      setActiveMonNum(document.querySelectorAll('.active')[0].id)
    }
  }, [activeIndexRef, query])

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${activeMonNum}`)
      .then(res => res.json())
      .then((data) => {
        setImgUrl(data.sprites.front_default)
    })
  }, [activeMonNum])

  function populatePokemonList(arr) {
    let speciesArray = arr.map((e, i) => {
      return {
        name: e.name,
        dexNum: i+1,
      }
    })
    setAllSpecies(s => [...speciesArray])
    setQueryResults(s => [...speciesArray])
  }

  function handleQuery(e) {
    e.preventDefault();
    setQuery(q => e.target.value)
    let arr = allSpecies.filter((obj) => obj.name.toUpperCase().includes(e.target.value.toUpperCase()))
    setQueryResults(arr)
  }

  function swiperStylingHandler(i) {
    if (i + 1 === activeIndexRef) {
      return 'active'
    } else if (i === activeIndexRef || i + 2 === activeIndexRef) {
      return 'first-from-active'
    } else if (i - 1 === activeIndexRef  || i + 3 === activeIndexRef){
      return 'second-from-active'
    } else if (i - 2 === activeIndexRef  || i + 4 === activeIndexRef){
      return 'third-from-active'
    } else if (i - 3 === activeIndexRef  || i + 5 === activeIndexRef){
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
          <div className="Searchbar-Wrapper">
            <IoSearch size= {30} className='Search-svg'/>
            <input onChange={handleQuery} value={query} className="Searchbar" type="text"></input>
          </div>
        </div>

        <div className="List-Container">
          <Swiper
            spaceBetween={2}
            slidesPerView={7}
            onSlideChange={index => {
              setActiveIndexRef(index.activeIndex + 1)
            }}
            onSwiper={(swiper) => console.log('')}
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
            {queryResults.map((e, i) => {
              return (
              <SwiperSlide className={swiperStylingHandler(i)} id={`${e.dexNum}`}> 
                <a className="ball"><TbPokeball className="ball-svg" size= {40}/></a>
                <a className="slide-inner">{String(e.dexNum).padStart(4, '0')}</a>
                <a className="slide-inner">{e.name}</a>
              </SwiperSlide>)
              })}
          </Swiper>
        </div>
      </div>
    </div>
  );
}

export default App;
