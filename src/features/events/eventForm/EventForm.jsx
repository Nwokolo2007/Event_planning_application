/* global google */
import React, { useState } from "react";
import { Segment, Header, Button, FormField, Label, Confirm } from "semantic-ui-react";
import cuid from "cuid";
import { Link, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createEvent, listenToEvents, updateEvent } from "../eventActions";
import { Form, Field, Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import MyTextInput from "../../../app/common/form/MyTextInput";
import MyTextArea from "../../../app/common/form/MyTextArea";
import MySelectInput from "../../../app/common/form/MySelectInput";
import { categoryData } from "../../../app/api/categoryOptions";
import MyDateInput from "../../../app/common/form/MyDateInput";
import MyPlaceInput from "../../../app/common/form/MyPlaceInput";
import useFirestoreDoc from "../../../app/hooks/useFirestoreDoc";
import {
  addEventToFirestore,
  cancelEventToggle,
  listenToEventFromFirestore,
  updateEventInFirestore,
} from "../../../app/firestore/firestoreService";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { toast } from "react-toastify";
export default function EventForm({ match, history }) {
  const selectedEvent = useSelector((state) =>
    state.event.events.find((e) => e.id === match.params.id)
  );
  const dispatch = useDispatch();
  const [loadingCancel, setLoadingCancel] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const { loading, error } = useSelector((state) => state.async);
  const initialValues = selectedEvent ?? {
    title: "",
    category: "",
    description: "",
    city: {
      address: "",
      latLng: null,
    },
    venue: {
      address: "",
      latLng: null,
    },
    date: "",
  };

  const validationSchema = Yup.object({
    title: Yup.string().required("You must provide a title"),
    category: Yup.string().required("You must provide a category"),
    description: Yup.string().required("You must provide a description"),
    city: Yup.object().shape({
      address: Yup.string().required("You must provide a city"),
    }),
    venue: Yup.object().shape({
      address: Yup.string().required("You must provide a venue"),
    }),
    date: Yup.string().required("You must provide a date"),
  });

  async function handleCancelToggle(event) {
    setConfirmOpen(false);
    setLoadingCancel(true);
    try {
      await cancelEventToggle(event);
      setLoadingCancel(false);
    } catch (error) {
      setLoadingCancel(true);
      toast.error(error.message);
    }
  }

  useFirestoreDoc({
    shouldExecute: !!match.params.id,
    query: () => listenToEventFromFirestore(match.params.id),
    data: (event) => dispatch(listenToEvents([event])),
    deps: [match.params.id, dispatch],
  });

  if (loading) return <LoadingComponent content="Loading event..." />;
  if (error) return <Redirect to="/error" />;

  // function handleInputChange(e) {
  //   const { name, value } = e.target;
  //   setValues({ ...values, [name]: value }); // spread values and search for a value in values with name corresponding to name and assign value to it
  // }
  // function handleFormSubmit() {
  //   selectedEvent
  //     ? dispatch(updateEvent({ ...selectedEvent, ...values }))
  //     : dispatch(
  //         createEvent({
  //           ...values,
  //           id: cuid(),
  //           hostedby: "Bob",
  //           attendees: [],
  //           hostPhotoURL: "",
  //         })
  //       );

  //   history.push("/events");
  // }
  return (
    <Segment clearing>
      <Header
        content={selectedEvent ? "Edit the event" : "Create a new Event"}
      />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            selectedEvent
              ? await updateEventInFirestore(values)
              : await addEventToFirestore(values);

            history.push("/events");
          } catch (error) {
            toast.error(error.message);
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting, dirty, isValid, values }) => (
          <Form className="ui form">
            <Header content="Event Details" sub color="teal" />
            <MyTextInput name="title" placeholder="Event title" />
            <MySelectInput
              name="category"
              placeholder="Event Category"
              options={categoryData}
            />
            <MyTextArea
              rows={3}
              name="description"
              placeholder="Event Description"
            />
            <Header content="Event Location Details" sub color="teal" />
            <MyPlaceInput name="city" placeholder="Event City" />
            <MyPlaceInput
              name="venue"
              disabled={!values.city.latLng}
              placeholder="Event Venue"
              options={{
                location: new google.maps.LatLng(values.city.latLng),

                radius: 1000,
                types: ["establishment"],
              }}
            />
            <MyDateInput
              name="date"
              placeholderText="Event Date"
              timeFormat="HH:mm"
              showTimeSelect
              timeCapiton="time"
              dateFormat="MMMM d,yyyy h:mm a"
            />
            {selectedEvent && (
              <Button
                loading={loadingCancel}
                type="button"
                floated="left"
                color={selectedEvent.isCancelled ? "green" : "red"}
                content={
                  selectedEvent.isCancelled ? "Reactive event" : "Cancel event"
                }
                onClick={() => setConfirmOpen(true)}
              />
            )}
            <Button
              loading={isSubmitting}
              disabled={!isValid || !dirty || isSubmitting}
              type="submit"
              floated="right"
              positive
              content="Submit"
            />
            <Button
              as={Link}
              to="/events"
              type="submit"
              floated="right"
              content="Cancel"
            />
          </Form>
        )}
      </Formik>
      <Confirm 
        content = {selectedEvent?.isCancelled ? 'This will reactivate the event - are you sure?' :
       'This will cancel the event - are you sure?'
      }
      open = {confirmOpen}
      onCancel = {() => setConfirmOpen(false)}
      onConfirm ={() => handleCancelToggle(selectedEvent)}
      />
    </Segment>
  );
}
