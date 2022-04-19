import React, { useEffect } from "react";
import classes from "./Navbar.module.css";
import logo from "../../../Assets/main_logo.svg";
import CustomButton from "../../UI/Button/CustomButton";

const Navbar = (props) => {
  const { handleWallet, disconnectWallet, userAddress, dispatch } = props;

  return (
    <div className={classes.main}>
      <img className={classes.logo} src={logo} alt="logo" />

      <CustomButton
        onClick={
          userAddress ? () => dispatch(disconnectWallet()) : handleWallet
        }
        text={
          userAddress
            ? `${userAddress.slice(0, 6)}...${userAddress.slice(-6)}`
            : "Connect Wallet"
        }
        variant="secondary"
      />
    </div>
  );
};

export default Navbar;
