import {useState, useEffect} from 'react';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import { sliderData } from './slider-data';
import "../slider/slider.scss";
const Slider = () => {

  const [currentSlide, setCurrentSlide] = useState(0);
  const slideLength = sliderData.length;
//  slideLength =1 2 3
// current slide = 0 1 2 
const autoScroll = true;

let slideInterval;
let intervalTime =6000;
const nextSlide = () => {
  clearInterval(slideInterval.current);
  setCurrentSlide((prevSlide) => (prevSlide === slideLength - 1 ? 0 : prevSlide + 1));
};

const prevSlide = () => {
  clearInterval(slideInterval.current);
  setCurrentSlide((prevSlide) => (prevSlide === 0 ? slideLength - 1 : prevSlide - 1));
};

  useEffect(( ) => {
    setCurrentSlide(0)
  },[]);
  useEffect(() => {
    if (autoScroll) {
      auto();
    }
    return () => {
      clearInterval(slideInterval.current);
    };
  }, [currentSlide]);
  
  function auto(){
    slideInterval = setInterval(nextSlide,intervalTime);
  }
  return (
    <div className='slider'>
        <AiOutlineArrowLeft className="arrow prev" onClick={prevSlide}/>
        <AiOutlineArrowRight className="arrow next" onClick={nextSlide}/>
        

        {sliderData.map((slide, index) =>{
            return (
                <div className= {index === currentSlide ?
                "slide current" : "slide"} key={index}>
                    {index === currentSlide && (
                        <div>
                        <img src={slide.image} alt="slide" />

                        <div className='content'>
                            <h2>{slide.heading}</h2>
                            <p>{slide.desc}</p>
                            <hr />
                            <button className='--btn --btn-primary'>get Started</button>

                            </div>
                         </div>
                    )}
                    </div>
            )
        })}
    </div>
  )
}

export default Slider;
