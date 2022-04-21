import { ethers, providers } from "ethers";
import Web3 from "web3";
import WalletConnectProvider from "@walletconnect/web3-provider";
import store from "./reduxStore";
import { faucetABI, tokenABI } from "./abis";

const updateUser = (payload) => {
  return {
    type: "UPDATE_USER",
    payload: payload,
  };
};

const updateChain = (payload) => {
  return {
    type: "UPDATE_CHAIN",
    payload: payload,
  };
};

const updateSigner = (payload) => {
  return {
    type: "UPDATE_SIGNER",
    payload: payload,
  };
};

const updateContractInfo = (payload) => {
  return {
    type: "UPDATE_CONTRACT_INFO",
    payload: payload,
  };
};

const updateUserInfo = (payload) => {
  return {
    type: "UPDATE_USER_INFO",
    payload: payload,
  };
};

let provider = new ethers.providers.JsonRpcProvider(
  "https://data-seed-prebsc-2-s2.binance.org:8545/"
);

// let vaultAddress = "0x81712e6280FC625fb09E3714B261Bd5163DAba2b";
let tokenAddress = "0x34F7dE3336F30545c05832FA7b067ebC2242F2cc";
let faucetAddress = "0x4d39e6fB4a69f8495d519041219469B613271220";
let pancakeRouter = "0x10ED43C718714eb63d5aA57B78B54704E256024E";

let faucetInstance = new ethers.Contract(faucetAddress, faucetABI, provider);
let tokenInstance = new ethers.Contract(tokenAddress, tokenABI, provider);

let pancakeInstance = new ethers.Contract(
  pancakeRouter,
  [
    "function getAmountsOut(uint amountIn, address[] path) external view returns (uint[] memory amounts)",
  ],
  provider
);

export const getUsdValue = async () => {
  try {
    let convertion = await pancakeInstance.getAmountsOut(
      "1000000000000000000",
      [
        "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56",
        "0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c",
        "0xA947046884fDDC230458448ef9C4A7cBc4703d50",
      ]
    );

    console.log(convertion[2].toString(), "convertion");
    return convertion[2];
  } catch (error) {
    console.log(error, "usdValue");
  }
};

// FAUCET FUNCTIONS

export const getContractInfo = () => {
  return async (dispatch) => {
    try {
      let info = await faucetInstance.contractInfo();

      dispatch(
        updateContractInfo({
          totalDeposited: ethers.utils.formatUnits(info._total_deposited, 18),
          totalUsers: Number(info._total_users),
          unlockDate: Number(info._unlock_date * 1000),
          lockDate: Number(info._lock_date * 1000),
        })
      );
    } catch (error) {
      console.log(error, "usdValue");
    }
  };
};

export const getUserInfo = (userAddress) => {
  return async (dispatch) => {
    try {
      if (!userAddress) {
        let reduxStore = store.getState().common;
        userAddress = reduxStore.userAddress;
      }

      let data = await faucetInstance.getUserInfo(userAddress);
      let allowance = await tokenInstance.allowance(userAddress, faucetAddress);

      dispatch(
        updateUserInfo({
          referralRewards: ethers.utils.formatUnits(data.user.match_bonus, 18),
          team: Number(data.user.referrals),
          myReferral: data.user.upline,
          available: ethers.utils.formatUnits(data.net_payout, 18),
          deposits: ethers.utils.formatUnits(data.user.deposits, 18),
          claimed: ethers.utils.formatUnits(data.user.payouts, 18),
          maxPayout: ethers.utils.formatUnits(data.max_payout, 18),
          unlockTime: Number(data.user.unlock_time * 1000),
          balance: ethers.utils.formatUnits(data.tokenBalance, 18),
          isAllowed: Number(allowance) > 0,
        })
      );
    } catch (error) {
      console.log(error, "getUserInfo");
    }
  };
};

export const initAction = (type, ref, _amount) => {
  return async (dispatch) => {
    try {
      let signer = store.getState().signer;
      let newFaucetInstance = new ethers.Contract(
        faucetAddress,
        faucetABI,
        signer.signer
      );

      let tx;
      let amount;

      switch (type) {
        case "DEPOSIT":
          amount = ethers.utils.parseUnits(_amount, 18);
          let hasDeposit = await checkDeposit(ref);
          if (!hasDeposit) {
            return window.alert(
              "Ref should be an address with active deposits"
            );
          }
          tx = await newFaucetInstance.deposit(ref, amount, {
            gasLimit: 350000,
          });
          break;
        case "WITHDRAW":
          amount = ethers.utils.parseUnits(_amount, 18);
          tx = await newFaucetInstance.withdraw(amount, { gasLimit: 350000 });
          break;
        case "CHANGE_REFERRAL":
          tx = await newFaucetInstance.changeUpline(ref, { gasLimit: 350000 });
          break;
        case "CLAIM":
          tx = await newFaucetInstance.claim({ gasLimit: 350000 });
          break;
        case "ROLL":
          tx = await newFaucetInstance.roll({ gasLimit: 350000 });
          break;
        case "APPROVE":
          let newTokenInstance = new ethers.Contract(
            tokenAddress,
            tokenABI,
            signer.signer
          );
          tx = await newTokenInstance.approve(
            faucetAddress,
            "115792089237316195423570985008687907853269984665640564039457584007913129639935"
          );
          break;
        default:
          break;
      }

      let receipt = await tx.wait();

      dispatch(getUserInfo());
      dispatch(getContractInfo());

      return receipt;
    } catch (error) {
      console.log(error, "initAction");
      if (error.data) {
        window.alert(error.data.message);
      }
    }
  };
};

// WALLET CONNECTION

export const connectMetamask = () => {
  return async (dispatch) => {
    try {
      console.log("hola");
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      let userAddress = accounts[0];
      dispatch(getUserInfo(userAddress));

      const id = await window.ethereum.request({
        method: "eth_chainId",
      });

      let chainId = parseInt(id, 16);

      dispatch(
        updateChain({
          chainId,
        })
      );
      dispatch(getSigner());

      window.ethereum.on("accountsChanged", function (accounts) {
        dispatch(
          updateUser({
            userAddress: accounts[0],
            connectionType: "metamask",
            provider: null,
          })
        );
        dispatch(getSigner());
        dispatch(getUserInfo(accounts[0]));
      });

      window.ethereum.on("chainChanged", (_chainId) => {
        window.location.reload();
      });

      if (userAddress) {
        dispatch(
          updateUser({
            userAddress,
            connectionType: "metamask",
          })
        );
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const connectWalletConnect = () => {
  return async (dispatch) => {
    try {
      console.log("hola");
      const provider = new WalletConnectProvider({
        rpc: {
          // 56: "https://bsc-dataseed.binance.org/",
          4: "https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
          97: "https://data-seed-prebsc-1-s1.binance.org:8545/",
        },
        // network: "binance",
        chainId: 4,
        infuraId: null,
      });

      await provider.enable();

      dispatch(getSigner("WALLET_CONNECT", provider));

      const web3 = new Web3(provider);

      const accounts = await web3.eth.getAccounts();
      dispatch(getUserInfo(accounts[0]));
      let chainId = await web3.eth.getChainId();

      dispatch(
        updateChain({
          chainId,
        })
      );

      provider.on("accountsChanged", (accounts) => {
        console.log(accounts);
        dispatch(
          updateUser({
            userAddress: accounts[0],
            connectionType: "WALLET_CONNECT",
          })
        );
        dispatch(getUserInfo(accounts[0]));
        dispatch(getSigner("WALLET_CONNECT", provider));
      });

      // Subscribe to session disconnection
      provider.on("disconnect", (code, reason) => {
        dispatch(disconnectWallet());
      });

      provider.on("chainChanged", (chainId) => {
        dispatch(
          updateChain({
            chainId,
          })
        );
      });

      if (accounts) {
        dispatch(
          updateUser({
            userAddress: accounts[0],
            connectionType: "WALLET_CONNECT",
          })
        );
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const disconnectWallet = () => {
  let reduxStore = store.getState().common;
  return async (dispatch) => {
    try {
      let { connectionType } = reduxStore;
      if (connectionType === "WALLET_CONNECT") {
        const provider = new WalletConnectProvider({
          rpc: {
            // 56: "https://bsc-dataseed1.ninicoin.io/",
            4: "https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",

            97: "https://data-seed-prebsc-1-s1.binance.org:8545/",
          },
          chainId: 4,
          infuraId: null,
        });
        await provider.disconnect();
      }

      dispatch(
        updateUser({
          userAddress: "",
          connectionType: "",
          provider: null,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };
};

// PROVIDER SIGNER

const getSigner = (walletType, provider) => {
  return async (dispatch) => {
    try {
      let signer;
      if (walletType === "WALLET_CONNECT") {
        const web3Provider = new providers.Web3Provider(provider);

        signer = await web3Provider.getSigner(0);
      } else {
        let newProvider = new ethers.providers.Web3Provider(window.ethereum);
        signer = await newProvider.getSigner(0);
      }

      dispatch(
        updateSigner({
          signer,
        })
      );
    } catch (error) {
      console.log(error, "signer");
    }
  };
};

export const checkDeposit = async (userAddress) => {
  try {
    let info = await faucetInstance.userInfo(userAddress);

    return info.deposits > 0;
  } catch (error) {
    console.log(error, "checkDeposit");
  }
};
