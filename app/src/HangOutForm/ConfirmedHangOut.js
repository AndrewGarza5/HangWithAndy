import { useEffect } from 'react';
import './styles/confirmed-hang-out.css';
import mePOGGING from '../images/mePOGGING.png'

export default function ConfirmedHangOut() {

  useEffect(() => {
    console.log(81)
    setTimeout(() => {
      document.getElementById('confirmed-hang-out-picture').style.transform = 'rotate(0deg) scale(1)'
      document.getElementById('confirmed-hang-out-picture').style.opacity = '1'



      // document.getElementById('confirmed-hang-out-picture').style.width = 'auto'
      // document.getElementById('confirmed-hang-out-picture').style.maxWidth = '160px'

      // document.getElementById('confirmed-hang-out-picture').style.height = 'auto'
      // document.getElementById('confirmed-hang-out-picture').style.maxHeight = '200px'

      
    }, 300)
  }, [])

  return (
    <>
    <div className='confirmed-hang-out-container'>
      <div className='confirmed-hang-out-text'>
        I'll be in contact.
      </div>
      <img id='confirmed-hang-out-picture' className='confirmed-hang-out-picture' src={mePOGGING} />
      {/* <div className='confirmed-hang-out-fancy-text'>
        - Andy
      </div> */}
    </div>
    </>
  );
}

