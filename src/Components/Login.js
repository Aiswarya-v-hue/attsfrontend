import React from 'react';
import '../Styles/login.css';
import img from '../images/loginimage.png';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Formik, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import backendUrl from '../config';

function Login() {
  const nav = useNavigate();

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .email("Invalid email format")
      .required("Email is required"),
    password: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const handleSubmit = (values, { resetForm }) => {
    axios
      .post(`${backendUrl}/api/login`, values)
      .then(response => {
        console.log(response.data);
       const res = response.data.data.name;
       const resp=response.data.token
       console.log(resp);
       
       console.log(res);
       sessionStorage.setItem('username',res)
       localStorage.setItem('token',resp);

      alert("Logged in successfully");
       
        resetForm();
        if(res){
          nav('/homepage')
          
         }
       
        
       
      })
  
  
      .catch(error => {
        console.error("Login error:", error);
        alert("Failed to login. Please check your credentials.");
      });
  };

  return (
    <div>
      <div className="login-container">
        <div className="logo-login">
          <h1>Auric Treasures</h1>
        </div>

       <div className="login-right">
          <h2>Log in</h2>
          <p>Login to access your travelwise account</p>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ handleSubmit }) => (
              <form className="login-form" onSubmit={handleSubmit} noValidate>
                <div className="form-group">
                  <Field
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="form-input"
                  />
                  <ErrorMessage name="email" component="div" className="error" />
                </div>
                <div className="form-group">
                  <Field
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="form-input"
                    
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="error"
                  />
                </div>
                <div className="form-checkbox">
                  <div>
                    <input type="checkbox" id="terms" />
                    <label htmlFor="terms">Remember me</label>
                  </div>
                  <div>
                    <Link to='/somewhere'>Forgot Password?</Link>
                  </div>
                </div>
                <button type="submit" className="login-button">
                  Login
                </button>
              </form>
            )}
          </Formik>
          <p className="login-footer">
            Don’t have an account?
            <Link to="/signup">Signup</Link>
          </p>
          <p className="login-or">Or login with</p>
          <div className="login-socials">
            <button className="social-button facebook">Facebook</button>
            <button className="social-button google">Google</button>
            <button className="social-button apple">Apple</button>
          </div>
        </div>
        <div className="login-left">
          <img src={img} className="login-image" alt="Login illustration" />
        </div>
      </div>
    </div>
  );
}

export default Login;
