import { Button, IconButton } from "@mui/material";
import React from "react";

import classes from "./ConnectWallet.module.css";

import metamask from "../../Assets/metamask.png";
import wallet from "../../Assets/wallet.png";
import Overflow from "../UI/Overflow/Overflow";
import CloseIcon from "../UI/Icons/CloseIcon";
import CustomButton from "../UI/Button/CustomButton";
import { useDispatch } from "react-redux";

const ConnectWallet = (props) => {
  const { onClose, connectMetamask, connectWalletConnect } = props;
  const dispatch = useDispatch();

  return (
    <Overflow>
      <div className={classes.main}>
        <div className={classes.header}>
          <h4>Connect Wallet</h4>
          <IconButton onClick={onClose}>
            <CloseIcon color={"black"} />
          </IconButton>
        </div>
        <div className={classes.content}>
          <Button
            onClick={() => dispatch(connectMetamask())}
            className={classes.button}
          >
            <img src={metamask} alt="metamask" />
            <p>Metamask</p>
          </Button>
          <Button
            onClick={() => dispatch(connectWalletConnect())}
            className={classes.button}
          >
            <img src={wallet} alt="metamask" />
            <p>WalletConnect</p>
          </Button>
        </div>
        {/* <div className={classes.submit}>
          <CustomButton text="Connect" variant="secondary" />
        </div> */}
      </div>
    </Overflow>
  );
};

export default ConnectWallet;
