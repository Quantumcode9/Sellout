import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getSoundbars } from '../../api/soundbar';

const SoundbarIndex = () => {
  const [soundbars, setSoundbars] = useState([]);

  useEffect(() => {
    getSoundbars()
      .then(response => setSoundbars(response.data.soundbars))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <h1>Soundbars</h1>
      {soundbars.map(soundbar => (
        <div key={soundbar._id}>
          <h2><Link to={`/soundbars/${soundbar._id}`}>{soundbar.brand} {soundbar.modelNumber}</Link></h2>
          <p>Price: {soundbar.price}</p>
          <p>Channels: {soundbar.channels}</p>
          <p>Rating: {soundbar.rating}</p>
          <p>Dolby Atmos: {soundbar.dolbyAtmos ? 'Yes' : 'No'}</p>
        </div>
      ))}
    </div>
  );
};

export default SoundbarIndex;