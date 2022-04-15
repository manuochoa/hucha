import React from 'react'
import { parseNumber } from '../../Utils/parseNumber'
import classes from './Referals.module.css'

const Referals = (props) => {
    const { info } = props
    return (
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
    )
}

export default Referals