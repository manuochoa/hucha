import { Button } from '@mui/material'
import React from 'react'
import { cx } from '../../../Utils/classnames'
import classes from './CustomButton.module.css'

const CustomButton = (props) => {
    const { text, onClick, variant, disabled = false } = props

    return (
        <Button
            className={cx(
                classes.main,
                variant === "primary" ? classes.primary : "",
                variant === "secondary" ? classes.secondary : ""
            )}
            onClick={onClick}
            disabled={disabled}
        >
            {text}
        </Button>
    )
}

export default CustomButton