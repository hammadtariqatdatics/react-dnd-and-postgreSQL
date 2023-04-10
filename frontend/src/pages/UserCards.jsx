import React from "react";
import HeroBanner from "../components/hero/HeroBanner";
import { Box, Container } from "@mui/material";
import UserCard from "./UserCard";

const UserCards = () => {
  return (
    <>
      <HeroBanner
        headingText="User Cards"
        paraText="Here are the drag and drop user cards"
      />
      <Box sx={{ margin: "100px 0px" }}>
        <Container>
          <UserCard />
        </Container>
      </Box>
    </>
  );
};

export default UserCards;
