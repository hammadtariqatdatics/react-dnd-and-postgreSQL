import React from "react";
import HeroBanner from "../components/hero/HeroBanner";
import { Container, Box, Grid } from "@mui/material";
import { Form, Formik } from "formik";
import userSchema from "../schemas/Validation";
import MuiButton from "../components/MuiButton";
import http from "../utils/Api";
import CustomTextFields from "../components/CustomTextFields";
import { useMutation } from "react-query";
import { ToastContainer, toast } from "react-toastify";

const CreateUser = () => {
  const postData = (payload) => http.post("/users/create", payload);
  const { isLoading, mutate } = useMutation(postData, {
    onSuccess: (successData) => {
      toast("User create succesfully...");
      console.log(successData);
    },
    onError: (Error) => {
      toast("User is not created...");
      console.log(Error);
    },
  });

  const handleSubmit = (payload) => {
    mutate(payload);
  };

  const initialValues = {
    name: "",
    email: "",
    phone: "",
    position: "",
  };

  return (
    <>
      <HeroBanner
        headingText="Create User"
        paraText="Here are the create user card form"
      />
      <Box sx={{ margin: "100px 0px" }}>
        <Container>
          <Formik
            initialValues={initialValues}
            validationSchema={userSchema}
            onSubmit={(values, { resetForm }) => {
              handleSubmit(values);
              resetForm({});
            }}
          >
            {({ values, handleSubmit, handleChange, handleBlur }) => (
              <Form onSubmit={handleSubmit}>
                <Grid container rowSpacing={5} columnSpacing={5}>
                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                    <CustomTextFields
                      variant="outlined"
                      label="Name"
                      color="secondary"
                      type="text"
                      placeholder="Your Name"
                      name="name"
                      value={values.name}
                      onChange={handleChange}
                      fullWidth="true"
                      onBlur={handleBlur}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                    <CustomTextFields
                      variant="outlined"
                      label="Email"
                      color="secondary"
                      type="email"
                      placeholder="Your Email"
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      fullWidth="true"
                      onBlur={handleBlur}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                    <CustomTextFields
                      variant="outlined"
                      label="phone"
                      color="secondary"
                      type="number"
                      placeholder="Your Phone"
                      name="phone"
                      value={values.phone}
                      onChange={handleChange}
                      fullWidth="true"
                      onBlur={handleBlur}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                    <CustomTextFields
                      variant="outlined"
                      label="Position"
                      color="secondary"
                      type="number"
                      placeholder="Your Index Position"
                      name="position"
                      value={values.position}
                      onChange={handleChange}
                      fullWidth="true"
                      onBlur={handleBlur}
                    />
                  </Grid>
                </Grid>
                <Box marginTop={6}>
                  <MuiButton
                    type="submit"
                    color="secondary"
                    variant="contained"
                    size="large"
                    disabled={isLoading}
                  >
                    Create User Card
                  </MuiButton>
                  <ToastContainer />
                </Box>
              </Form>
            )}
          </Formik>
        </Container>
      </Box>
    </>
  );
};

export default CreateUser;
