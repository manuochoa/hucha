import React from 'react'
import Sidebar from '../Sidebar/Sidebar'
import classes from './Layout.module.css'

const Layout = (props) => {
    const { children } = props

    return (
        <div className={classes.main}>
            <div className={classes.sidebar}>
                <Sidebar/>
            </div>
            <div className={classes.content}>
                {children}
            </div>
        </div>
    )
}

export default Layout