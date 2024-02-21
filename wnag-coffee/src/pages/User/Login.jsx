import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const Login = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  Login.propTypes = {
    setLoggedIn: PropTypes.func.isRequired,
  };

  const navigate = useNavigate();

  const onButtonClick = () => {
    setEmailError('');
    setPasswordError('');

    // Check if the user has entered both fields correctly
    if ('' === email) {
      setEmailError('Please enter your email');
      return;
    }

    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setEmailError('Please enter a valid email');
      return;
    }

    if ('' === password) {
      setPasswordError('Please enter a password');
      return;
    }

    if (password.length < 7) {
      setPasswordError('The password must be 8 characters or longer');
      return;
    }
    props.setLoggedIn(true);
    navigate('/');
  };

  return (
    <div className='flex h-screen flex-col items-center justify-center'>
      <div className='text-4xl font-bold'>
        <div>Login</div>
      </div>
      <br />
      <div className='items-start'>
        <input
          value={email}
          placeholder='Enter your email here'
          onChange={(ev) => setEmail(ev.target.value)}
          className='font-4xl h-10 w-96 rounded-lg border-2 border-grey'
        />
        <label className='text-red text-xs'>{emailError}</label>
      </div>
      <br />
      <div className='items-start'>
        <input
          value={password}
          placeholder='Enter your password here'
          onChange={(ev) => setPassword(ev.target.value)}
          className='font-4xl h-10 w-96 rounded-lg border-2 border-grey'
        />
        <label className='text-red text-xs'>{passwordError}</label>
      </div>
      <br />
      <div className='items-start'>
        <input
          className='m-2 cursor-pointer rounded-lg border-none bg-crimson px-6 py-3 text-2xl text-black'
          type='button'
          onClick={onButtonClick}
          value='Log in'
        />
      </div>
    </div>
  );
};
export default Login;
