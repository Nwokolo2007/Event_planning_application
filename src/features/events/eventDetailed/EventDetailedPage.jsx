import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router";
import { Grid } from "semantic-ui-react";
import ErrorComponent from "../../../app/common/errors/ErrorComponent";
import { listenToEventFromFirestore } from "../../../app/firestore/firestoreService";
import useFirestoreDoc from "../../../app/hooks/useFirestoreDoc";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { listenToEvents } from "../eventActions";
import EventDetailedchat from "./EventDetailedChat";
import EventDetailedHeader from "./EventDetailedHeader";
import EventDetailedInfo from "./EventDetailedInfo";
import EventDetailedSideBar from "./EventDetailedSideBar";

export default function EventDetailedPage({ match }) {
  const event = useSelector((state) =>
    state.event.events.find((e) => e.id === match.params.id)
  );
  const dispatch = useDispatch();
  const { loading,error } = useSelector((state) => state.async);
  useFirestoreDoc({
    query: () => listenToEventFromFirestore(match.params.id),
    data: (event) => dispatch(listenToEvents([event])),
    deps: [match.params.id, dispatch],
  });

  if (loading || (!event && !error)) return <LoadingComponent content="Loading event..." />;
  if(error)return <Redirect to ='/error' />
  
  return (
    <Grid>
      <Grid.Column width={10}>
        <EventDetailedHeader event={event} />
        <EventDetailedInfo event={event} />
        <EventDetailedchat />
      </Grid.Column>

      <Grid.Column width={6}>
        <EventDetailedSideBar attendees={event?.attendees} />
      </Grid.Column>
    </Grid>
  );
}
