import React, { useState } from "react";
import Countdown from "../Countdown/Countdown";
import CustomButton from "../UI/Button/CustomButton";
import classes from "./Deposit.module.css";
import FormDeposit from "./FormDeposit/FormDeposit";
import { useSelector, useDispatch } from "react-redux";
import { initAction } from "../../Redux/reduxActions";

const Deposit = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  let { user } = useSelector((state) => state.common);

  const handleClick = async (type) => {
    setIsLoading(true);
    let receipt = await dispatch(initAction(type));
    if (receipt) {
      console.log(receipt);
    }
    setIsLoading(false);
  };
  return (
    <div className={classes.main}>
      <h2>Time till Withdrawal</h2>
      <Countdown date={new Date(user.unlockTime ? user.unlockTime : 0)} />
      <div className={classes.actions}>
        <CustomButton
          onClick={() => handleClick("CLAIM")}
          disabled={user.deposits <= 0 || isLoading}
          text="Claim"
          variant="secondary"
        />
        <CustomButton
          onClick={() => handleClick("ROLL")}
          disabled={user.deposits <= 0 || isLoading}
          text="Compound"
          variant="secondary"
        />
        <CustomButton text="Buy HUCHA" variant="secondary" />
        {/* <CustomButton text="Unstake" variant="secondary" /> */}
      </div>
      <FormDeposit />
    </div>
  );
};

export default Deposit;
