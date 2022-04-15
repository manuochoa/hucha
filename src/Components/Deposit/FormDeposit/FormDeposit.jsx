import { Button, InputAdornment, TextField } from '@mui/material'
import React, { useState } from 'react'
import Card from '../../UI/Card/Card'
import classes from './FormDeposit.module.css'
import { makeStyles } from '@mui/styles'
import CustomButton from '../../UI/Button/CustomButton'

const useStyles = makeStyles((theme) => ({
    root:{
        background: "white",
        width: "100%",
        borderRadius: "12px",
        border: "1px solid #E8E8E8",
        '& input': {
            fontSize: "16px",
            fontFamily: "'Milky Nice', sans-serif",
            fontWeight: "400",
            padding: "0 24px",
            '@media screen and (max-width: 468px)': {
                fontSize: "14px"
            }
        },
        '& input::placeholder': {
            color: "gray"
        },
        '& .MuiOutlinedInput-notchedOutline': {
            borderColor: "rgb(236, 161, 159, .1)"
        },
        '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: "rgb(236, 161, 159, .4)"
        },
        '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgb(236, 161, 159, .8)',
        },
        '& .MuiOutlinedInput-root': {
            borderRadius: 8,
            height: "60px",
            fontFamily: "Open Sans",
            fontSize: "14px",
            "@media screen and (max-width: 468px)": {
                height: "48px"
            }
        },
        '& .MuiFormHelperText-root.Mui-error': {
            margin: 0,
            marginTop: 5,
        }
    }
}));

const FormDeposit = (props) => {
    const { balance = 1000 } = props

    const [deposit, setDeposit] = useState(500)
    const [address, setAddress] = useState("")

    const handleDeposit = (e) => {
        const number = Number(e.target.value.replace(/[^0-9]/g, ''))
        if(number <= balance) {
            setDeposit(number)
        }else {
            setDeposit(balance)
        }
    }

    const handleAddress = (e) => {
        setAddress(e.target.value)
    }

    const setMax = () => {
        setDeposit(balance)
    }

    const material = useStyles()

    return (
        <Card className={classes.main}>
            <h4>Deposit HUCHA</h4>
            <div className={classes.fields}>
                <div className={classes.field}>
                    <div className={classes.header}>
                        <label>Amount</label>
                        <label>Balance: {balance}</label>
                    </div>      
                    <TextField
                        classes={material}
                        placeholder="Value"
                        onChange={handleDeposit}
                        value={deposit}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position='end' style={{ width: "fit-content", marginRight: "0" }}>
                                    <Button onClick={setMax} className={classes.maxBut}>MAX</Button>
                                </InputAdornment>
                            )
                        }}
                    />
                </div>
                <div className={classes.field}>
                    <div className={classes.header}>
                        <label>Referral Address</label>
                    </div>      
                    <TextField
                        classes={material}
                        placeholder="Add Address"
                        onChange={handleAddress}
                        value={address}
                    />
                </div>
            </div>
            <CustomButton 
                text="Approve Deposit" 
                variant="primary"
                disabled={!deposit || !address}
            />
        </Card>
    )
}

export default FormDeposit