import React from 'react'
import classes from './Navbar.module.css'
import logo from '../../../Assets/logo_small.svg'
import CustomButton from '../../UI/Button/CustomButton'

const Navbar = (props) => {
    const { handleWallet } = props
    
    return (
        <div className={classes.main}>
            <img src={logo} alt="logo"/>
            <CustomButton onClick={handleWallet} text="Connect Wallet" variant="secondary"/>
        </div>
    )
}

export default Navbar