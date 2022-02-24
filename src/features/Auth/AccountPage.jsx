import { Form, Formik } from "formik";
import MyTextInput from "../../app/common/form/MyTextInput";

import React from "react";
import * as Yup from "yup";
import { Segment, Header, Button, Label } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { updateUserPassword } from "../../app/firestore/firebaseService";

export default function AccountPage() {
  const { currentUser } = useSelector((state) => state.auth);

  return (
    <Segment>
      {currentUser.providerId === "password" && (
        <>
          <Header dividing size="large" content="Account" />
          <p>Use this form to change your password</p>

          <Formik
            initialValues={{ newpassword1: "", newpassword2: "" }}
            validationSchema={Yup.object({
              newpassword1: Yup.string().required("Password is required"),
              newpassword2: Yup.string().oneOf(
                [Yup.ref("newPassword1"), null],
                "Password do not match"
              ),
            })}
            onSubmit={async(values,{setSubmitting,setErrors}) => {
             

                try{

                    await updateUserPassword(values);
                    setSubmitting(false);
                }
                catch(error){
                    setErrors({auth:error.message});
                    setSubmitting(false);
                }
                
            }}
          >
            {({ errors, isSubmitting, isValid, dirty }) => (
              <Form className="ui form">
                <MyTextInput
                  name="newPassword1"
                  type="password"
                  placeholder="New Password"
                />

                <MyTextInput
                  name="newPassword2"
                  type="password"
                  placeholder="Confirm Password"
                />
                {errors.auth && (
                  <Label
                    basic
                    color="red"
                    style={{ marginBottom: 10 }}
                    content={errors.auth}
                  />
                )}
                <Button
                syle ={{display:'block'}}
                loading = {isSubmitting}
                  type="submit"
                  disabled={!isValid || isSubmitting || !dirty}
                  size="large"
                  positive
                  content="Update password"
                />
              </Form>
            )}
          </Formik>
        </>
      )}

      {currentUser.providerId === "facebook.com" && (
        <>
          <Header color="teal" sub content="Facebook account" />

          <p>Please visit Facebook to update your account</p>
          <Button
            icon="facebook"
            color="facebook"
            as={Link}
            to="https://facebook.com"
            content="Go to Facebook"
          />
        </>
      )}
      {currentUser.providerId === "google.com" && (
        <>
          <Header color="teal" sub content="Google account" />

          <p>Please visit Google to update your account</p>
          <Button
            icon="google"
            color="google plus"
            as={Link}
            to="https://google.com"
            content="Go to Google"
          />
        </>
      )}
    </Segment>
  );
}
