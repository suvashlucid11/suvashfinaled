import React, { useState } from 'react';
import axios from 'axios';
import Loader from '../component/Loader';
import Error from '../component/Error';

function Logindisplay() {
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState(false);

  async function login() {
    const user = { email, password };

    try {
      setLoading(true);
      const result = (await axios.post('/api/users/login', user)).data;
      console.log(result)
      setLoading(false);
      console.log(result)
      console.log(result)
      console.log(result)
      console.log(result)
      console.log(result)
      localStorage.setItem('currentUser', JSON.stringify(result));
      window.location.href = '/home';
      debugger;
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(true);
    }
  }

  return (
    <div>
      {loading && <Loader />}
      <div className="row justify-content-center mt-5">
        <div className="col-md-5 mt-5">
          {error && <Error message="Invalid data" />}
          <div className="bs">
            <h2>Login</h2>
            <input
              type="text"
              className="form-control"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              className="form-control"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="btn btn-primary mt-3" onClick={login}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Logindisplay;
