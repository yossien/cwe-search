import React, { useState } from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
// import ProTip from '../src/ProTip';
// import Link from '../src/Link';
// import Copyright from '../src/Copyright';
import CweSelector from '../src/components/CweSelector'
import CweNetwork from '../src/components/CweNetwork'
import CweGraph from '../src/components/CweGraph'
import CweInfo from '../src/components/CweInfo';

import { AppBar, createStyles, makeStyles, Toolbar } from '@material-ui/core';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
    },
  })
)

const Index = () => {

  const classes = useStyles()

  const [cweId, setCweId] = useState<string|null>(null)

  const handleChangeCweId = (cweId: string|null) => {
    setCweId(cweId)
  }

  return (
    <>
      <AppBar style={{backgroundColor: 'white', color: 'gray', padding: '12px'}} position="fixed">
        <Toolbar>
          <Typography variant="h4" component="h1" align="center">
            CWE Search
          </Typography>
          <div style={{margin: '0px 12px'}}>
          <CweSelector cwe_id={cweId} onChangeCweId={handleChangeCweId}/>
          </div>
        </Toolbar>
      </AppBar>
      <Container style={{marginTop: '108px'}} maxWidth="md" className={classes.root}>
        <Box>
          <CweInfo cwe_id={cweId} />
        </Box>
        <Box>
          <CweGraph cwe_id={cweId} onChangeCweId={handleChangeCweId}/>
        </Box>
        <Box>
          {cweId != null && <CweNetwork cwe_id={cweId}/>}
        </Box>
      </Container>
    </>
  );
}
export default Index