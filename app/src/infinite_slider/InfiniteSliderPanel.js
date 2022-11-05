import React, { useEffect, useState } from 'react';
import './styles/infinite-slider-panel.css';
import i1 from '../images/1.jpg'
import i2 from '../images/2.jpg'
import i3 from '../images/3.png'
import i4 from '../images/4.jpg'
import i5 from '../images/5.png'
import i6 from '../images/6.png'
import i7 from '../images/7.jpg'
import i8 from '../images/8.jpg'
import i9 from '../images/9.jpg'

    export default function InfiniteSlider( { panelID, number } ) {
    const [panels, setPanels] = useState()
    let photoToUse
    if(number == 1){
        photoToUse = i1
    }
    else if(number == 2){
        photoToUse = i2
    }
    else if(number == 3){
        photoToUse = i3
    }
    else if(number == 4){
        photoToUse = i4
    }
    else if(number == 5){
        photoToUse = i5
    }
    else if(number == 6){
        photoToUse = i6
    }
    else if(number == 7){
        photoToUse = i7
    }
    else if(number == 8){
        photoToUse = i8
    }
    else if(number == 9){
        photoToUse = i9
    }
    useEffect(() => {
        const colorString = 'rgb(' + Math.floor(Math.random() * 200) + ', ' + Math.floor(Math.random() * 200) + ', ' + Math.floor(Math.random() * 200) + ')'
        console.log(colorString)
        document.getElementById('infinite-sliding-individual-panel-' + panelID).style.backgroundColor = colorString
    }, [])

    return (
        <div id={'infinite-sliding-individual-panel-' + panelID} className='infinite-sliding-individual-panel'>
            <img src={photoToUse} id={'infinite-sliding-individual-panel-image-' + panelID} className='infinite-sliding-individual-panel-image'></img>
        </div>
    );
}

