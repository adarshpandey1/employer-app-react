import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../../components/Layout';
import { Grid } from '@mui/material';
import EmployerCard from '../../components/EmployerCard';

const ViewEmployers = () => {
  const [employers, setEmployers] = useState([]);
  useEffect(() => {
    viewAllEmployers();
  }, []);

  //handle api for getting all employers
  const viewAllEmployers = async () => {
    await axios.get(`http://127.0.0.1:8000/api/employers`).then((res) => {
      if (res) {
        setEmployers(res?.data?.data);
      }
    });
  };

  return (
    <Layout>
      <Grid container sx={{ mt: 10 }}>
        {employers?.length > 0 &&
          employers?.map((item, index) => {
            return (
              <Grid key={index} item sm={12} md={4} style={{ padding: '5px' }}>
                <EmployerCard item={item} />
              </Grid>
            );
          })}
      </Grid>
    </Layout>
  );
};

export default ViewEmployers;
