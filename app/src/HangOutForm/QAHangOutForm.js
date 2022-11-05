import { useEffect, useState } from 'react';
import DownArrow from './DownArrow';
import InvalidFormWarning from '../InvalidFormWarning';
import './styles/hang-out-form.css';
import axios from 'axios'

export default function QAHangOutForm( { hangOutSubmittedRemoveQA, showInvalidFormWarning, dayStr, removeDownArrow } ) {

    const [confirmedHangOutComponent, setConfirmedHangOutComponent] = useState(null)

  useEffect(() => {

    setTimeout(() => {
        intervalCheckToRemoveDownArrow(document.getElementById('hang-out-form-contents-container').getBoundingClientRect().top)

    }, 1000)
    
  }, [])


  function resizeTextboxOnInput(e){
    e.target.style.height = "";
    e.target.style.height = e.target.scrollHeight + "px"


  }

  
  function intervalCheckToRemoveDownArrow(startingValue){
    if(startingValue < 0 || startingValue == null || startingValue == undefined){
        return
    }
    else{
        var topCoordinate
        if(document.getElementById('hang-out-form-contents-container')){
            topCoordinate = document.getElementById('hang-out-form-contents-container').getBoundingClientRect().top 
        }
        else{
            topCoordinate = null
        }
        // document.getElementById('hang-out-form-contents-container').getBoundingClientRect().top = 300
        console.log(topCoordinate)
        if((startingValue - topCoordinate) > 300 || (startingValue - topCoordinate) < -300 || topCoordinate == null || topCoordinate == undefined){
            if(document.getElementById('down-arrow-container')){
                document.getElementById('down-arrow-container').style.opacity = 0
                setTimeout(() => {
                    removeDownArrow()
                }, 5000)
            }
        }
        else{

            setTimeout(() => {
                intervalCheckToRemoveDownArrow(startingValue)

            }, 3000)
        }
    }
    return
    
  }
  
  function phoneNumberInput(e){
    if(document.getElementById('hang-out-form-phone-number').value.length  >= 11 && e.code != 'ArrowLeft' && e.code != 'ArrowRight' && e.code != 'Backspace'){
        e.preventDefault()
    }
  }

  async function hangOutClick(){

    removeDownArrow()

    const nameObj = document.getElementById('hang-out-form-name')
    const phoneNumberObj = document.getElementById('hang-out-form-phone-number')
    const whatDoObj = document.getElementById('hang-out-form-what-do')

    let invalidForm = false
    
    if(nameObj.value == ''){
        document.getElementById('hang-out-form-question-name').style.color = 'rgb(255, 0, 0)'
        invalidForm = true
    }
    else{
        document.getElementById('hang-out-form-question-name').style.color = 'white'
    }

    if(phoneNumberObj.value == ''){
        document.getElementById('hang-out-form-question-phone-number').style.color = 'rgb(255, 0, 0)'
        invalidForm = true

    }
    else{
        document.getElementById('hang-out-form-question-phone-number').style.color = 'white'
    }

    if(whatDoObj.value == ''){
        document.getElementById('hang-out-form-question-what-do').style.color = 'rgb(255, 0, 0)'
        invalidForm = true

    }
    else{
        document.getElementById('hang-out-form-question-what-do').style.color = 'white'
    }


    if(invalidForm){
        showInvalidFormWarning()
    }
    else{
        let hangOutPostBody = {
            name: nameObj.value,
            date: dayStr,
            phoneNumber: phoneNumberObj.value,
            whatDo: whatDoObj.value,
            inviteAnyone: document.getElementById('hang-out-form-invite-anyone').value,
            specificTime: document.getElementById('hang-out-form-specific-time').value,
            whyHangout: document.getElementById('hang-out-form-why-hang-out').value,
            finalThoughts: document.getElementById('hang-out-form-final-thoughts').value
        }
        try{
            const hangOutPostResponse = await axios.post('https://www.hangwithandy.com:5000/api/v1/hang-out', hangOutPostBody)
            console.log(hangOutPostResponse)
            if(hangOutPostResponse.status == 200){
                document.getElementById('hang-out-form-slider').style.overflow = 'hidden'
                document.getElementById('hang-out-form-contents-container').style.transform = 'translateY(1000px)'
                document.getElementById('hang-out-form-submit-button').style.transform = 'translateY(1000px)'
                setConfirmedHangOutComponent(<confirmedHangOutComponent />)

                setTimeout(() => {
                    hangOutSubmittedRemoveQA()
                }, 1500)
            }
            else{
                console.log(99)
                alert('Server error - just message me i guess lol')
            }
        }
        catch(e){   
            console.log(9669)
            alert('Server error - just message me i guess lol')
        }
        
    }
    
  }

  return (
    <>
        <div id='hang-out-form-contents-container' className='hang-out-form-contents-container'>
            {/* <div id='down-arrow' className='down-arrow'>
                {downArrowState}
            </div> */}

            <div className='hang-out-form-question-answer-container'>
                <div id='hang-out-form-question-name' className='hang-out-form-question-container'>
                    Name<span style={{fontFamily:'Cantarell'}}>:</span>
                </div>
                
                <textarea id='hang-out-form-name' placeholder='Enter answer... (required)*'onInput={resizeTextboxOnInput} maxLength='2000' className='hang-out-form-answer-container'></textarea>
            </div>

            <div className='hang-out-form-question-answer-container'>
                <div id='hang-out-form-question-phone-number' className='hang-out-form-question-container'>
                    Phone number<span style={{fontFamily:'Cantarell'}}>:</span>
                </div>
                
                <input id='hang-out-form-phone-number' type="number" pattern="[0-9]*" inputMode="numeric" placeholder='Enter answer... (required)*' onKeyDown={phoneNumberInput} className='hang-out-form-phone-number-input' />
            </div>

            <div className='hang-out-form-question-answer-container'>
                <div id='hang-out-form-question-what-do' className='hang-out-form-question-container'>
                    What do you want to do?
                </div>
                
                <textarea id='hang-out-form-what-do' placeholder='Enter answer... (required)*'onInput={resizeTextboxOnInput} maxLength='2000' className='hang-out-form-answer-container'></textarea>
            </div>
            
            <div className='hang-out-form-question-answer-container'>
                <div className='hang-out-form-question-container'>
                    Do you want to invite anyone else?
                </div>
                <textarea id='hang-out-form-invite-anyone' placeholder='Enter answer... (optional)' onInput={resizeTextboxOnInput} maxLength='2000' className='hang-out-form-answer-container'></textarea>
            </div>

            <div className='hang-out-form-question-answer-container'>
                <div className='hang-out-form-question-container'>
                    Will this be at a specific time?
                </div>
                <textarea id='hang-out-form-specific-time' placeholder='Enter answer... (optional)' onInput={resizeTextboxOnInput} maxLength='2000' className='hang-out-form-answer-container'></textarea>
            </div>

            {/* <div className='hang-out-form-question-answer-container'>
                <div className='hang-out-form-question-container'>
                    What are the expected vibes?
                </div>
                <textarea placeholder='Enter answer... (optional)' onInput={resizeTextboxOnInput} maxLength='2000' className='hang-out-form-answer-container'></textarea>
            </div> */}

            <div className='hang-out-form-question-answer-container'>
                <div className='hang-out-form-question-container'>
                    Why do you want to hang out?
                </div>
                <textarea id='hang-out-form-why-hang-out' placeholder='Enter answer... (optional)' onInput={resizeTextboxOnInput} maxLength='2000' className='hang-out-form-answer-container'></textarea>
            </div>

            <div className='hang-out-form-question-answer-container'>
                <div className='hang-out-form-question-container'>
                    Any final thoughts?
                </div>
                <textarea id='hang-out-form-final-thoughts' placeholder='Enter answer... (optional)' onInput={resizeTextboxOnInput} maxLength='2000' className='hang-out-form-answer-container'></textarea>
            </div>

            
        </div>

        <button id='hang-out-form-submit-button' className='hang-out-form-submit-button' onClick={hangOutClick}>
            Hang out!
        </button>
    </>
  );
}

