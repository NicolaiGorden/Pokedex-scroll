import './App.css';
import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCreative, Virtual } from 'swiper/modules';
import SwiperCore from 'swiper'
import { TbPokeball } from "react-icons/tb"
import { IoSearch } from "react-icons/io5"
import 'swiper/css'

import GeneralInfo from './components/general_info';

SwiperCore.use([EffectCreative, Virtual])

function App() {

  const [allSpecies, setAllSpecies] = useState([])

  const [query, setQuery] = useState('')
  const [queryResults, setQueryResults] =useState([])

  const [activeIndexRef, setActiveIndexRef] = useState(1)
  const [activeMonNum, setActiveMonNum] = useState(1)

  const [activeSpeciesData, setActiveSpeciesData] = useState({})
  const [activeMonData, setActiveMonData] = useState({})

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon-species/?limit=20000')
      .then(res => res.json())
      .then((data) => {
        populatePokemonList(data.results)
      })
  }, [])

  useEffect(() => {
    if (document.querySelectorAll('.active')[0]?.id) {
      setActiveMonNum(p => parseInt(document.querySelectorAll('.active')[0].id))
    }
  }, [activeIndexRef, query])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [speciesDataFetch, monDataFetch] = await Promise.all([
          fetch(`https://pokeapi.co/api/v2/pokemon-species/${activeMonNum}`),
          fetch(`https://pokeapi.co/api/v2/pokemon/${activeMonNum}`)
        ])

        const speciesData = await speciesDataFetch.json()
        const monData = await monDataFetch.json()

        setActiveSpeciesData(s => speciesData)
        setActiveMonData(m => monData)
      } catch (err) {
        console.log(err)
      }
    }

    fetchData()

  }, [activeMonNum])

  useEffect(() => {
    console.log(activeSpeciesData.varieties?.length > 1 ? "multiform" : "one form")
  }, [activeSpeciesData])

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
    //could probably be a switch case
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
      <div className="Top-Screen">

        <div className="Img-Search-Container">
          <div className='Border'>
            <div className='Img-Container'>
              <img className='Sprite' alt={allSpecies[parseInt(document.querySelectorAll('.active')[0]?.id)-1]?.name} src={activeMonData.sprites?.front_default ? activeMonData.sprites.front_default : null}></img>
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
              <SwiperSlide key={i} className={swiperStylingHandler(i)} id={`${e.dexNum}`}> 
                <i className="ball"><TbPokeball className="ball-svg" size= {40}/></i>
                <i className="slide-inner">{String(e.dexNum).padStart(4, '0')}</i>
                <i className="slide-inner">{e.name}</i>
              </SwiperSlide>)
              })}
          </Swiper>
        </div>
      </div>

      <div className='Bottom-Screen'>
        <div className='navbar'>
          this is the frickin navbar mate
        </div>
        {/* split into components for sure, just gotta pass data from current species and mon objects as props*/}

        {activeSpeciesData.flavor_text_entries ? 
          <GeneralInfo speciesData= {activeSpeciesData}/> : 
        ''}
      </div>
    </div>
  );
}

export default App;
