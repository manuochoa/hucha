let initialState = {
  loading: "",
  userAddress: "",
  connectionType: "",
  chainId: "",
  user: {
    referralRewards: "",
    team: "",
    myReferral: "",
    available: "",
    deposits: "",
    claimed: "",
    maxPayout: "",
    unlockTime: "",
    balance: "",
    isAllowed: "",
  },
  contract: {
    totalDeposited: "",
    totalUsers: "",
    unlockDate: "",
    lockDate: "",
  },
};

let commonReducer = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_USER":
      return {
        ...state,
        loading: false,
        userAddress: action.payload.userAddress,
        connectionType: action.payload.connectionType,
      };
    case "UPDATE_CHAIN":
      return {
        ...state,
        chainId: action.payload.chainId,
      };
    case "UPDATE_CONTRACT_INFO":
      return {
        ...state,
        loading: false,
        contract: {
          totalDeposited: action.payload.totalDeposited,
          totalUsers: action.payload.totalUsers,
          unlockDate: action.payload.unlockDate,
          lockDate: action.payload.lockDate,
        },
      };
    case "UPDATE_USER_INFO":
      return {
        ...state,
        loading: false,
        user: {
          referralRewards: action.payload.referralRewards,
          team: action.payload.team,
          myReferral: action.payload.myReferral,
          available: action.payload.available,
          deposits: action.payload.deposits,
          claimed: action.payload.claimed,
          maxPayout: action.payload.maxPayout,
          unlockTime: action.payload.unlockTime,
          balance: action.payload.balance,
          isAllowed: action.payload.isAllowed,
        },
      };
    default: {
      return state;
    }
  }
};

export default commonReducer;
