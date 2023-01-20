import React, { useEffect, useState, useRef } from 'react';
import './styles/infinite-slider.css';
import './styles/infinite-slider-panel.css';
import InfiniteSliderPanel from './InfiniteSliderPanel.js'
import {v4 as uuidV4} from 'uuid'
import TestPanel from './TestPanel';
import axios from 'axios'

export default function InfiniteSlider() {

    const [panels, setPanels] = useState([])
    // const [panelIDs, setPanelIDs] = useState([])
    const panelsRef = useRef()
    let panelIds = []

    // panelsRef.current = panels
    let currentPanelNumber = 1
    useEffect(() => {
        async function asyncUseEffect(){
            // always have 6 photos rendered at any given moment
            await addNewPanel(0)
            await addNewPanel(1)
            await addNewPanel(2)
            await addNewPanel(3)
            currentPanelNumber = 4
            panelIds = [0,1,2,3]
            setInterval(() => {
                // console.log('->', (document.getElementById('infinite-sliding-individual-panel-' + (currentPanelNumber - 1))).getBoundingClientRect().right)
                // console.log('-->', window.innerWidth)
                console.log(panelIds)
                if(document.getElementById('infinite-sliding-individual-panel-' + panelIds[0]).getBoundingClientRect().right < 0 ){
                    addNewPanel(currentPanelNumber)
                    removeFrontPanel(panelIds[0])
                    panelIds.shift()
                    panelIds.push(currentPanelNumber)
                    currentPanelNumber = currentPanelNumber + 1
                }
                else if((document.getElementById('infinite-sliding-individual-panel-' + (currentPanelNumber - 1))).getBoundingClientRect().right < window.innerWidth + 100){
                    addNewPanel(currentPanelNumber)
                    currentPanelNumber = currentPanelNumber + 1
                }
            }, 1000)
        }
        asyncUseEffect()
        
        // setTimeout(() => {
        //     addNewPanel(0)
        //     addNewPanel(1)
        //     addNewPanel(2)
        // }, 500)
        

        // setInterval(() => {
        //     // if(document.getElementById('infinite-sliding-individual-panel-' + panelIDs[0]).getBoundingClientRect().right < 300){
        //     //     suicidePanelAndBirthNewPanel()
        //     // }
        //     addPanel()
        // }, 1000)
    }, []) 

    async function removeFrontPanel(removePanelNumber) {
        console.log('**', removePanelNumber)
        document.getElementById('infinite-sliding-individual-panel-image-' + removePanelNumber).remove()
        document.getElementById('infinite-sliding-individual-panel-' + removePanelNumber).remove()
    }

    async function addNewPanel(newPanelNumber) {
        const currentSessionStorage = sessionStorage.getItem('photoList')
            
        let randomPhotoData = await axios.get(process.env.REACT_APP_ENVIRONMENT + '/api/v1/random-photo-data')
        console.log(randomPhotoData)
        let photoSrc = process.env.REACT_APP_ENVIRONMENT + '/api/v1/photo/' + randomPhotoData.data['photoname']
        const photoDescription = randomPhotoData.data['description']
        const photoDate = randomPhotoData.data['date']

        const newPanelDiv = document.createElement('div')
        newPanelDiv.id = 'infinite-sliding-individual-panel-' + newPanelNumber
        newPanelDiv.className = 'infinite-sliding-individual-panel'

        const newPanelImg = document.createElement('img')
        newPanelImg.id = 'infinite-sliding-individual-panel-image-' + newPanelNumber
        newPanelImg.className = 'infinite-sliding-individual-panel-image'
        newPanelImg.src = photoSrc

        newPanelDiv.appendChild(newPanelImg)
        document.getElementById('infinite-slider-container').appendChild(newPanelDiv)

        if(newPanelNumber == 0){
            newPanelDiv.style.left = '0'
        }
        else{
            console.log(newPanelNumber)
            const previousPanelElement = document.getElementById('infinite-sliding-individual-panel-' + (newPanelNumber - 1))
            console.log(previousPanelElement.getBoundingClientRect().right)
            newPanelDiv.style.left = (Math.floor(previousPanelElement.getBoundingClientRect().right) - 20) + 'px'
        }
        


        setTimeout(() => {
            newPanelDiv.style.transform = 'translateX(-10000px)'
        }, 50)
    }

    return (
        <>
            <div id='infinite-slider-container' className="infinite-slider-container">
                {/* {panels.map(panel => (
                    panel
                ))} */}
            </div>
        </>
    )
}

