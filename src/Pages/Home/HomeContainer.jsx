import React, { useState } from 'react'
import Home from './Home'

const HomeContainer = (props) => {
    const [currentTab, setCurrentTab] = useState(0)

    return (
        <>
            <Home
                currentTab={currentTab}
                setCurrentTab={setCurrentTab}
            />
        </>
    )
}

export default HomeContainer