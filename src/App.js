import './App.css';
import 'keen-slider/keen-slider.min.css'
import { useKeenSlider } from 'keen-slider/react'

function App() {

  const [sliderRef, instanceRef] = useKeenSlider(
    {
      slideChanged() {
        console.log('slide changed')
      },
    },
  )
  return (
    <div className="App">
      <div className="Screen">

        <div className="Img-Container">
        </div>

        <div className="List-Container">
          <div ref={sliderRef} className="keen-slider">
            <div className="keen-slider__slide">1</div>
            <div className="keen-slider__slide">2</div>
            <div className="keen-slider__slide">3</div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default App;
