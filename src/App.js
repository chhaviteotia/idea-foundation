import React from 'react';
import { Container, Typography } from '@material-ui/core';
import Cards from './components/Card';

const App = () => {

  return (
    <Container maxWidth="md">
      <Typography style={{color:"purple"}} variant="h4" align="center" gutterBottom>
        News Category Wise
      </Typography>
      <Cards  />
    </Container>
  );
};

export default App;
