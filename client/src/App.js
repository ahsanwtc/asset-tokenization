import React, { useEffect, useState, useCallback } from 'react';
import { Container, Typography, Card, Box, Stack, CssBaseline, TextField, Divider, Button } from '@mui/material';

import { getWeb3, getContracts, getTokenSaleContractAddress } from './utils';
import Loading from './Loading';
import Appbar from './Appbar';

function App() {
  const [web3, setWeb3] = useState(undefined);
  const [contracts, setContracts] = useState(undefined);
  const [accounts, setAccounts] = useState([]);
  const [kycAddress, setKycAddress] = useState('');
  const [salesAddress, setSalesAddress] = useState('');
  const [userTokens, setUserTokens] = useState(0);
  const [totalSypply, setTotalSupply] = useState(0);

  useEffect(() => {    
    const init = async () => {
      const web3 = await getWeb3();
      const contracts = await getContracts(web3);
      const accounts = await web3.eth.getAccounts();
      const salesAddress = await getTokenSaleContractAddress(web3);
      const totalSupply = await contracts.token.methods.totalSupply().call();

      setWeb3(web3);
      setContracts(contracts);
      setAccounts(accounts);
      setSalesAddress(salesAddress);
      setTotalSupply(totalSupply);
    };
    init();
  }, []);

  const updateUserTokens = useCallback(async () => {
    const tokens = await contracts.token.methods.balanceOf(accounts[0]).call();
    setUserTokens(tokens);
  }, [contracts, accounts]);
  
  const listenToTokenTransfer = useCallback(() => {
    contracts.token.events.Transfer({ to: accounts[0] }).on('data', updateUserTokens);
  }, [accounts, contracts, updateUserTokens]);

  useEffect(() => {
    const init = async () => {
      await updateUserTokens();
      listenToTokenTransfer();
    };

    if (contracts !== undefined && accounts.length > 0) {
      init();
    }

  }, [contracts, accounts, updateUserTokens, listenToTokenTransfer]);

  const handleSubmitOnClick = async () => {

    if (kycAddress.length === 0) {
      return;
    }

    await contracts.kyc.methods.setKYCCompleted(kycAddress).send({ from: accounts[0] });
    setKycAddress('');
  };

  const handleBuyMoreOnClick = async () => {
    await contracts.tokenSale.methods.buyTokens(accounts[0]).send({ from: accounts[0], value: web3.utils.toWei('1', 'wei') });
  };


  if (web3 === undefined || contracts === undefined || accounts.length === 0) {
    return <Loading />;
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <Appbar totalSupply={totalSypply} />
      <Container maxWidth="md">
        <Card>
          <Box sx={{ p: 2, display: 'flex' }}>
            <Stack spacing={0.5}>
              <Typography fontWeight={600}>KYC whitelisting of addresses</Typography>
              <Typography variant="body2" color="text.secondary">
                Here you can add your address to be kyc, so that you can buy tokens.
              </Typography>
            </Stack>
          </Box>
          <Divider />
          <Stack sx={{ px: 2, py: 1, bgcolor: 'background.default' }} direction="row" alignItems="center" justifyContent="space-between" spacing={2}>
            <TextField fullWidth name="kycAddress" label="Enter your address here" variant="standard" value={kycAddress} onChange={e => setKycAddress(e.target.value)} />
            <Button variant="contained" onClick={handleSubmitOnClick}>Submit</Button>

          </Stack>

        </Card>
        <Card sx={{ mt: 2, bgcolor: '#33CCC9' }}>
          <Box sx={{ p: 2, display: 'flex' }}>            
            <Typography fontWeight={500}>
              Send Wei to {salesAddress} to receive tokens.
            </Typography>
          </Box>
        </Card>

        <Card sx={{ mt: 2, bgcolor: '#a2cf6e', maxWidth: 500 }}>
          <Box sx={{ p: 2, display: 'flex' }}>
            <Stack spacing={0.5}>
              <Typography fontWeight={700}>Account: {accounts[0]}</Typography>
              <Typography fontWeight={700}>
                Balance {userTokens} SCT
              </Typography>
              <Box sx={{ flexDirection: 'row-reverse', display: 'flex' }}>
                <Button variant="contained" onClick={handleBuyMoreOnClick}>Buy More</Button>

              </Box>
            </Stack>
          </Box>
        </Card>

      </Container>
    </React.Fragment>
  );
}

export default App;
