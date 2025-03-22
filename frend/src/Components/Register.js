import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Typography, Card } from "@mui/material";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
import { Box } from "@mui/material";

const Register = () => {
  const [data, setData] = useState({ _id: "", name: "", phno: "", password: "", uimage: "" });
  const [image, setImage] = useState(null);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]); 
  };

  const handleSubmit = async () => {
    if (!validateEmail(data._id)) {
      setMsg("Invalid email format");
      return;
    }
    if (!validatePassword(data.password)) {
      setMsg("Password must be at least 6 characters");
      return;
    }
    if (data.name === "" || data.phno === "" || !image) {
      setMsg("Please fill all fields and upload an image");
      return;
    }

    const formData = new FormData();
    formData.append("_id", data._id);
    formData.append("name", data.name);
    formData.append("phno", data.phno);
    formData.append("password", data.password);
    formData.append("uimage", image);

    try {
      const res = await axios.post("http://localhost:5000/reg", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMsg(res.data.msg);
      if (res.data.msg === "Registration Successful") {
        navigate("/login");
      }
    } catch (error) {
      setMsg("Registration Failed");
    }
  };

  return (
    <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: "80vh" }}>
      <Card sx={{ p: 4, width: 380, boxShadow: 3, borderRadius: 2 }}>
        <Typography variant="h5" gutterBottom textAlign="center" color="primary">
          Register
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
          error={!validateEmail(data._id) && data._id !== ""}
          helperText={!validateEmail(data._id) && data._id !== "" ? "Enter a valid email" : ""}
          sx={{ mb: 2 }}
        />

        <TextField fullWidth label="Name" variant="outlined" name="name" value={data.name} onChange={handleChange} sx={{ mb: 2 }} />

        <TextField fullWidth label="Phone Number" variant="outlined" name="phno" value={data.phno} onChange={handleChange} sx={{ mb: 2 }} />

        <TextField
          fullWidth
          label="Password"
          variant="outlined"
          type="password"
          name="password"
          value={data.password}
          onChange={handleChange}
          error={!validatePassword(data.password) && data.password !== ""}
          helperText={!validatePassword(data.password) && data.password !== "" ? "Minimum 6 characters" : ""}
          sx={{ mb: 3 }}
        />
        <Box sx={{ display: "flex", flexDirection: "column", mb: 3 }}>
          <input
            type="file"
            accept="image/*"
            id="file-upload"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
          <label htmlFor="file-upload">
            <Button variant="outlined" component="span" fullWidth sx={{ textTransform: "none", py: 1.5 }}>
              Upload Image
            </Button>
          </label>
          {image && (
            <Typography variant="body2" sx={{ mt: 1, color: "gray" }}>
              {image.name}
            </Typography>
          )}
        </Box>

        <Button fullWidth variant="contained" color="primary" onClick={handleSubmit} sx={{ textTransform: "none", fontSize: "1rem" }}>
          Register
        </Button>

        <Typography textAlign="center" sx={{ mt: 2 }}>
          Already have an account?{" "}
          <Link to="/login" style={{ color: "#007bff", textDecoration: "none" }}>
            Click here to Login
          </Link>
        </Typography>
      </Card>
    </Grid>
  );
};

export default Register;
