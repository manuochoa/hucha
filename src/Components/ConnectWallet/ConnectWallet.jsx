import { Button, IconButton } from '@mui/material'
import React from 'react'

import classes from './ConnectWallet.module.css'

import metamask from '../../Assets/metamask.png'
import wallet from '../../Assets/wallet.png'
import Overflow from '../UI/Overflow/Overflow'
import CloseIcon from '../UI/Icons/CloseIcon'
import CustomButton from '../UI/Button/CustomButton'

const ConnectWallet = (props) => {
    const { onClose } = props

    return (
        <Overflow>
            <div className={classes.main}>
                <div className={classes.header}>
                    <h4>Connect Wallet</h4>
                    <IconButton onClick={onClose}> 
                        <CloseIcon color={"black"}/>
                    </IconButton>
                </div>
                <div className={classes.content}>
                    <Button className={classes.button}>
                        <img src={metamask} alt="metamask"/>
                        <p>Metamask</p>
                    </Button>
                    <Button className={classes.button}>
                        <img src={wallet} alt="metamask"/>
                        <p>WalletConnect</p>
                    </Button>
                </div>
                <div className={classes.submit}>
                    <CustomButton text="Connect" variant="secondary"/>
                </div>
            </div>
        </Overflow>
    )
}

export default ConnectWallet