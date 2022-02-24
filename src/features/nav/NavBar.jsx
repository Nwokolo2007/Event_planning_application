import React, { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { Button, Container, Menu } from "semantic-ui-react";
import SignedInMenu from "./SignedInMenu";
import SignedOutMenu from "./SignedOutMenu";

export default function NavBar({ setFormOpen }) {

 const {authenticated} =  useSelector (state => state.auth);

 
  return (
    <Menu inverted fixed="top">
      <Container>
        <Menu.Item exact header as={NavLink} to="/">
          <img src="/assets/logo.png" alt="logo" style={{ marginRight: 15 }} />
          Re-events
        </Menu.Item>
        <Menu.Item name="Events" as={NavLink} to="/events" />
        <Menu.Item name="Sandbox" as={NavLink} to="/sanbox" />
        { authenticated &&
        <Menu.Item as={NavLink} to="/CreateEvent">
          <Button positive inverted content="Create Event" />
        </Menu.Item> }
        {authenticated ? <SignedInMenu />: <SignedOutMenu /> }
      </Container>
    </Menu>
  );
}
