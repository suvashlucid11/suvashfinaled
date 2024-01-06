import React from 'react';

function Error({ message }) {
  const errorMessage = 'An error occurred!'; // Example error message

  return (
    <div>
      <div className="alert alert-danger" role="alert">
        {message}
        <h1></h1>
      </div>
    </div>
  );
}

export default Error;
