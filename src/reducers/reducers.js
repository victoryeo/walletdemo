export const initialState = {
  username: 'user',
  totalBalance : 0.0,
  account: '0x0',
  keystore: false,
}

export const reducers = (state = initialState, action) => {
  console.log("actiontype "+action.type)
  let val = {}
  switch (action.type) {
    case 'UPDATE_ACCOUNT':
      return {
        ...state,
        account: action.payload,
      };
      break;
    case 'UPDATE_TOTAL_BALANCE':
      return {
        ...state,
        totalBalance: action.payload,
      };
      break;
    case 'UPDATE_KEYSTORE':
      return {
        ...state,
        keystore: action.payload,
      }
      break;
    case 'UPDATE_USERNAME':
      val = {
        ...state,
        username: action.payload,
      };
      break;
    default:
      val =  state

  }
  console.log("val " + val.username)
  return val
};

export default reducers;
