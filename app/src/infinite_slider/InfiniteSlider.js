import React, { useEffect, useState, useRef } from 'react';
import './styles/infinite-slider.css';
import './styles/infinite-slider-panel.css';
import InfiniteSliderPanel from './InfiniteSliderPanel.js'
import {v4 as uuidV4} from 'uuid'
import TestPanel from './TestPanel';
import axios from 'axios'
import EndOfPhotos from './EndOfPhotos';

export default function InfiniteSlider( {photoOpacity} ) {

    const [endOfPhotos, setEndOfPhotos] = useState()
    let panelIds = []
    let panelList = []

    let currentPanelNumber = 1
    useEffect(() => {
        async function asyncUseEffect(){
            // always have 6 photos rendered at any given moment
            panelList = await axios.get(process.env.REACT_APP_ENVIRONMENT + '/api/v1/random-photo-list')
            panelList = panelList.data
            await setFirstSixPhotos(0)
            currentPanelNumber = 6
            panelIds = [0,1,2,3,4,5]
            let infinitePanelInterval = setInterval(() => {
                if(panelList.length == 0){
                    setEndOfPhotos(<EndOfPhotos />)

                    clearInterval(infinitePanelInterval)
                    return
                }
                else if(document.getElementById('infinite-sliding-individual-panel-' + panelIds[0]).getBoundingClientRect().right < 0 ){
                    addNewPanel(currentPanelNumber)
                    removeFrontPanel(panelIds[0])
                    panelIds.shift()
                    panelIds.push(currentPanelNumber)
                    currentPanelNumber = currentPanelNumber + 1
                }
            }, 1000)
        }
        asyncUseEffect()
    }, []) 

    async function removeFrontPanel(removePanelNumber) {
        document.getElementById('infinite-sliding-individual-panel-image-' + removePanelNumber).remove()
        document.getElementById('infinite-sliding-individual-panel-' + removePanelNumber).remove()
    }

    async function addNewPanel(newPanelNumber) {
        let photoData = panelList[0]
        panelList.shift()

        let photoSrc = process.env.REACT_APP_ENVIRONMENT + '/api/v1/photo/' + photoData['photoname']
        const photoDescription = photoData['description']
        const photoDate = photoData['date']

        const newPanelDiv = document.createElement('div')
        newPanelDiv.id = 'infinite-sliding-individual-panel-' + newPanelNumber
        newPanelDiv.className = 'infinite-sliding-individual-panel'

        const newDateDiv = document.createElement('div')
        newDateDiv.className = 'infinite-sliding-panel-date'
        newDateDiv.innerText = photoDate

        const newPanelImg = document.createElement('img')
        newPanelImg.id = 'infinite-sliding-individual-panel-image-' + newPanelNumber
        newPanelImg.className = 'infinite-sliding-individual-panel-image'
        newPanelImg.src = photoSrc
        newPanelImg.style.opacity = photoOpacity.current

        const newDescriptionDiv = document.createElement('div')
        newDescriptionDiv.className = 'infinite-sliding-panel-description'
        newDescriptionDiv.innerText = photoDescription

        newPanelDiv.appendChild(newDateDiv)
        newPanelDiv.appendChild(newPanelImg)
        newPanelDiv.appendChild(newDescriptionDiv)
        document.getElementById('infinite-slider-container').append(newPanelDiv)

        if(newPanelNumber == 0){
            newPanelDiv.style.left = '0'
        }
        else{
            const previousPanelElement = document.getElementById('infinite-sliding-individual-panel-' + (newPanelNumber - 1))
            const setLeft = Math.floor(previousPanelElement.getBoundingClientRect().right) - 20
            newPanelDiv.style.left = setLeft + 'px'
        }

        setTimeout(() => {
            newPanelDiv.style.transform = 'translateX(-10000px)'
            newPanelDiv.style.visibility = 'visible'
        }, 50)
    }

    async function setFirstSixPhotos(photoNumber){
        console.log(10927)
        if(photoNumber >= 6){
            return
        }
        let photoData = panelList[0]
        panelList.shift()

        let photoSrc = process.env.REACT_APP_ENVIRONMENT + '/api/v1/photo/' + photoData['photoname']
        const photoDescription = photoData['description']
        const photoDate = photoData['date']

        const newPanelDiv = document.createElement('div')
        newPanelDiv.id = 'infinite-sliding-individual-panel-' + photoNumber
        newPanelDiv.className = 'infinite-sliding-individual-panel'

        const newDateDiv = document.createElement('div')
        newDateDiv.className = 'infinite-sliding-panel-date'
        newDateDiv.innerText = photoDate

        const newPanelImg = document.createElement('img')
        newPanelImg.id = 'infinite-sliding-individual-panel-image-' + photoNumber
        newPanelImg.className = 'infinite-sliding-individual-panel-image'
        newPanelImg.src = photoSrc
        newPanelImg.style.opacity = photoOpacity.current

        const newDescriptionDiv = document.createElement('div')
        newDescriptionDiv.className = 'infinite-sliding-panel-description'
        newDescriptionDiv.innerText = photoDescription

        newPanelDiv.appendChild(newDateDiv)
        newPanelDiv.appendChild(newPanelImg)
        newPanelDiv.appendChild(newDescriptionDiv)
        document.getElementById('infinite-slider-container').appendChild(newPanelDiv)

        

        if(photoNumber == 0){
            newPanelDiv.style.left = '0'
            newPanelDiv.style.visibility = 'visible'

            setTimeout(() => {
                newPanelDiv.style.transform = 'translateX(-10000px)'
            }, 50)
            setFirstSixPhotos(photoNumber + 1)
        }
        else{
            const previousPanelElement = document.getElementById('infinite-sliding-individual-panel-' + (photoNumber - 1))
            const photoInterval = setInterval(() => {
                if(previousPanelElement.getBoundingClientRect().width > 10 && newPanelDiv.getBoundingClientRect().width > 10){
                    newPanelDiv.style.left = (Math.floor(previousPanelElement.getBoundingClientRect().right) - 20) + 'px'

                    setTimeout(() => {
                        newPanelDiv.style.transform = 'translateX(-10000px)'
                        newPanelDiv.style.visibility = 'visible'
                    }, 50)

                    setFirstSixPhotos(photoNumber + 1)
                    clearInterval(photoInterval)

                }
            }, 500)
        }

        

    }

    return (
        <>
            <div id='infinite-slider-container' className="infinite-slider-container">
                {endOfPhotos}
            </div>
        </>
    )
}

