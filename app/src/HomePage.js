import { useEffect, useState, useRef } from 'react';
import './styles/home-page.css';
import InfiniteSlider from './infinite_slider/InfiniteSlider';
import HomeMenu from './HomeMenu';
import ViewMorePanel from './ViewMorePanel.js'
import { useSpring, animated, easings } from 'react-spring';
import HangOutForm from './HangOutForm/HangOutForm';
import InvalidFormWarning from './InvalidFormWarning';
import HomePageShowMenuButton from './HomePageShowMenuButton'

export default function HomePage() {

  const [homeMenuPanel, setHomeMenuPanel] = useState(<HomeMenu 
                                                      hideMenuClick={hideMenuClick} 
                                                      onCalendarDayClick={onCalendarDayClick}  
                                                    />)
  const [nextPanel, setNextPanel] = useState()
  const [invalidFormWarning, setInvalidFormWarning] = useState(null)
  const [hideMenu, setHideMenu] = useState(false)
  const photoOpacity = useRef(0.5)

  const fadeIn = useSpring({
    from: {opacity: 0, border: '0px solid white', height: '0px', paddingTop: '0', paddingBottom: '0'}, 
    to: {opacity: hideMenu ? 0 : 1, border: hideMenu ? '0px solid white' : '1px solid rgba(255,255,255,.75)', paddingTop: hideMenu ? '0px' : '5px', paddingBottom: hideMenu ? '0px' : '5px', height: hideMenu ? '0px' : '332px'},
    config: {duration: 2000, easing: easings.easeInOutCubic},
    delay: hideMenu ? 50 : 1000
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

  // DEPRECATED: No longer being used
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

  function hideMenuClick(){
    setHideMenu(true)
    changePhotosOpacity(1)
  }

  function showMenuClick(){
    setHideMenu(false)
    changePhotosOpacity(.5)
  }

  function changePhotosOpacity(opacityToChangeTo){
    photoOpacity.current = opacityToChangeTo

    const infiniteSliderContainerChildren = document.getElementById('infinite-slider-container').children
    console.log(infiniteSliderContainerChildren)
    for(let i = 0; i < infiniteSliderContainerChildren.length; i++){
      console.log(i)
      const infiniteSliderPanel = infiniteSliderContainerChildren[i]

      const infiniteSliderPanelId = infiniteSliderPanel.id
      let infiniteSliderPanelIdBackwardsIndex = infiniteSliderPanel.id.length - 1

      const splitPanelIdString = (infiniteSliderPanel.id).split('-')
      const panelNumber = splitPanelIdString[4]

      // let parsingPanelNumber = true
      // let panelNumber = ''
      // while(parsingPanelNumber){
      //   if(infiniteSliderPanelId.charAt(infiniteSliderPanelIdBackwardsIndex) == '-'){
      //     parsingPanelNumber = false
      //   }
      //   else{
      //     panelNumber = panelNumber + infiniteSliderPanelId.charAt(infiniteSliderPanelIdBackwardsIndex)
      //   }
      //   infiniteSliderPanelIdBackwardsIndex = infiniteSliderPanelIdBackwardsIndex - 1
      // }
      
      console.log(panelNumber)
      const infiniteSlidingPhoto = document.getElementById('infinite-sliding-individual-panel-image-' + panelNumber)
      if(infiniteSlidingPhoto){
        console.log(infiniteSlidingPhoto, opacityToChangeTo)
        infiniteSlidingPhoto.style.opacity = opacityToChangeTo // THIS IS THE PROBLEM WITH THE OPACITY CHANGING TEXT
      }
    }
  }

  return (
    <>
    {invalidFormWarning}
      <div className='home-page-layover'>
        {hideMenu ? <HomePageShowMenuButton showMenuClick={showMenuClick}/> : null}

        <animated.div style={fadeIn} id='home-page-interactive-menu-container' className='home-page-interactive-menu-container'>
          <animated.div id='home-page-interactive-menu-transition-helper' className='home-page-interactive-menu-transition-helper'>
            {homeMenuPanel}
            {nextPanel}
          </animated.div>
        </animated.div>
      </div>
      <div className="home-page">
        <InfiniteSlider photoOpacity={photoOpacity} />
      </div>
    </>
  );
}

