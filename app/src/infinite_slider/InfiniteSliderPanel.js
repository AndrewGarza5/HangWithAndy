import React, { useEffect, useState } from 'react';
import './styles/infinite-slider-panel.css';
import axios from 'axios'

import i1 from '../images/1.jpg'
import i2 from '../images/2.jpg'
import i3 from '../images/3.png'
import i4 from '../images/4.jpg'
import i5 from '../images/5.png'
import i6 from '../images/6.png'
import i7 from '../images/7.jpg'
import i8 from '../images/8.jpg'
import i9 from '../images/9.jpg'
import { a } from 'react-spring';

    export default function InfiniteSliderPanel( { panelID } ) {
    const [panels, setPanels] = useState()
    const [photoToUse, setPhotoToUse] = useState()
    const [date, setDate] = useState()
    const [description, setDescription] = useState()
    let interval

    //const config = { attributes: true };
    // const styleChangeCallback = (mutationList, observer) => {
    //     console.log(mutationList)
    //     console.log('--')
    //     observer.disconnect()
    //     setTimeout(() => {
    //         thisPanelElement.style.transition = '150000ms'
    //         thisPanelElement.style.transform = 'translateX(-10000px)'
    //     }, 1000)

    //     // for (const mutation of mutationList) {
    //     //   if (mutation.type === 'childList') {
    //     //     console.log('A child node has been added or removed.');
    //     //   } else if (mutation.type === 'attributes') {
    //     //     console.log(`The ${mutation.attributeName} attribute was modified.`);
    //     //   }
    //     // }
    // }

    // const observer = new MutationObserver(styleChangeCallback);
    //observer.disconnect(); //***** DO THIS WHEN DELETING THE ELEMENT ******/

    // let photoToUse
    // if(panelID == 1){
    //     photoToUse = i1
    // }
    // else if(panelID == 2){
    //     photoToUse = i2
    // }
    // else if(panelID == 3){
    //     photoToUse = i3
    // }

    useEffect(() => {
        async function asyncUseEffect(){
            const currentSessionStorage = sessionStorage.getItem('photoList')
            
            let randomPhotoData = await axios.get(process.env.REACT_APP_ENVIRONMENT + '/api/v1/random-photo-data')
            setPhotoToUse(process.env.REACT_APP_ENVIRONMENT + '/api/v1/photo/' + randomPhotoData.data['photoname'])
            setDate(randomPhotoData.data['date'])
            setDescription(randomPhotoData.data['description'])

            sessionStorage.setItem('photoList', currentSessionStorage + '-' + randomPhotoData.data['photoname'])
            console.log(sessionStorage.getItem('photoList'))

            const thisPanelElement = document.getElementById('infinite-sliding-individual-panel-' + panelID)
            // if(panelID == 1){
            //     // setInterval(() => {
            //     //     // console.log(document.getElementById('infinite-sliding-individual-panel-' + (panelID)).getBoundingClientRect().left)
                    
            //     // }, 1000)
            //     thisPanelElement.style.transition = '150000ms'
            //     thisPanelElement.style.transform = 'translateX(-10000px)'
            // }
            // else{
            //     const previousPanelElement = document.getElementById('infinite-sliding-individual-panel-' + (panelID - 1))
            //     const previousLeft = previousPanelElement.getBoundingClientRect().left
            //     const previousWidth = previousPanelElement.offsetWidth
            
            //     // thisPanelElement.style.transform = 'translateX(' + (previousLeft + previousWidth + 3) + 'px' + ')'
            //     thisPanelElement.style.left = (previousLeft + previousWidth + 1) + 'px'
                
            //     console.log((previousLeft + previousWidth + 1) + 'px')

            //     setTimeout(() => {
            //         thisPanelElement.style.transition = '150000ms'
            //         thisPanelElement.style.transform = 'translateX(-10000px)'
            //     }, 50)
            // }

            // interval = setInterval(() => {
            //     if (document.getElementById('infinite-sliding-individual-panel-' + panelID).getBoundingClientRect().right < 300){
            //         clearInterval(interval)
            //         suicidePanelAndBirthNewPanel(panelID,panelsRef)
            //     }
            // }, 1000)
        }
        asyncUseEffect()
    }, [])

    return (
        <>
        <div id={'infinite-sliding-individual-panel-' + panelID} className='infinite-sliding-individual-panel'>
            <div className='infinite-sliding-panel-date'>
                2.10.20
            </div>
            <img src={photoToUse} id={'infinite-sliding-individual-panel-image-' + panelID} className='infinite-sliding-individual-panel-image'></img>
            <div className='infinite-sliding-panel-description'>
                poopy butt hole
            </div>
        </div>
        </>
    );
}

