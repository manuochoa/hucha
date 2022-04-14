import React from 'react'
import Countdown from '../Countdown/Countdown'
import CustomButton from '../UI/Button/CustomButton'
import classes from './Deposit.module.css'
import FormDeposit from './FormDeposit/FormDeposit'

const Deposit = (props) => {
    return (
        <div className={classes.main}>
            <h2>Time till Withdrawal</h2>
            <Countdown date={new Date('2022-04-19')}/>
            <div className={classes.actions}>
                <CustomButton text="Compound" variant="secondary"/>
                <CustomButton text="Claim" variant="secondary"/>
                <CustomButton text="Buy HUCHA" variant="secondary"/>
                <CustomButton text="Unstake" variant="secondary"/>
            </div>
            <FormDeposit/>
        </div>
    )
}

export default Deposit