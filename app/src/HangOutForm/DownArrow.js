import { useEffect } from 'react';
import './styles/down-arrow.css';

export default function DownArrow() {

  return (
    <>
      <div className='scroll-text'>SCROLL</div>
      <div className="down-arrow-container">
        <div className="down-arrow-chevron"></div>
        <div className="down-arrow-chevron"></div>
        <div className="down-arrow-chevron"></div>
      </div>
    </>

  );
}

