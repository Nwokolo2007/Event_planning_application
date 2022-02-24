import React from "react";
import { Dropdown, Image, Menu } from "semantic-ui-react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { toast } from "react-toastify";
import { signOutFirebase } from "../../app/firestore/firebaseService";

export default function SignedInMenu() {
  const dispatch = useDispatch();
  const history = useHistory();
  const {currentUser} = useSelector(state => state.auth);
  const {currentUserProfile} = useSelector(state => state.profile);

 async function handleSignOut()
  {
    try{
        await signOutFirebase();
        history.push('/')
    }
    catch(error)
    {
      toast.error(error);
    }

  }
  return (
    <Menu.Item position="right">
      <Image avatar spaced="right" src= {currentUserProfile.photoURL || '/assets/user.png'} />
      <Dropdown pointing="top left" text={currentUserProfile.displayName}>
        <Dropdown.Menu>
          <Dropdown.Item
            as={Link}
            to="/createEvent"
            text="Create Event"
            icon="plus"
          />
          <Dropdown.Item as ={Link} to ={`/profile/${currentUserProfile.id}`} text="My profile" icon="user" />
          <Dropdown.Item  as ={Link} to = '/account' text="My account" icon="settings" />
          <Dropdown.Item
            onClick={handleSignOut}
            text="Sign out"
            icon="power"
          />
        </Dropdown.Menu>
      </Dropdown>
    </Menu.Item>
  );
}
