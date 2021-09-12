import React, { useRef, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import Button from './overlay-page/Button';
import './ImageUpload.css';
import { useForm } from './hooks/form-hook';
import { useHttpClient } from './hooks/http-hook';
import markers from './markers';
import Globe from 'react-globe';

const ImageUpload = props => {

  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [file, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  const [isValid, setIsValid] = useState(false);
  const history = useHistory();

  const filePickerRef = useRef();

  const [formState, inputHandler] = useForm(
    {
      title: {
        value: '',
        isValid: false
      },
      image: {
        value: null,
        isValid: false
      }
    },
    false
  );

  const placeSubmitHandler = async event => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append('title', formState.inputs.title.value);
      formData.append('image', formState.inputs.image.value);
      console.log(formData);
      await sendRequest('http://localhost:5000/api/places', 'POST', formData, {
        Authorization: 'Bearer '
      });
      history.push('/');
    } catch (err) {}
  };

  useEffect(() => {
    if (!file) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }, [file]);

  const pickedHandler = event => {
    let pickedFile;
    let fileIsValid = isValid;
    if (event.target.files && event.target.files.length === 1) {
      pickedFile = event.target.files[0];
      setFile(pickedFile);
      setIsValid(true);
      fileIsValid = true;
    } else {
      setIsValid(false);
      fileIsValid = false;
    }
    inputHandler(props.id, pickedFile, fileIsValid);
  };

  const pickImageHandler = () => {
    filePickerRef.current.click();
  };


  const [initial_markers, setMarker] = useState(false);
  const markerHandler = async event => {
    event.preventDefault();
    markers.push({
    id: "6",
    city: "Seattle",
    color: "gold",
    url: "https://i.redd.it/5dfgxojrzvm71.jpg",
    coordinates: [47.6062, -122.3321],
    value: 200
    })
    console.log(markers)

    // dispatch({ type: 'FOCUS', payload: markers[6] })
    setMarker(true);
  };



  return (
    <>
    <form className="place-form" onSubmit={markerHandler}>
    <div className="form-control">
      <p>Please enter your location: </p>
      <input
          id="title"
          element="input"
          type="text"
          label="Please enter your location: "
          errorText="Please enter a valid title."
          onInput={inputHandler}
        />
      <input
        id={props.id}
        ref={filePickerRef}
        style={{ display: 'none' }}
        type="file"
        accept=".jpg,.png,.jpeg"
        // onChange={pickedHandler}
      />
      <div className={`image-upload ${props.center && 'center'}`}>
        <div className="image-upload__preview">
          {previewUrl && <img src={previewUrl} alt="Preview" />}
          {!previewUrl && <p>Please pick an image.</p>}
        </div>
        <Button className='image-upload__button' type="button" label="Pick Image" onClick={pickImageHandler}>
          PICK IMAGE
        </Button>
      </div>
      {!isValid && <p>{props.errorText}</p>}
      <Button type="submit" label="Add your image">
          ADD PLACE
        </Button>
    </div>
    
    </form>
    </>
  );
};

export default ImageUpload;
