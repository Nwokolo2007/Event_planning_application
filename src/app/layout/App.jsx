import React, { useState } from "react";
import { Route, useLocation } from "react-router";
import { Container } from "semantic-ui-react";
import EventDashboard from "../../features/events/eventDashboard/EventDashboard";
import EventDetailedPage from "../../features/events/eventDetailed/EventDetailedPage";
import EventForm from "../../features/events/eventForm/EventForm";
import HomePage from "../../features/home/HomePage";
import NavBar from "../../features/nav/NavBar";
import Sandbox from "../../features/sandbox/Sandbox";
import ModalManager from "../common/modals/ModalManager";
import {ToastContainer} from 'react-toastify';
import ErrorComponent from "../common/errors/ErrorComponent";
import AccountPage from "../../features/Auth/AccountPage";
import { useSelector } from "react-redux";
import LoadingComponent from "./LoadingComponent";
import ProfilePage from "../../features/profiles/profilePage/ProfilePage";

function App() {

  const {key} =  useLocation();
  const [formOpen, setFormOpen] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null);
   const {initialized} = useSelector(state =>state.async);
  // function handleSelectedEvent(event) {
  //   setSelectedEvent(event);
  //   setFormOpen(true);
  // }

  function handleCreateFormOpen() {
    setSelectedEvent(null);
    setFormOpen(true);
  }

  if(!initialized) return <LoadingComponent  content = 'Loading app...'/>
  return (
    <>
      <Route exact path='/' component={HomePage} />
      <Route
        path= {'/(.+)'}
        render= {() => (
          <>
          <ModalManager />
          <ToastContainer position = 'bottom-right' hideProgressBar />
            <NavBar setFormOpen={handleCreateFormOpen} />
            <Container className='main'>
              <Route exact path='/events' component={EventDashboard} />
              <Route exact path='/sanbox' component={Sandbox} />
              <Route  path='/events/:id' component={EventDetailedPage} />
              <Route  path={['/createEvent','/manage/:id']} component={EventForm} key = {key}/>
              <Route  path='/error' component={ErrorComponent}/>
              <Route  path='/account' component={AccountPage}/>
              <Route  path='/profile/:id' component={ProfilePage}/>
              
            </Container>
          </>
        )}
      />
    </>
  );
}

export default App;
