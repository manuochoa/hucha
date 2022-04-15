import React from 'react'
import Sidebar from '../Sidebar/Sidebar'
import classes from './Layout.module.css'

const Layout = (props) => {
    const { children, handleWallet } = props

    return (
        <div className={classes.main}>
            <div className={classes.sidebar}>
                <Sidebar handleWallet={handleWallet} />
            </div>
            <div className={classes.content}>
                {children}
            </div>
        </div>
    )
}

export default Layout