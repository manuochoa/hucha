import React from 'react'
import classes from './Sidebar.module.css'
import CustomButton from '../Button/CustomButton'
import { Button } from '@mui/material'

import logo from '../../../Assets/logo.png'
import exit_icon from '../../../Assets/Icons/logout.svg'
import Referals from '../../Referals/Referals'

const Sidebar = (props) => {
    const { handleWallet } = props

    const info = {
        referal_rewards: 0,
        team: 112,
        my_referal: "",
        marketing_wallet: "0x7c8d1fsls23fjdfsajd23sda21",
        total_deposited: 32120800,
        total_users: 11000
    }

    return (
        <div className={classes.main}>
            <img src={logo} alt="logo" className={classes.logo}/>
            <CustomButton onClick={handleWallet} text="Connect Wallet" variant="primary"/>
            <Referals info={info}/>
            <Button className={classes.exit}>
                <img src={exit_icon} alt="exit_icon"/>
                <p>Log Out</p>
            </Button>
        </div>
    )
}

export default Sidebar