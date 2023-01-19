import React, { useState } from 'react';
import axios from 'axios';
import Layout from '../../components/Layout';
import { useSnackbar } from 'notistack';
import { StyledBox } from '../AddEmployer/Styled';
import { TextField, Button, Typography } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

const UpdateEmployer = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { state } = useLocation();
  const [media, setMedia] = useState(state.item.image_url);

  //Getting the form data from employer card
  const [formData, setFormData] = useState({
    name: state.item.name,
    image_url: state.item.image_url,
    title: state.item.title,
    role: state.item.role,
    description: state.item.description
  });

  // handle any changes in formdata
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };
  //handle image
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

  //form submission and api integration for put request
  const handleSubmit = async (e) => {
    e.preventDefault();
    const mediaUrl = await imageUpload();
    await axios
      .put(`http://127.0.0.1:8000/api/employers/${state.item.id}`, {
        name: formData?.name,
        image_url: mediaUrl,
        title: formData?.title,
        role: formData?.role,
        description: formData?.description
      })
      .then((res) => {
        enqueueSnackbar('Your details have been Updated', { variant: 'success' });
        if (res) {
          navigate('/view-employers');
        }
      })
      .catch(() => {
        enqueueSnackbar('Something went wrong', { variant: 'error' });
      });
  };

  return (
    <Layout>
      <StyledBox>
        <Typography variant="h3" sx={{ mb: 3 }}>
          Add your book
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            style={{ width: '100%', margin: '5px' }}
            type="text"
            label="Employer Name"
            name="name"
            variant="outlined"
            value={formData.name}
            onChange={handleChange}
          />
          <br />
          <TextField
            style={{ width: '100%', margin: '5px' }}
            type="file"
            accept="image/*"
            label="Image"
            name="image_url"
            variant="outlined"
            onChange={(e) => setMedia(e.target.files[0])}
          />
          {formData.image_url && (
            <img src={formData?.image_url} style={{ width: '60px', height: '60px' }} />
          )}
          <br />
          <TextField
            style={{ width: '100%', margin: '5px' }}
            type="text"
            label="Title"
            name="title"
            variant="outlined"
            value={formData.title}
            onChange={handleChange}
          />
          <br />
          <TextField
            style={{ width: '100%', margin: '5px' }}
            type="text"
            label="Role"
            name="role"
            variant="outlined"
            value={formData.role}
            onChange={handleChange}
          />
          <br />
          <TextField
            style={{ width: '100%', margin: '5px' }}
            type="text"
            label="Description"
            name="description"
            variant="outlined"
            value={formData.description}
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

export default UpdateEmployer;
