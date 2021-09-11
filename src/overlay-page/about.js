import React from 'react';

import Button from './Button';
import Fade from './fade';

export default function About({ onHide, show }) {
  return (
    <Fade className="about" show={show}>
      <div className="about-content">
        <h2>About</h2>
        <Button label="Back" onClick={onHide} />
      </div>
    </Fade>
  );
}