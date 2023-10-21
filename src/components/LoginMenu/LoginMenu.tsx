import { signInWithGoogle } from '@utils/firebase-auth';
import './LoginMenu.css';

const Login = () => {
  return (
    <div
      className='flex py-3 px-3 items-center gap-3 rounded-md hover:bg-gray-500/10 transition-colors duration-200 text-white cursor-pointer text-sm'
      style={{ alignItems: 'center', flexDirection: 'column', display: 'flex' }}
    >
      Sign in with one of the following to gain access to GPT-4
      <br />
      <br />
      <button className='login-with-google-btn' onClick={signInWithGoogle}>
        <i className='fab fa-google' /> Sign in with Google
      </button>
    </div>
  );
};

export default Login;
