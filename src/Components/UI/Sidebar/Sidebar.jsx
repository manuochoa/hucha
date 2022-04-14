import React from 'react'
import classes from './Sidebar.module.css'
import CustomButton from '../Button/CustomButton'
import { parseNumber } from '../../../Utils/parseNumber'
import { Button } from '@mui/material'

import logo from '../../../Assets/logo.png'
import exit_icon from '../../../Assets/Icons/logout.svg'

const Sidebar = (props) => {
    const info = {
        referal_rewards: 0,
        team: 112,
        my_referal: "",
        marketing_wallet: "0x7c8d1fsls23fjdfsajd23sda21",
        total_deposited: 32120800,
        total_users: 11000
    }

    const info_labels = [
        "Referral Rewards",
        "Team",
        "My Referral",
        "Marketing Wallet",
        "Total Deposited",
        "Total Users"
    ]

    return (
        <div className={classes.main}>
            <img src={logo} alt="logo" className={classes.logo}/>
            <CustomButton text="Connect Wallet" variant="primary"/>
            <div className={classes.info}>
                <div className={classes.field}>
                    <span>Referral Rewards</span>
                    <div className={classes.fieldValue}>
                        <p className={classes.value}>{info.referal_rewards}</p>
                        <p className={classes.dop}>HUCHA</p>
                    </div>
                </div>
                <div className={classes.field}>
                    <span>Team</span>
                    <div className={classes.fieldValue}>
                        <p className={classes.value}>{info.team}</p>
                    </div>
                </div>
                <div className={classes.field}>
                    <span>My Referral</span>
                    <div className={classes.fieldValue}>
                        <p className={classes.dop}>
                            {info.my_referal ? info.my_referal : "..."}
                        </p>
                    </div>
                </div>
                <div className={classes.field}>
                    <span>Marketing Wallet</span>
                    <div className={classes.fieldValue}>
                        <p className={classes.dop}>
                            {info.marketing_wallet.substring(0, 7) + "..." + info.marketing_wallet.substring(info.marketing_wallet.length - 4)}
                        </p>
                    </div>
                </div>
                <div className={classes.field}>
                    <span>Total Deposited</span>
                    <div className={classes.fieldValue}>
                        <p className={classes.value}>{parseNumber(info.total_deposited)}</p>
                        <p className={classes.dop}>HUCHA</p>
                    </div>
                </div>
                <div className={classes.field}>
                    <span>Total Users</span>
                    <div className={classes.fieldValue}>
                        <p className={classes.value}>{parseNumber(info.total_users)}</p>
                    </div>
                </div>
            </div>
            <Button className={classes.exit}>
                <img src={exit_icon} alt="exit_icon"/>
                <p>Log Out</p>
            </Button>
        </div>
    )
}

export default Sidebar