import React, { useState, useEffect } from 'react';
import { IoMdArrowDropright, IoMdArrowDropleft } from "react-icons/io";

function GeneralInfo({speciesData}) {    

    const [flavorText, setFlavorText] = useState({})
    const [currentTab, setCurrentTab] = useState('genI')
    const [currentPage, setCurrentPage] = useState(0)

    useEffect(() => {
        let flavors = {
            genI: [],
            genII: [],
            genIII: [],
            genIV: [],
            genV: [],
            genVI: [],
            genVII: [],
            genVIII: [],
            genIX: []
        }
        speciesData.flavor_text_entries.filter((obj) => obj.language.name === 'en').map((e) => {
            switch (e.version.name) {
                case 'red':
                case 'blue':
                case 'yellow':
                    flavors.genI.push({version: e.version.name, text: e.flavor_text})
                    break;
                case 'gold':
                case 'silver':
                case 'crystal':
                    flavors.genII.push({version: e.version.name, text: e.flavor_text})
                    break;
                case 'ruby':
                case 'sapphire':
                case 'emerald':
                case 'firered':
                case 'leafgreen':
                    flavors.genIII.push({version: e.version.name, text: e.flavor_text})
                    break;
                case 'diamond':
                case 'pearl':
                case 'platinum':
                case 'heartgold':
                case 'soulsilver':
                    flavors.genIV.push({version: e.version.name, text: e.flavor_text})
                    break;
                case 'black':
                case 'white':
                case 'black-2':
                case 'white-2':
                    flavors.genV.push({version: e.version.name, text: e.flavor_text})
                    break;
                case 'x':
                case 'y':
                case 'omega-ruby':
                case 'alpha-sapphire':
                    flavors.genVI.push({version: e.version.name, text: e.flavor_text})
                    break;
                case 'sun':
                case 'moon':
                case 'ultra-sun':
                case 'ultra-moon':
                case 'lets-go-pikachu':
                case 'lets-go-eevee':
                    flavors.genVII.push({version: e.version.name, text: e.flavor_text})
                    break;
                case 'sword':
                case 'shield':
                case 'legends-arceus':
                    flavors.genVIII.push({version: e.version.name, text: e.flavor_text})
                    break;
                case 'scarlet':
                case 'violet':
                    flavors.genIX.push({version: e.version.name, text: e.flavor_text})
                    break;
            }
        })

        setFlavorText(flavors)
        setCurrentTab(Object.keys(flavors).find((gen) => flavors[gen][0]))
        setCurrentPage(0)
    }, [speciesData])

    useEffect(() => {
        setCurrentPage(0)
    }, [currentTab])

    function handleActiveTabs(tab) {
        if (flavorText?.genI) {
            if (!flavorText[tab][0]) {
                return 'flavor-gen-tab no-entry'
            } else if (tab === currentTab) {
                return 'flavor-gen-tab tab-selected'
            } else {
                return 'flavor-gen-tab'
            }
        } else {
            return 'flavor-gen-tab'
        }
    }

    function handleTabClick(tab) {
        setCurrentTab(tab)
    }

    return (
        <div className="info-container">
        <div className="general-info">

        </div>
        <div className="flavor-text-container">
            <div className='flavor-gen-nav'>
                <div onClick={() => handleTabClick('genI')} className={handleActiveTabs('genI')} style={{zIndex:'10'}}>I</div>
                <div onClick={() => handleTabClick('genII')} className={handleActiveTabs('genII')} style= {{zIndex:'9'}}>II</div>
                <div onClick={() => handleTabClick('genIII')} className={handleActiveTabs('genIII')} style= {{zIndex:'8'}}>III</div>
                <div onClick={() => handleTabClick('genIV')} className={handleActiveTabs('genIV')} style= {{zIndex:'7'}}>IV</div>
                <div onClick={() => handleTabClick('genV')} className={handleActiveTabs('genV')} style= {{zIndex:'6'}}>V</div>
                <div onClick={() => handleTabClick('genVI')} className={handleActiveTabs('genVI')} style= {{zIndex:'5'}}>VI</div>
                <div onClick={() => handleTabClick('genVII')} className={handleActiveTabs('genVII')} style= {{zIndex:'4'}}>VII</div>
                <div onClick={() => handleTabClick('genVIII')} className={handleActiveTabs('genVIII')} style= {{zIndex:'3'}}>VIII</div>
                <div onClick={() => handleTabClick('genIX')} className={handleActiveTabs('genIX')} style= {{zIndex:'2'}}>IX</div>
            </div>
            <div className='flavor-text-border'>
            {currentPage === 0 ? 
                <div className='flavor-text-border-flourish'></div> :
                <div onClick={() => setCurrentPage(currentPage-1)} className='flavor-text-border-flourish-button'><IoMdArrowDropleft/></div>
            }
                <div className='flavor-text'>
                    <p className='flavor-tooltip'>Source game: {flavorText.genI ? flavorText[currentTab][currentPage].version.replace('-', ' ').split(" ").map((e) => {
                        return e[0].toUpperCase() + e.substring(1)
                    }).join(" ") : ''}</p>
                    {/* WARNING: the following regex makes line breaks that are meant to be hyphens into spaces. */}
                    {flavorText.genI ? flavorText[currentTab][currentPage].text.replace(/[\f\n]/g, ' ') : ''}
                </div>
            {flavorText[currentTab]?.length === currentPage + 1 ? 
                <div className='flavor-text-border-flourish'></div> :
                <div onClick={() => setCurrentPage(currentPage+1)} className='flavor-text-border-flourish-button'><IoMdArrowDropright/></div>
            }
            </div>
        </div>
      </div>
    )
}

export default GeneralInfo;