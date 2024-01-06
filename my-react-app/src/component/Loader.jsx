import React from 'react';

function Loader({ loading }) {
  return (
    <div className='sweet-loading text-center'>
      {loading && <p>Loading...</p>}
    </div>
  );
}

export default Loader;
