import React from 'react'
import classes from './Navbar.module.css'
import logo from '../../../Assets/logo_small.png'
import CustomButton from '../../UI/Button/CustomButton'

const Navbar = (props) => {
    return (
        <div className={classes.main}>
            <img src={logo} alt="logo"/>
            <CustomButton text="Connect Wallet" variant="secondary"/>
        </div>
    )
}

export default Navbar