import React, { useState } from 'react';
import { MDBBtn, MDBContainer, MDBCard, MDBCardBody, MDBCardImage, MDBRow, MDBCol, MDBIcon, MDBInput } from 'mdb-react-ui-kit';
import { useAuth } from '../Components/Context/AuthContext'; 
import { signUp } from '../Components/Authorization/Auth'; 
import { useNavigate } from 'react-router-dom';

function SignUp() {
  const { currentUser } = useAuth();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      await signUp(email, password);
      navigate('/'); // Redirect to the homepage after successful registration
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <MDBContainer className="my-5">
      <MDBCard>
        <MDBRow className='g-0'>
          <MDBCol md='6'>
            <MDBCardImage src='\imgs\ezgif.com-gif-maker.jpg' alt="registration form" className='rounded-start w-100' />
          </MDBCol>
          <MDBCol md='6'>
            <MDBCardBody className='d-flex flex-column'>
              <div className='d-flex flex-row mt-2'>
                <MDBIcon fas icon="cubes fa-3x me-3" style={{ color: '#ff6219' }} />
                <span className="h1 fw-bold mb-0">G-Shop</span>
              </div>
              <h5 className="fw-normal my-4 pb-3" style={{ letterSpacing: '1px' }}>Create an account</h5>
              <form onSubmit={handleSignUp}>
                <MDBInput wrapperClass='mb-4' label='Username' id='username' size="lg" value={username} onChange={(e) => setUsername(e.target.value)} required />
                <MDBInput wrapperClass='mb-4' label='Email address' id='email' type='email' size="lg" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <MDBInput wrapperClass='mb-4' label='Password' id='password' type='password' size="lg" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <MDBInput wrapperClass='mb-4' label='Confirm password' id='confirmPassword' type='password' size="lg" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                <MDBBtn className="mb-4 px-5" color='dark' size='lg' type="submit">Sign up</MDBBtn>
              </form>
              {error && <div className="text-danger mb-3">{error}</div>}
              <p className="mb-5 pb-lg-2" style={{ color: '#393f81' }}>Already have an account? <a href="/SignIn" style={{ color: '#393f81' }}>Sign in here</a></p>
              <div className='d-flex flex-row justify-content-start'>
                <a href="#!" className="small text-muted me-1">Terms of use</a>
              </div>
              <div className='d-flex flex-row justify-content-start'>
                <a href="#!" className="small text-muted">Privacy policy</a>
              </div>
            </MDBCardBody>
          </MDBCol>
        </MDBRow>
      </MDBCard>
    </MDBContainer>
  );
}

export default SignUp;
