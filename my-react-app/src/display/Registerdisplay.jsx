import React, { useState } from 'react';
import axios from 'axios';
import Loader from '../component/Loader';
import Error from '../component/Error';
import Success from '../component/Success';

function Registerdisplay() {
  const [name, setname] = useState('');
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [cpassword, setcpassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  async function register() {
    if (password === cpassword) {
      const user = { name, email, password, cpassword };
      try {
        setLoading(true);
        const result = await axios.post('api/users/register', user).data;
        setLoading(false);
        setSuccess(true);
       
        setname('')
        setemail('')
        setpassword('')
        setcpassword('')
      } catch (error) {
        setLoading(false);
        setError(true);

      }
    } else {
      alert('Passwords do not match');
    }
  }

  // Function to reset success state after a certain duration
  const resetSuccess = () => {
    setSuccess(false);
  };

  return (
    <div>
      {loading && (<Loader />)}
{error&&(<Error/>)}


      <div className="row justify-content-center mt-5">
        <div className="col-md-5 mt-5 ">
                  {success && (<Success message="Successfully registered let's Login" />)}
          <div className="bs">
            <h2> Register </h2>
            <input type="text" className="form-control" placeholder="name" value={name} onChange={(e) => setname(e.target.value)} />
            <input type="email" className="form-control" placeholder="email" value={email} onChange={(e) => setemail(e.target.value)} />
            <input type="password" className="form-control" placeholder="password" value={password} onChange={(e) => setpassword(e.target.value)} />
            <input type="password" className="form-control" placeholder="confirm password" value={cpassword} onChange={(e) => setcpassword(e.target.value)} />
            <button className="btn btn-primary" onClick={register}>
              Register
            </button>
          </div>
        </div>
      </div>
      {/* Reset success state after a certain duration or user action */}
{/* Reset success state after 5 seconds */}
    </div>
  );
}

export default Registerdisplay;
