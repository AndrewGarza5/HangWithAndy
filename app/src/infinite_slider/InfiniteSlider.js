import React, { useEffect, useState } from 'react';
import './styles/infinite-slider.css';
import InfiniteSliderPanel from './InfiniteSliderPanel.js'
import {v4 as uuidV4} from 'uuid'

export default function InfiniteSlider() {

    const [panels, setPanels] = useState()
    const [panelIDs, setPanelIDs] = useState()
    useEffect(() => {

        // WHERE I LEFT OFF: I want to make 3 outer panel-containers that never get deleted from the dom.  
        // This way the panels never shift. Wait I just realized this doesnt make sense
        const panel1ID = uuidV4()
        const panel2ID = uuidV4()
        const panel3ID = uuidV4()

        setPanelIDs([panel1ID, panel2ID, panel3ID])
        setPanels([
            <InfiniteSliderPanel key={panel1ID} panelID={panel1ID} number={1} />, 
            <InfiniteSliderPanel key={panel2ID} panelID={panel2ID} number={2} />, 
            <InfiniteSliderPanel key={panel3ID} panelID={panel3ID} number={3} />, 
            <InfiniteSliderPanel key={uuidV4()} panelID={uuidV4()} number={4} />,
            <InfiniteSliderPanel key={uuidV4()} panelID={uuidV4()} number={5} />,
            <InfiniteSliderPanel key={uuidV4()} panelID={uuidV4()} number={6} />,
            <InfiniteSliderPanel key={uuidV4()} panelID={uuidV4()} number={7} />,
            <InfiniteSliderPanel key={uuidV4()} panelID={uuidV4()} number={8} />,
            <InfiniteSliderPanel key={uuidV4()} panelID={uuidV4()} number={9} />
        ])
        document.getElementById('infinite-slider-panels-container').style.transform = 'translateX(-999999px)'
    }, []) 

    function removePanel() {
        document.getElementById('infinite-sliding-individual-panel-' + panelIDs[0]).remove()
        // let panelsTempArray = panels
        // panels[0].remove()
        // panelsTempArray.shift()

        // console.log(panelsTempArray)

        // setPanels(panelsTempArray)
        
    }

    function addPanel() {
        console.log(1)
        const newPanelID = uuidV4()

        let tempPanelIDsArray = panelIDs.slice()
        tempPanelIDsArray.push(newPanelID)
        setPanelIDs(tempPanelIDsArray)

        let tempPanelsArray = panels.slice()
        tempPanelsArray.push(<InfiniteSliderPanel key={newPanelID} panelID={newPanelID} />)
        setPanels(tempPanelsArray)
    }

    return (
        <>
            {/* <button onClick={removePanel} className='hahaha'>remove</button>
            <button onClick={addPanel} className='cough'>add</button> */}

            <div className="infinite-slider-container">
                <div id='infinite-slider-panels-container' className='infinite-slider-panels-container'>
                    {panels}
                </div>
            </div>
        </>
    )
}

