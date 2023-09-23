import { showAlert } from '../redux/reducers/alertSlice';
import { setAccount } from '../redux/reducers/web3Slice';

const connectWallet = async (web3Reducer, dispatch) => {
    if (web3Reducer.provider) {
        try {
            await web3Reducer.provider.request({
                method: 'eth_requestAccounts'
            });
            dispatch(
                showAlert({
                    success: 'Successfully connected to metamask wallet.'
                })
            );

            const accounts = await web3Reducer.web3.eth.getAccounts();
            dispatch(setAccount(accounts[0]));
        } catch (error) {
            dispatch(
                showAlert({ error: 'Connection failed to metamask wallet' })
            );
        }
    }
};

export default connectWallet;
