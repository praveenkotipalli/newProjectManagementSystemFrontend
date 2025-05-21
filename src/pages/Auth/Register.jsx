import  { useState, useRef, useEffect } from 'react';
import './Register.css'; // Import your CSS file
// import { Link } from 'react-router-dom';
import BimoSpline from "../custom/BimoSpline"
import { useDispatch, useSelector } from 'react-redux';
import { register } from '@/Redux/Auth/Action';

const Register = () => {

  const dispatch = useDispatch();
  const { loading, error } = useSelector(state => state.auth);

  
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  // Validation states
  const [usernameError, setUsernameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const eyeRef = useRef(null);
  const beamRef = useRef(null);

  const validateUsername = (value) => {
    if (value.length < 3) {
      setUsernameError('Username must be at least 3 characters long');
      return false;
    }
    setUsernameError('');
    return true;
  };

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
    if (value.length < 6) {
      setPasswordError('Password must be at least 6 characters long');
      return false;
    }
    setPasswordError('');
    return true;
  };

  const handleUsernameChange = (event) => {
    const value = event.target.value;
    setUsername(value);
    validateUsername(value);
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

//   const handleConfirmPasswordChange = (event) => {
//     setConfirmPassword(event.target.value);
//   };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
    document.getElementById('password').type = showPassword ? 'text' : 'password';
  };

//   const toggleShowConfirmPassword = () => {
//     setShowConfirmPassword(!showConfirmPassword);
//     document.getElementById('confirmPassword').type = showConfirmPassword ? 'text' : 'password';
//   };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    // Validate all fields
    const isUsernameValid = validateUsername(username);
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);

    if (!isUsernameValid || !isEmailValid || !isPasswordValid) {
      return;
    }

    dispatch(
      register({
        fullname: username,
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

  return (
    <div className='flex'>
      <form onSubmit={handleSubmit} className="register-form">
      <h1 className="register-font">Register</h1>
      
      {isSuccess && (
        <div className="success-message">
          Registration successful! You can now login.
        </div>
      )}
      
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}
      
      <div className="form-item">
        <label htmlFor="username">Username</label>
        <input
        className={`register-input ${usernameError ? 'error' : ''}`}
          type="text"
          id="username"
          value={username}
          onChange={handleUsernameChange}
          autoComplete="off"
          // autocorrect="off"
          // autocapitalize="off"
          // spellcheck="false"
          data-lpignore="true"
          required
        />
        {usernameError && <div className="error-text">{usernameError}</div>}
      </div>
      <div className="form-item">
        <label htmlFor="email">Email</label>
        <input
        className={`register-input ${emailError ? 'error' : ''}`}
          type="email"
          id="email"
          value={email}
          onChange={handleEmailChange}
          autoComplete="off"
          // autocorrect="off"
          // autocapitalize="off"
          // spellcheck="false"
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
            // autocorrect="off"
            // autocapitalize="off"
            // spellcheck="false"
            data-lpignore="true"
            required
          />
          <button className='register-button' type="button" id="eyeball" ref={eyeRef}>
            <div className="eye"></div>
          </button>
          <div id="beam" ref={beamRef}></div>
        </div>
        {passwordError && <div className="error-text">{passwordError}</div>}
      </div>
      
      <button 
        className='register-button' 
        type="submit" 
        id="submit"
        // disabled={loading}
      >
        {loading ? 'Registering...' : 'Register'}
      </button>
      
    </form>
    {/* <BimoSpline/> */}
    </div>
  );
};

export default Register;