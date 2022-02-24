import { Grid } from "semantic-ui-react";
import EventForm from "../eventForm/EventForm";
import EventList from "./EventList";

import { useDispatch, useSelector } from "react-redux";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import EventListItemPlaceholder from "./EventListItemPlaceholder";
import EventFilters from "./EventFilters";
import React, { useEffect } from "react";
import {
  dataFromSnapshot,
  getEventsFromFirestore,
  listenToEventsFromFirestore,
} from "../../../app/firestore/firestoreService";
import { listenToEvents } from "../eventActions";
import { asyncActionError, asyncActionFinish, asyncActionStart } from "../../../app/async/asyncReducer";
import useFirestoreCollection from "../../../app/hooks/useFirestoreCollection";

export default function EventDashboard({
  formOpen,
  setFormOpen,
  selectedEvent,
  selectEvent,
}) {
  const dispatch = useDispatch();

  const { events } = useSelector((state) => state.event);
  const { loading } = useSelector((state) => state.async);

  function handleCreateEvent(event) {
    //setEvents([...events, event]); //spread the events and append the new event from event creation
  }

  function handleUpdatedEvent(updatedEvent) {
    // setEvents(
    //   events.map((evt) => (evt.id === updatedEvent.id ? updatedEvent : evt))
    // );
    selectEvent(null);
    setFormOpen(false);
  }

  function handleDeleteEvent(eventId) {
    //setEvents(events.filter(evt => evt.id !==eventId));
  }
  // if(loading) return <LoadingComponent/>

  return (
    <Grid>
      <Grid.Column width={10}>
        {loading && (
          <>
            <EventListItemPlaceholder />
            <EventListItemPlaceholder />
          </>
        )}
        <EventList
          events={events}
          selectEvent={selectEvent}
          deleteEvent={handleDeleteEvent}
        />
      </Grid.Column>

      <Grid.Column width={6}>
        <EventFilters />
      </Grid.Column>
    </Grid>
  );
}
