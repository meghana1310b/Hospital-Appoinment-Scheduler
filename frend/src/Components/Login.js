import React, { useContext, useState } from 'react';
import Ct from './Ct';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { TextField, Button, Typography, Card } from '@mui/material';
import Grid from '@mui/material/Grid';

const Login = () => {
  let {updstate } = useContext(Ct);  
  let navigate = useNavigate();
  let [data, setData] = useState({ _id: '', password: '' });
  let [msg, setMsg] = useState('');

  let handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  let login = () => {
    axios.post('http://localhost:5000/login', data)
      .then((res) => { 
        if (res.status === 200 && res.data.token) {
          updstate(res.data);
          navigate('/');
        } else {
          setMsg(res.data.msg || 'Login failed');
        }
      })
      .catch((err) => {
        setMsg(err.response?.data?.msg || 'Invalid email or password');
      });
  };
  
  return (
    <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: '80vh' }}>
      <Card sx={{ p: 4, width: 380, boxShadow: 3, borderRadius: 2 }}>
        <Typography variant="h5" gutterBottom textAlign="center" color="primary">
          Login
        </Typography>

        {msg && (
          <Typography color="error" textAlign="center" sx={{ mb: 2 }}>
            {msg}
          </Typography>
        )}

        <TextField
          fullWidth
          label="Email"
          variant="outlined"
          name="_id"
          value={data._id}
          onChange={handleChange}
          sx={{ mb: 2 }}
        />

        <TextField
          fullWidth
          label="Password"
          variant="outlined"
          type="password"
          name="password"
          value={data.password}
          onChange={handleChange}
          sx={{ mb: 3 }}
        />

        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={login}
          sx={{ textTransform: 'none', fontSize: '1rem' }}
        >
          Login
        </Button>

        <Typography textAlign="center" sx={{ mt: 2 }}>
          New to account?{' '}
          <Link to="/reg" style={{ color: '#007bff', textDecoration: 'none' }}>
            Click here to register
          </Link>
        </Typography>
      </Card>
    </Grid>
  );
};

export default Login;
