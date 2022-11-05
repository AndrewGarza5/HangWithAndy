import { useEffect } from 'react';
import './styles/invalid-form-warning.css';

export default function InvalidFormWarning() {

  return (
    <div id='invalid-form-warning-container' className='invalid-form-warning-container'>
        You missed some required fields <br></br> at the top of the form!
    </div>
  );
}

