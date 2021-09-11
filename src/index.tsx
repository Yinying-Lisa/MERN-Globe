import * as React from "react";
import { render } from "react-dom";
import ReactGlobe from "react-globe";
import { useState } from 'react';

import "tippy.js/dist/tippy.css";
import "tippy.js/animations/scale.css";

import markers from "./markers";
import markerRenderer from "./markerRenderer";
import Modal from "./Modal";
import Card from "./Card";
import Button from "./Button";

const options = {
  markerRenderer
  // cameraAutoRotateSpeed: 0
};

function App() {
  const [showMap, setShowMap] = useState(false);

  const openMapHandler = () => setShowMap(true);

  const closeMapHandler = () => setShowMap(false);

  return (
  <>
    <div className="App">
      <ReactGlobe
        height="100vh"
        globeTexture="https://raw.githubusercontent.com/chrisrzhou/react-globe/main/textures/globe_dark.jpg"
        markers={markers}
        onClickMarker={(marker) => {openMapHandler()}}
        width="100vw"
        options={options}
      />
    </div>
      <Modal
        show={showMap}
        onCancel={closeMapHandler}
        header={markers[0].city}
        contentClass="place-item__image"
        img = 'D:\Yinying\MCIT\MERN\MERN-Globe\src\nyc.PNG'
        // footerClass="place-item__modal-actions"
        // footer={<Button onClick={closeMapHandler}>CLOSE</Button>}
      > 
          {/* <div className="map-container">
          <Map center={props.coordinates} zoom={16} />
        </div>  */}
      </Modal>
      
      <li className="place-item">
      <Card className="place-item__content">
        <div className="place-item__image">
          {/* <img src={props.image} alt={props.title} /> */}
          
          <h1> Hi! </h1>
        </div>
        </Card>
      </li>
</>
  );
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);


