import React, { useState } from 'react';
import { MDBBtn, MDBContainer, MDBCard, MDBCardBody, MDBCardImage, MDBRow, MDBCol, MDBIcon, MDBInput } from 'mdb-react-ui-kit';
import { useAuth } from '../Components/Context/AuthContext'; 
import { signInWithFirebase } from '../Components/Authorization/Auth'; 
import { useNavigate } from 'react-router-dom';

function SignIn() {
  const { currentUser } = useAuth(); // Access the currentUser from the authentication context
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Initialize the navigate function from React Router

  // Function to handle form submission and sign in
  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      // Use the renamed signInWithFirebase function from your Auth.js file to sign in with email and password
      await signInWithFirebase(email, password);

      // Sign in was successful, currentUser will be updated automatically through your AuthProvider
      navigate('/'); // Redirect to the homepage
    } catch (error) {
      // Handle authentication errors
      setError(error.message);
    }
  };

  return (
    <MDBContainer className="my-5">
      <MDBCard>
        <MDBRow className='g-0'>
          <MDBCol md='6'>
            <MDBCardImage src='\imgs\ezgif.com-gif-maker.jpg' alt="login form" className='rounded-start w-100' />
          </MDBCol>
          <MDBCol md='6'>
            <MDBCardBody className='d-flex flex-column'>
              <div className='d-flex flex-row mt-2'>
                <MDBIcon fas icon="cubes fa-3x me-3" style={{ color: '#ff6219' }} />
                <span className="h1 fw-bold mb-0">G-Shop</span>
              </div>
              <h5 className="fw-normal my-4 pb-3" style={{ letterSpacing: '1px' }}>Sign into your account</h5>
              <form onSubmit={handleSignIn}>
                <MDBInput wrapperClass='mb-4' label='Email address' id='email' type='email' size="lg" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <MDBInput wrapperClass='mb-4' label='Password' id='password' type='password' size="lg" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <MDBBtn className="mb-4 px-5" color='dark' size='lg' type="submit">Login</MDBBtn>
              </form>
              {error && <div className="text-danger mb-3">{error}</div>}
              <p className="mb-5 pb-lg-2" style={{ color: '#393f81' }}>Don't have an account? <a href="/SignUp" style={{ color: '#393f81' }}>Register here</a></p>
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

export default SignIn;
