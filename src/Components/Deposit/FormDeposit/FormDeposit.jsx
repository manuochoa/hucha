import { Button, InputAdornment, TextField } from "@mui/material";
import React, { useState, useEffect } from "react";
import Card from "../../UI/Card/Card";
import classes from "./FormDeposit.module.css";
import { makeStyles } from "@mui/styles";
import CustomButton from "../../UI/Button/CustomButton";
import { useDispatch, useSelector } from "react-redux";
import { initAction } from "../../../Redux/reduxActions";

const useStyles = makeStyles((theme) => ({
  root: {
    background: "white",
    width: "100%",
    borderRadius: "12px",
    border: "1px solid #E8E8E8",
    "& input": {
      fontSize: "16px",
      fontFamily: "'Milky Nice', sans-serif",
      fontWeight: "400",
      padding: "0 24px",
      "@media screen and (max-width: 468px)": {
        fontSize: "16px",
      },
    },
    "& input::placeholder": {
      color: "gray",
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "rgb(236, 161, 159, .1)",
    },
    "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "rgb(236, 161, 159, .4)",
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "rgb(236, 161, 159, .8)",
    },
    "& .MuiOutlinedInput-root": {
      borderRadius: 8,
      height: "60px",
      fontFamily: "Open Sans",
      fontSize: "16px",
      "@media screen and (max-width: 468px)": {
        height: "48px",
      },
    },
    "& .MuiFormHelperText-root.Mui-error": {
      margin: 0,
      marginTop: 5,
    },
  },
}));

const FormDeposit = ({ canWithdraw }) => {
  const dispatch = useDispatch();
  let { user, contract } = useSelector((state) => state.common);
  const [deposit, setDeposit] = useState(0);
  const [address, setAddress] = useState(
    user.myReferral !== "0x0000000000000000000000000000000000000000"
      ? user.myReferral
      : ""
  );
  const [isLoading, setIsLoading] = useState(false);

  const handleDeposit = (e) => {
    // const number = Number(e.target.value.replace(/[^0-9]/g, ""));
    const number = Number(e.target.value);
    if (number <= Number(user.balance)) {
      setDeposit(number);
    } else {
      setDeposit(user.balance);
    }
  };

  const handleAddress = (e) => {
    setAddress(e.target.value);
  };

  const setMax = () => {
    setDeposit(truncateByDecimalPlace(user.balance, 2));
  };

  const handleClick = async (type) => {
    setIsLoading(true);
    let receipt;
    switch (type) {
      case "APPROVE":
        receipt = await dispatch(initAction(type));
        break;
      case "DEPOSIT":
        receipt = await dispatch(
          initAction(type, address, Number(deposit).toString())
        );
        break;
      case "WITHDRAW":
        receipt = await dispatch(
          initAction(type, address, Number(deposit).toString())
        );
        break;

      default:
        break;
    }
    if (receipt) {
      console.log(receipt);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (user.myReferral !== "0x0000000000000000000000000000000000000000") {
      setAddress(user.myReferral);
    }
  }, [user]);

  const material = useStyles();

  const truncateByDecimalPlace = (value, numDecimalPlaces) =>
    Math.trunc(value * Math.pow(10, numDecimalPlaces)) /
    Math.pow(10, numDecimalPlaces);

  return (
    <Card className={classes.main}>
      <h4>Deposit HUCHA</h4>
      <div className={classes.fields}>
        <div className={classes.field}>
          <div className={classes.header}>
            <label>Amount</label>
            <label>Balance: {truncateByDecimalPlace(user.balance, 2)}</label>
          </div>
          <div className={classes.header}>
            <label></label>
            <label className={classes.onlyMobile}>
              Staked Amount: {truncateByDecimalPlace(user.deposits, 2)}
            </label>
          </div>
          <TextField
            classes={material}
            placeholder="Value"
            onChange={handleDeposit}
            value={deposit}
            InputProps={{
              endAdornment: (
                <InputAdornment
                  position="end"
                  style={{ width: "fit-content", marginRight: "0" }}
                >
                  <Button onClick={setMax} className={classes.maxBut}>
                    MAX
                  </Button>
                </InputAdornment>
              ),
            }}
          />
        </div>
        {user.myReferral === "0x0000000000000000000000000000000000000000" && (
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
        )}
      </div>
      <CustomButton
        text={user.isAllowed ? "Deposit" : "Approve Deposit"}
        variant="primary"
        onClick={
          user.isAllowed
            ? () => handleClick("DEPOSIT")
            : () => handleClick("APPROVE")
        }
        disabled={!deposit || !address || isLoading}
        style={{ marginBottom: "10px" }}
      />
      <CustomButton
        text={
          Number(user.deposits) < Number(deposit)
            ? "Not Enough Deposit"
            : "Withdraw"
        }
        variant="primary"
        onClick={() => handleClick("WITHDRAW")}
        disabled={
          isLoading ||
          Number(user.deposits) === 0 ||
          !canWithdraw() ||
          Number(user.deposits) < Number(deposit)
        }
      />
    </Card>
  );
};

export default FormDeposit;
