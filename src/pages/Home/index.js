import React from 'react';
import { Grid } from '@mui/material';
import Layout from '../../components/Layout';
import HomeCard from '../../components/HomeCard';
import { data } from './data';

const Home = () => {
  return (
    <Layout>
      <Grid container sx={{ marginTop: '100px' }}>
        {data &&
          data.map((item, index) => {
            return (
              <Grid key={index} item sm={12} md={6}>
                <HomeCard item={item} />
              </Grid>
            );
          })}
      </Grid>
    </Layout>
  );
};

export default Home;
