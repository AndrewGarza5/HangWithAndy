import { useEffect } from 'react';
import { useSpring, animated, easings } from 'react-spring';
import './styles/home-page-show-menu-button.css';
import Calendar from './Calendar';

export default function HomePageShowMenuButton( { showMenuClick } ) {

  const fadeIn = useSpring({
    from: {opacity: 0}, 
    to: {opacity: 1},
    config: {duration: 2000, easing: easings.easeInOutCubic}
  })

  return (
    <animated.div style={fadeIn} id='home-page-show-menu-container' className='home-page-show-menu-container'>
        <div className='home-page-show-menu-button' onClick={showMenuClick}>Show Menu</div>
    </animated.div>
  );
}

