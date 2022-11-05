import { useEffect } from 'react';
import './styles/down-arrow.css';

export default function DownArrow() {

  return (
    <div id='down-arrow-container' className="down-arrow-container">
        <div className="down-arrow-chevron"></div>
        <div className="down-arrow-chevron"></div>
        <div className="down-arrow-chevron"></div>
        {/* <span className="text">Scroll</span> */}
    </div>
  );
}

