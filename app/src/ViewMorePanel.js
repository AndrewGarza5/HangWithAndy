import { useEffect } from 'react';
import './styles/view-more-panel.css';

export default function ViewMorePanel( { clickBackButton } ) {

  useEffect(() => {

  })

  return (
    <div id='view-more-panel-container' className='home-menu-panel-container'>
        <div className='view-more-back-button' onClick={clickBackButton}>
            Back!
        </div>
        <div className='view-more-my-friends'>
            View my friends
        </div>
        <div className='view-more-view-photos'>
            View all photos
        </div>
        <div className='view-more-submit-photos'>
            Submit photos
        </div>
        <div className='view-more-view-past-hangouts'>
            View past hangouts
        </div>
    </div>
  );
}

