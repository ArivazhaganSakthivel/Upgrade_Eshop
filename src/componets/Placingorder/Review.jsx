import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const body= {
  id:'62b186411e8e72621e2e96cd'
};

export default function Review(props) {
    const navigate = useNavigate();
   function clickHandler(){
    const token = localStorage.getItem('x-auth-token');
    fetch('http://localhost:3001/api/v1/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Include any necessary authentication headers
        'x-auth-token': token

        // e.g., 'Authorization': 'Bearer YOUR_ACCESS_TOKEN'
      },
      body: JSON.stringify(body)
    })
      .then(response => response.json())
      .then(data => {
        // Handle the response data
        console.log(data);
      })
      .catch(error => {
        // Handle any errors that occurred during the request
        console.error('Error:', error);
      });
   }
  function orderClickHandler(){
    navigate('/products');
  }

  const [addressArray, setAddressArray] =useState([]);
  const [updatedAddress, setUpdatedAddress] = useState({_id: '64afde03c5b67a32882c22b5', name: 'vijay', contactNumber: 1234569870, city: 'newcity', zipCode: 123456});
  

  useEffect(()=>{
    const token = localStorage.getItem('x-auth-token');
      fetch('http://localhost:3001/api/v1/addresses', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // Include any necessary authentication headers
          'x-auth-token': token
          // e.g., 'Authorization': 'Bearer YOUR_ACCESS_TOKEN'
        },
      })
        .then(response => response.json())
        .then(data => {
          // Handle the response data
          console.log(data);
          setAddressArray(data)
  
        })
        .catch(error => {
          // Handle any errors that occurred during the request
          console.error('Error:', error);
        });
   }, [])


  return (
    <div>Review
      <Box  display={'flex'}gap={3} p={2}>
        <Button onClick={()=>{navigate(-1); props.goBack();}} color="secondary" variant='contained'>Back</Button>
        <Button color="error" variant='contained' 
        onClick={orderClickHandler}>Place order button</Button>  
        </Box>
        <Box display={'flex'} justifyContent={'center'} p={3}>
          <Box width={700} > 
          <Paper>
            <Typography>Name: </Typography>

            {updatedAddress.name}
          </Paper>
          </Box>

        </Box>
    </div>
  )
}
