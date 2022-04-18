import React, { useState } from "react";
import { parseNumber } from "../../Utils/parseNumber";
import classes from "./Referals.module.css";
import { useDispatch, useSelector } from "react-redux";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Referals = (props) => {
  const { info } = props;
  let { user, contract } = useSelector((state) => state.common);
  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setOpen(true);
  };
  return (
    <div className={classes.info}>
      <div className={classes.field}>
        <span>Referral Rewards</span>
        <div className={classes.fieldValue}>
          <p className={classes.value}>
            {Number(user.referralRewards).toFixed(2)}
          </p>
          <p className={classes.dop}>HUCHA</p>
        </div>
      </div>
      <div className={classes.field}>
        <span>Team</span>
        <div className={classes.fieldValue}>
          <p className={classes.value}>{user.team}</p>
        </div>
      </div>
      <div className={classes.field}>
        <span>My Referral</span>
        <div className={classes.fieldValue}>
          <p className={classes.dop}>
            {`${user.myReferral.slice(0, 6)}...${user.myReferral.slice(-6)}`}
          </p>
        </div>
      </div>
      <div className={classes.field}>
        <span>Marketing Wallet</span>
        <div className={classes.fieldValue}>
          <p
            onClick={() => copyToClipboard(info.marketing_wallet)}
            className={classes.marketing}
          >
            {info.marketing_wallet.substring(0, 7) +
              "..." +
              info.marketing_wallet.substring(info.marketing_wallet.length - 4)}
          </p>
        </div>
      </div>
      <div className={classes.field}>
        <span>Total Deposited</span>
        <div className={classes.fieldValue}>
          <p className={classes.value}>
            {Number(contract.totalDeposited).toFixed(2)}
          </p>
          <p className={classes.dop}>HUCHA</p>
        </div>
      </div>
      <div className={classes.field}>
        <span>Total Users</span>
        <div className={classes.fieldValue}>
          <p className={classes.value}>{parseNumber(contract.totalUsers)}</p>
        </div>
      </div>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          autoHideDuration={1000}
          onClose={handleClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          Copied to clipboard!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Referals;
