import React from 'react'
import {Wave} from "./WaveElements"


const WaveHero = () => {
    return (
        <>
            <Wave>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 319">
                    <path fill="#FFBABA" fill-opacity="1" d="M0,32L48,69.3C96,107,192,181,288,186.7C384,192,480,128,576,117.3C672,107,768,149,864,181.3C960,213,1056,235,1152,234.7C1248,235,1344,213,1392,202.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                </svg>
            </Wave>
        </>
    )
}

export default WaveHero

