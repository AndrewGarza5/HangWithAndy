import { useEffect, useState } from 'react';
import './styles/home-page.css';
import InfiniteSlider from './infinite_slider/InfiniteSlider';
import HomeMenu from './HomeMenu';
import ViewMorePanel from './ViewMorePanel.js'
import { useSpring, animated, easings } from 'react-spring';
import HangOutForm from './HangOutForm/HangOutForm';
import InvalidFormWarning from './InvalidFormWarning';

export default function HomePage() {

  const [homeMenuPanel, setHomeMenuPanel] = useState(<HomeMenu 
                                                      clickViewMore={clickViewMore} 
                                                      onCalendarDayClick={onCalendarDayClick}  
                                                    />)
  const [nextPanel, setNextPanel] = useState(<ViewMorePanel clickBackButton={clickBackButton} />)
  const [invalidFormWarning, setInvalidFormWarning] = useState(null)

  const fadeIn = useSpring({
    from: {opacity: 0, border: '0px solid white', height: '0px', paddingTop: '0', paddingBottom: '0'}, 
    to: {opacity: 1, border: '1px solid rgba(255,255,255,.75)', paddingTop: '5px', paddingBottom: '5px', height: '397px'},
    config: {duration: 2000, easing: easings.easeInOutCubic},
    delay: 1000
  })

  const transitionMenuLeftRight = useSpring({
    from: {transform: 'translateX(0px)'},
    to: {transform: 'translateX(50px)'}
  })

 
  function clickBackButton(e){
    e.target.style.backgroundColor = '#de9d06'
    setTimeout(() => {
      e.target.style.backgroundColor = '#de9d0675'
      document.getElementById('home-page-interactive-menu-transition-helper').style.transform = 'translateX(0px)'

    }, 200)
  }

  function clickViewMore() {
    setNextPanel(<ViewMorePanel clickBackButton={clickBackButton} />)
    
    setTimeout(() => {
      document.getElementById('home-page-interactive-menu-transition-helper').style.transform = 'translateX(-260px)'

    }, 100)

  }

  function onCalendarDayClick(day, dayStr) {
    setNextPanel(<HangOutForm clickBackButton={clickBackButton} dayStr={dayStr} showInvalidFormWarning={showInvalidFormWarning}/>)
    setTimeout(() => {
      document.getElementById('home-page-interactive-menu-transition-helper').style.transform = 'translateX(-260px)'

    }, 100)
  } 

  function showInvalidFormWarning(){
    
    setInvalidFormWarning(<InvalidFormWarning />)

    setTimeout(() => {
      setInvalidFormWarning(null)
    }, 5000)
  }

  return (
    <>
    {invalidFormWarning}

      <div className='home-page-layover'>
        <animated.div style={fadeIn} id='home-page-interactive-menu-container' className='home-page-interactive-menu-container'>
          <animated.div id='home-page-interactive-menu-transition-helper' className='home-page-interactive-menu-transition-helper'>
            {homeMenuPanel}
            {nextPanel}
          </animated.div>
        </animated.div>
      </div>
      <div className="home-page">
        <InfiniteSlider />
      </div>
    </>
  );
}

