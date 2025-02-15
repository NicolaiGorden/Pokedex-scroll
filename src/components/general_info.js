import React, { useState, useEffect } from 'react';

function GeneralInfo({speciesData}) {

    function handleOnClick() {
        console.log(speciesData)
    }

    return (
        <div className="info-container">
        <div className="general-info">

        </div>
        <div className="flavor-text-container">
            {/* conditionally render tabs here */}
            <div className='flavor-text-border'>
              <div className='flavor-text-border-flourish'/>
              <div className='flavor-text' onClick={handleOnClick}>
                {/* WARNING: the following regex makes line breaks that are meant to be hyphens into spaces. */}
                {speciesData.flavor_text_entries[0].flavor_text.replace(/[\f\n]/g, ' ')}
              </div>
              <div className='flavor-text-border-flourish'/>
            </div>
        </div>
      </div>
    )
}

export default GeneralInfo;