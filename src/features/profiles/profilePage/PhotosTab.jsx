import React, { useState } from "react";
import { useStore } from "react-redux";
import { Button, Card, Grid, Header, Image, Tab } from "semantic-ui-react";
import { format } from "date-fns";
import ProfileForm from "./profileForm";
import PhotoUploadWidget from "../../../app/common/photos/PhotoUploadWidget";
export default function PhotosTab({ profile, isCurrentUser }) {
  const [editMode, setEditMode] = useState(true);
  return (
    <Tab.Pane>
      <Grid>
        <Grid.Column width={16}>
          <Header floated="left" icon="user" content={`Photos`} />
          {!isCurrentUser && (
            <Button
              onClick={() => setEditMode(!editMode)}
              floated="right"
              basic
              content={editMode ? "Cancel" : "Add Photo"}
            />
          )}
        </Grid.Column>
        <Grid.Column width={16}>
          {editMode ? (
           <PhotoUploadWidget setEditMode ={setEditMode} />
          ) : (
            <Card.Group itemsPerRow = {5}>
              <Card>

                  <Image src = {'/assets/user.png'} />
                  <Button.Group fluid width ={2}>
                      <Button basic color ='green' content = 'Main' />
                      <Button basic color ='red' icon = 'trash' />

                  </Button.Group>
              </Card>
            </Card.Group>
          )}
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
}
