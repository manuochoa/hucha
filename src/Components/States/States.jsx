import React from 'react'
import InfoCard from '../InfoCard/InfoCard'
import classes from './States.module.css'

const States = (props) => {
    return (
        <div className={classes.main}>
            <InfoCard
                value={"303.2M"}
                percent={"13.5%"}
                type="available"
            />
            <InfoCard
                value={"6309"}
                percent={"13.5%"}
                type="deposits"
            />
            <InfoCard
                value={"635,987"}
                percent={"13.5%"}
                type="claimed"
            />
            <InfoCard
                value={"295.3"}
                percent={"13.5%"}
                type="payout"
            />
        </div>
    )
}

export default States