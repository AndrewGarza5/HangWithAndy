import { useEffect } from 'react';
import './styles/home-menu.css';
import Calendar from './Calendar';

export default function HomeMenu( { clickViewMore, onCalendarDayClick } ) {

  useEffect(() => {
    // document.getElementById('view-more-button').addEventListener('mousedown', viewMorePanelDown)
    // document.getElementById('view-more-button').addEventListener('touchstart', viewMorePanelDown)

    // document.getElementById('view-more-button').addEventListener('mouseup', viewMorePanelUp)
    // document.getElementById('view-more-button').addEventListener('touchstart', clickViewMore)

  }, [])

  // function viewMorePanelDown(){
  //   document.getElementById('view-more-button').style.backgroundColor = '#de9d0675'
  //   setTimeout(() => {
  //   document.getElementById('view-more-button').style.backgroundColor = 'rgba(3, 20, 49, 0.6)'
        
  //   }, 500)

    
  // }

  

  return (
    <div id='home-menu-panel-container' className='home-menu-panel-container'>
        <div className='hangout-with-andy-container'>
            Hang with<br></br><span style={{display:'inline-block', fontFamily:'HarlowSolid', fontSize:'45px'}}>Andy</span>
        </div>

        <div className='home-page-calendar-section-container'>
        <div className='home-page-calendar-header'>
            Pick the day
        </div>
        <div className='home-page-calendar-container'>
            <Calendar onCalendarDayClick={onCalendarDayClick}/>
        </div>
        </div>

        <div id='view-more-button' className='view-more-button'>
            Friends
        </div>
        <div id='view-more-button' className='view-more-button'>
            Pictures
        </div>
    </div>
  );
}

