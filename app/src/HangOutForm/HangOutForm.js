import { useEffect, useState } from 'react';
import DownArrow from './DownArrow';
import InvalidFormWarning from '../InvalidFormWarning';
import './styles/hang-out-form.css';
import axios from 'axios'
import QAHangOutForm from './QAHangOutForm'
import ConfirmedHangOut from './ConfirmedHangOut'

export default function HangOutForm( { clickBackButton, dayStr, showInvalidFormWarning } ) {

    const [QAHangOutFormComponent, setQAHangOutFormComponent] = useState(<QAHangOutForm 
                                                                            hangOutSubmittedRemoveQA={hangOutSubmittedRemoveQA} 
                                                                            removeDownArrow={removeDownArrow}
                                                                            showInvalidFormWarning={showInvalidFormWarning}
                                                                            dayStr={dayStr}  
                                                                          />
                                                                        )
    const [confirmedHangOutComponent, setConfirmedHangOutComponent] = useState(null)
    const [downArrowState, setDownArrowState] = useState(<DownArrow />)


  function removeDownArrow(){
    setDownArrowState(null)
  }

  function hangOutSubmittedRemoveQA(){
    setQAHangOutFormComponent(null)
    setConfirmedHangOutComponent(<ConfirmedHangOut />)
  }


  return (
    <>
        <div id='hang-out-form-panel-container' className='hang-out-form-panel-container'>
            <div className='hang-out-form-back-button' onClick={clickBackButton}>
                Back!
            </div>
            <div className='hang-out-form-lower-box'>
                <div id='down-arrow' className='down-arrow'>
                    {downArrowState}
                </div>
                <div className='hang-out-form-selected-date-container'>
                    {dayStr}
                </div>
                <div id='hang-out-form-slider' className='hang-out-form-slider'>
                    {confirmedHangOutComponent}
                    {QAHangOutFormComponent}
                </div>
            </div>
        </div>
    </>
  );
}

