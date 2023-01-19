import React, { useState } from 'react';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import DeleteModal from '../DeleteModal';

export default function ImgMediaCard({ item }) {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [openModal, setOpenModal] = useState(false);

  //route for editing the particular form details
  const handleRoute = (item) => {
    navigate(`/employer/${item.id}`, { state: { item } });
  };

  //handle the delete comfirmation modal
  const handleCloseModal = () => {
    setOpenModal(false);
  };
  const handleClick = () => {
    setOpenModal(true);
  };

  //Delete the employer card
  const handleDelete = async (item) => {
    setOpenModal(false);
    await axios
      .delete(`http://127.0.0.1:8000/api/employers/${item?.id}`)
      .then((res) => {
        enqueueSnackbar('Your details have been deleted', { variant: 'success' });
        if (res) {
          navigate('/');
        }
      })
      .catch(() => {
        enqueueSnackbar('Something went wrong', { variant: 'error' });
      });
  };

  return (
    <>
      <Card sx={{ maxWidth: 445 }}>
        <CardMedia component="img" alt="green iguana" height="140" image={item?.image_url} />
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography gutterBottom variant="h5" component="div">
              {item?.name}
            </Typography>
            <Typography gutterBottom variant="body1" component="div">
              {item?.title}
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary">
            {item?.description}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={() => handleRoute(item)}>
            Edit
          </Button>
          <Button size="small" onClick={handleClick}>
            Delete a Employer
          </Button>
        </CardActions>
      </Card>
      <Dialog maxWidth="md" open={openModal} onClose={handleCloseModal}>
        <DeleteModal
          open={openModal}
          onClose={handleCloseModal}
          item={item}
          handleDelete={handleDelete}
        />
      </Dialog>
    </>
  );
}
