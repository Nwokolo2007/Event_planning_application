import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "semantic-ui-react";
import { openModal } from "../../app/common/modals/modalReducer";
import TestMap from "./TestMap";
import TestPlaceInput from "./TestPlaceInput";
import { decrement, increment } from "./testReducer";
export default function Sandbox() {
  const data = useSelector((state) => state.test.data);
  const dispatch = useDispatch();

  const defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33,
    },
    zoom: 11,
  };

  const { loading } = useSelector((state) => state.async);
  const [location, setLocation] = useState(defaultProps);
  const [target, setTarget] = useState(null);

  function handleSetLocation(latLng) {
    setLocation({ ...location, center: { lat: latLng.lat, lng: latLng.lng } });
  }
  return (
    <>
      <h1>Sanddbox</h1>
      <h3>the data is {data}</h3>
      <Button
        loading={loading && target === "increment"}
        onClick={(e) => {
          dispatch(increment(20));
          setTarget(e.target.name);
        }}
        content="increment"
        color="green"
        name="increment"
      />

      <Button
        loading={loading && target === "decrement"}
        onClick={(e) => {
          dispatch(decrement(10));
          setTarget(e.target.name);
        }}
        content="decrement"
        color="red"
        name="decrement"
      />
      <Button
        onClick={() =>
          dispatch(openModal({ modalType: "TestModal", modalProps: { data } }))
        }
        content="Open Modal"
        color="teal"
      />
      <div style={{ marginTop: 15 }}>
        <TestPlaceInput setLocation={handleSetLocation} />

        <TestMap location={location} />
      </div>
    </>
  );
}
