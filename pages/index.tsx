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

import { createStyles, makeStyles } from '@material-ui/core';

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
    <Container maxWidth="sm" className={classes.root}>
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          CWE Search
        </Typography>
        <hr/>
        <CweSelector onChangeCweId={handleChangeCweId}/>
      </Box>
      <Box>
        <CweGraph cwe_id={cweId} />
      </Box>
      <Box>
        {cweId != null && <CweNetwork cwe_id={cweId}/>}
      </Box>
    </Container>
  );
}
export default Index