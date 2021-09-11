import * as React from "react";
import { render } from "react-dom";
import ReactGlobe from "react-globe";
import { useState } from 'react';
import Overlay from './overlay-page/overlay';

import "tippy.js/dist/tippy.css";
import "tippy.js/animations/scale.css";
import "./index.css";

import markers from "./markers";
import markerRenderer from "./markerRenderer";
import Modal from "./Modal";
import Card from "./Card";
import Button from "./overlay-page/Button";

const options = {
  markerRenderer
  // cameraAutoRotateSpeed: 0
};

function App() {
  const [showMap, setShowMap] = useState(false);

  const openMapHandler = () => setShowMap(true);

  var id = "0";
  const [showID, setID] = useState(id)

  const closeMapHandler = () => setShowMap(false);

 

  return (
  <>
    <div className="App">
      <>
      <Overlay />
      <ReactGlobe
        height="100vh"
        globeTexture="https://raw.githubusercontent.com/chrisrzhou/react-globe/main/textures/globe_dark.jpg"
        markers={markers}
        onClickMarker={(marker) => {console.log(markers[2], Number(marker.id)); setID(marker.id); console.log(id); openMapHandler()}}
        width="100vw"
        options={options}
      />
      
      </>
    </div>
    
      <Modal
        show={showMap}
        onCancel={closeMapHandler}
        header={markers[Number(showID)].city}
        contentClass="place-item__image"
        img = {markers[Number(showID)].url}
        footerClass="place-item__modal-actions"
        hasImage={true}
        // footer={<Button onClick={closeMapHandler}>CLOSE</Button>}
      > 
          {/* <div className="map-container">
          <Map center={props.coordinates} zoom={16} />
        </div>  */}
      </Modal>
      
      {/* <li className="place-item">
      <Card className="place-item__content">
        <div className="place-item__image">
          <img src={props.image} alt={props.title} />
          
          <h1> Hi! </h1>
        </div>
        </Card>
      </li> */}
</>
  );
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);


