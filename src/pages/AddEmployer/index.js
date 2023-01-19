import React, { useState } from 'react';
import axios from 'axios';
import Layout from '../../components/Layout';
import { StyledBox } from './Styled';
import { TextField, Button, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';

const AddEmployer = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [formData, setFormData] = useState({});
  const [media, setMedia] = useState('');

  //handling for form data
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  //hadle image upload using cloudinary storage
  const imageUpload = async () => {
    const data = new FormData();
    data.append('file', media);
    data.append('upload_preset', 'adarsh');
    data.append('cloud_name', 'dc1y1eizh');
    const res = await fetch('https://api.cloudinary.com/v1_1/dc1y1eizh/image/upload', {
      method: 'POST',
      body: data
    });
    const res2 = await res.json();
    return res2.url;
  };

  // handle the form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const mediaUrl = await imageUpload();
    await axios
      .post(`http://127.0.0.1:8000/api/add-employers`, {
        name: formData?.name,
        image_url: mediaUrl,
        title: formData?.title,
        role: formData?.role,
        description: formData?.description
      })
      .then((res) => {
        enqueueSnackbar('Your details have been Submitted', { variant: 'success' });
        if (res) {
          navigate('/view-employers');
        }
      })
      .catch((error) => {
        console.log('error', error);
        enqueueSnackbar(error?.response?.data?.message, { variant: 'error' });
      });
  };

  return (
    <Layout>
      <StyledBox>
        <Typography variant="h3" sx={{ mb: 3 }}>
          Add a employer
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            style={{ width: '100%', margin: '5px' }}
            type="text"
            label="Employer Name"
            name="name"
            variant="outlined"
            onChange={handleChange}
          />
          <br />
          <TextField
            style={{ width: '100%', margin: '5px' }}
            type="file"
            accept="image/*"
            name="image_url"
            variant="outlined"
            onChange={(e) => setMedia(e.target.files[0])}
          />
          <br />
          <TextField
            style={{ width: '100%', margin: '5px' }}
            type="text"
            label="Title"
            name="title"
            variant="outlined"
            onChange={handleChange}
          />
          <br />
          <TextField
            style={{ width: '100%', margin: '5px' }}
            type="text"
            label="Role"
            name="role"
            variant="outlined"
            onChange={handleChange}
          />
          <br />
          <TextField
            style={{ width: '100%', margin: '5px' }}
            type="text"
            label="Description"
            name="description"
            variant="outlined"
            onChange={handleChange}
          />
          <br />
          <Button sx={{ mt: 3 }} variant="contained" color="primary" type="submit">
            save
          </Button>
        </form>
      </StyledBox>
    </Layout>
  );
};

export default AddEmployer;
