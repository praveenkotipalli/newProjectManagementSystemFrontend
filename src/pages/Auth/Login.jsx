import  { useState, useRef, useEffect } from 'react';
import './Register.css'; // Import your CSS file
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '@/Redux/Auth/Action';
// import { Link } from 'react-router-dom';
// import AllWorksCTA from "https://framer.com/m/All-Works-CTA-gpas.js@A9J659vnd2OCgRX0kMlt"

const API_Version = 'https://project-management-system-with-spring-7svx.onrender.com';



const fetchPostData = (uri, payload) => {
  const url = `${API_Version}${uri}`;
  return axios.post(url, payload).catch((err) => {
    console.error('Error posting data:', url, 'Error:', err.message);
    throw err;
  });
};



const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, jwt } = useSelector(state => state.auth);

  // Validation states
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const eyeRef = useRef(null);
  const beamRef = useRef(null);

  // Redirect if already logged in
  useEffect(() => {
    if (jwt) {
      navigate('/');
    }
  }, [jwt, navigate]);

  const validateEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      setEmailError('Please enter a valid email address');
      return false;
    }
    setEmailError('');
    return true;
  };

  const validatePassword = (value) => {
    if (!value) {
      setPasswordError('Password is required');
      return false;
    }
    setPasswordError('');
    return true;
  };

  const handleEmailChange = (event) => {
    const value = event.target.value;
    setEmail(value);
    validateEmail(value);
  };

  const handlePasswordChange = (event) => {
    const value = event.target.value;
    setPassword(value);
    validatePassword(value);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
    document.getElementById('password').type = showPassword ? 'text' : 'password';
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Validate all fields
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);

    if (!isEmailValid || !isPasswordValid) {
      return;
    }

    dispatch(
      login({
        email: email,
        password: password,
      })
    );
  };

  useEffect(() => {
    const eye = eyeRef.current;
    const beam = beamRef.current;

    if (eye && beam) {
      const root = document.documentElement;

      const handleMouseMove = (e) => {
        const rect = beam.getBoundingClientRect();
        const mouseX = rect.right + (rect.width / 2);
        const mouseY = rect.top + (rect.height / 2);
        const rad = Math.atan2(mouseX - e.pageX, mouseY - e.pageY);
        const degrees = (rad * (20 / Math.PI) * -1) - 350;

        root.style.setProperty('--beamDegrees', `${degrees}deg`);
      };

      root.addEventListener('mousemove', handleMouseMove);

      const handleEyeClick = (e) => {
        e.preventDefault();
        document.body.classList.toggle('show-password');
        document.getElementById('password').type = document.getElementById('password').type === 'password' ? 'text' : 'password';
        document.getElementById('password').focus();
      };

      eye.addEventListener('click', handleEyeClick);

      return () => {
        root.removeEventListener('mousemove', handleMouseMove);
        eye.removeEventListener('click', handleEyeClick);
      };
    }
  }, []);

  // if (!localStorage.getItem('token')) {
  //   fetchPostData('/auth/signing', { email, password })
  //     .then((response) => {
  //       const { jwt } = response.data;
  //       // setLoginError(''); // Clear any previous login error
  //       localStorage.setItem('token', jwt); // Store the token in local storage
  //       // navigate("/");
  //       window.location.reload();
  //     })
  //     .catch((err) => {
  //       console.error('Login error:', err);
  //       // setLoginError('An error occurred. Please try again.'); // Set error message
  //     });
  // } 
  // else {
  //   localStorage.removeItem('token'); // Corrected to remove the token string
  //   navigate('/login'); // Redirect to the login page
  // }

  return (
    <form onSubmit={handleSubmit} className="register-form login-form">
      <h1 className="register-font">Login</h1>
      
      {error && (
        <div className="error-message">
          {error === 'Invalid credentials' ? 'Invalid email or password' : error}
        </div>
      )}
      
      <div className="form-item">
        <label className='register-label' htmlFor="email">Email</label>
        <input
          className={`register-input ${emailError ? 'error' : ''}`}
          type="email"
          id="email"
          value={email}
          onChange={handleEmailChange}
          autoComplete="off"
          data-lpignore="true"
          required
        />
        {emailError && <div className="error-text">{emailError}</div>}
      </div>
      
      <div className="form-item">
        <label htmlFor="password">Password</label>
        <div className="input-wrapper">
          <input
            className={`register-input ${passwordError ? 'error' : ''}`}
            type={showPassword ? 'text' : 'password'}
            id="password"
            value={password}
            onChange={handlePasswordChange}
            autoComplete="off"
            data-lpignore="true"
            required
          />
          <button type="button" id="eyeball" ref={eyeRef}>
            <div className="eye"></div>
          </button>
          <div id="beam" ref={beamRef}></div>
        </div>
        {passwordError && <div className="error-text">{passwordError}</div>}
      </div>
      
      <button 
        type="submit" 
        id="submit"
        // disabled={loading}
      >
        {loading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
};

export default Login;






















// import { Button } from "@/components/ui/button";
// import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
// import { Input } from "@/components/ui/input"; // Correct input import
// import { useForm } from "react-hook-form";


// export default function Login() {
//     const form = useForm({
//         defaultValues: {
//             // email: "",
//             password: "",
//             fullname: "",
//         },
//     });

//     const onSubmit = (data) => {
//         console.log("login details -->", data);
//     };
//   return (
//     <>
//             <div className="space-y-5  ">
//                 <h1>Login</h1>
//                 <Form {...form}>
//                     <form className="" onSubmit={form.handleSubmit(onSubmit)}>
//                         <FormField
//                             control={form.control}
//                             name="fullname"
//                             render={({ field }) => (
//                                 <FormItem>
//                                     <div className="flex gap-3">
//                                         <div>
//                                             <FormLabel>
//                                                 <p style={{ textAlign: "right", marginBottom: "4px", marginLeft: "2px" }}>
//                                                 Username
//                                                 </p>
//                                             </FormLabel>
//                                             <FormControl>
//                                                 <Input
//                                                     {...field}
//                                                     type="text"
//                                                     className="border w-full border-gray-700 py-5 px-4 mr-12 ml-2 pr-44"
                                                   
//                                                 />
//                                             </FormControl>
//                                             <FormDescription className="ml-2">
//                                                 Enter your username!
//                                             </FormDescription>
//                                         </div>
//                                     </div>
//                                     <FormMessage />
//                                 </FormItem>
//                             )}
//                         />
//                         <FormField
//                             control={form.control}
//                             name="password"
//                             render={({ field }) => (
//                                 <FormItem>
//                                     <div className="flex gap-3">
//                                         <div>
//                                             <FormLabel>
//                                                 <p style={{ textAlign: "right", marginBottom: "4px", marginLeft: "2px" }}>
//                                                     Password
//                                                 </p>
//                                             </FormLabel>
//                                             <FormControl>
//                                                 <Input
//                                                     {...field}
//                                                     type="text"
//                                                     className="border w-full border-gray-700 py-5 px-4 mr-12 ml-2 pr-44"
                                                   
//                                                 />
//                                             </FormControl>
//                                             <FormDescription className="ml-2">
//                                                 Enter your password!
//                                             </FormDescription>
//                                         </div>
//                                     </div>
//                                     <FormMessage />
//                                 </FormItem>
//                             )}
//                         />
//                         <Button type="submit" className="w-[100px] mt-5 ml-8">
//                             Login
//                         </Button>
//                     </form>
//                 </Form>
//             </div>
//         </>
//   );
// }