import axios from 'axios';
import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Card } from '@mui/material';
import Grid from '@mui/material/Grid';
import '../Styles/AdminPanel.css'
import Ct from './Ct';
const AdminPanel = () => {
  let {updstate } = useContext(Ct);
  let [data, setData] = useState({ _id: '', password: '' });
  let [msg, setMsg] = useState('');
  let navigate = useNavigate();

  let handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  let login = () => {
    axios.post('http://localhost:5000/login', data).then((res) => {
      
      setMsg("you are not admin");

      if (res.data.token !== undefined && res.data.role==="admin") {
        updstate(res.data);
        navigate('/admin');
      }
    });
  };

  return (
    <Grid container className='admin-container'>
      <Card className='admin-card'>
        <Typography variant="h5" gutterBottom textAlign="center" color="primary">
          Admin Login
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
          New to the platform? <Link to="/reg">Click here to register</Link>
        </Typography>
      </Card>
    </Grid>
  );
};

export default AdminPanel;
