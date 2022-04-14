import { Button, IconButton } from '@mui/material'
import React from 'react'
import { cx } from '../../Utils/classnames'
import ChartsIcon from '../UI/Icons/ChartsIcon'
import CoinsHandIcon from '../UI/Icons/CoinsHandIcon'
import UnionIcon from '../UI/Icons/UnionIcon'
import classes from './Menu.module.css'

const Menu = (props) => {
    const { setCurrentTab, currentTab } = props

    return (
        <div className={classes.main}>
            <Button
                onClick={() => setCurrentTab(0)}
                className={cx(classes.item, currentTab === 0 ? classes.active : "")}
            >
                <ChartsIcon/>
                <p>Stats</p>
            </Button>
            <Button
                onClick={() => setCurrentTab(1)}
                className={cx(classes.item, currentTab === 1 ? classes.active : "")}
            >
                <CoinsHandIcon/>
                <p>Deposit</p>
            </Button>
            <Button
                onClick={() => setCurrentTab(2)}
                className={cx(classes.item, currentTab === 2 ? classes.active : "")}
            >
                <UnionIcon/>
                <p>Referrals</p>
            </Button>
        </div>
    )
}

export default Menu