import React, { useState } from "react";
import Home from "./Home";

const HomeContainer = (props) => {
  const [currentTab, setCurrentTab] = useState(0);
  const [isOpenConnectWallet, setIsOpenConnectWallet] = useState(false);

  const handleWallet = () => {
    setIsOpenConnectWallet(!isOpenConnectWallet);
  };

  return (
    <>
      <Home
        setIsOpenConnectWallet={setIsOpenConnectWallet}
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        isOpenConnectWallet={isOpenConnectWallet}
        handleWallet={handleWallet}
      />
    </>
  );
};

export default HomeContainer;
