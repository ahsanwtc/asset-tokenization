import React, { useEffect, useState } from 'react';
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

  useEffect(() => {    
    const init = async () => {
      const web3 = await getWeb3();
      const contracts = await getContracts(web3);
      const accounts = await web3.eth.getAccounts();
      const salesAddress = await getTokenSaleContractAddress(web3);

      setWeb3(web3);
      setContracts(contracts);
      setAccounts(accounts);
      setSalesAddress(salesAddress);
    };
    init();
  }, []);

  const handleSubmitOnClick = async () => {

    if (kycAddress.length === 0) {
      return;
    }

    await contracts.kyc.methods.setKYCCompleted(kycAddress).send({ from: accounts[0] });
    setKycAddress('');
  };

  if (web3 === undefined || contracts === undefined || accounts.length === 0) {
    return <Loading />;
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <Appbar />
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
            {/* <Stack> */}
              <Typography fontWeight={500}>
                Send Wei to {salesAddress} to receive tokens.
              </Typography>
            {/* </Stack> */}
          </Box>
        </Card>
      </Container>
    </React.Fragment>
  );
}

export default App;
