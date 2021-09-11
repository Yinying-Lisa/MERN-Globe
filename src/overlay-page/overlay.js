import React, { useState } from 'react';

// import { useStateValue } from './state';
import About from './about';
import Button from './Button';
import Fade from './fade';
import Modal from '../Modal';
import { ImageBitmapLoader } from 'three';
import ImageUpload from '../ImageUpload';
// import Link from './link';

export default function Overlay() {
  // const [
  //   { focusedMarker, start },
  //   dispatch,
  // ] = useStateValue();
  const [showAbout, setShowAbout] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showMap, setShowMap] = useState(false);

  const openMapHandler = () => setShowMap(true);

  const closeMapHandler = () => setShowModal(false);


  const showOverlay = !showAbout;

  return (
    <>
      {/* <About onHide={() => setShowAbout(false)} show={showAbout} /> */}
      <Fade className="overlay" show={showOverlay}>
        <div className="header">
          <div>
            <h2>Cloud Gazer</h2>
            <div className="overlay-subtitle">
              <About />
            </div>
          </div>
          <div>
            <Button className="nudge-right" label = "Add Image" onClick={() => setShowModal(true)}>
              About
            </Button>
            {/* <Link link="GITHUB_REPO">Github</Link> */}
          </div>
        </div>

        <Modal
        show={showModal}
        onCancel={closeMapHandler}
        header={<h3> Upload an image of cloud </h3>}
        contentClass="place-item__image"
        footerClass="place-item__modal-actions"
        footer={<ImageUpload />}
      > 
          {/* <div className="map-container">
          <Map center={props.coordinates} zoom={16} />
        </div>  */}
      </Modal>


        {/* <div className="content">
          TOP 5 SEARCHING CITIES
          {markers.slice(0, 5).map((marker) => (
            <Link key={marker.city}>
              <h2 onClick={() => dispatch({ type: 'FOCUS', payload: marker })}>
                {marker.city} ({marker.value})
              </h2>
            </Link>
          ))}
        </div>
        <div className="footer">
          Updated on {moment(lastUpdated).format('MMM D, YYYY')}
        </div> */}
      </Fade>
    </>
  );
}