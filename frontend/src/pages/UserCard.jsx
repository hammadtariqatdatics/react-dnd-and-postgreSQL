import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import http from "../utils/Api";

const UserCard = () => {
  const [cards, setCards] = useState([]);

  const fetchCards = async () => {
    try {
      const response = await http.get("/users");
      setCards(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCards();
  }, []);

  const handleCardDragEnd = async (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const updatedCards = Array.from(cards);
    const [removed] = updatedCards.splice(source.index, 1);
    updatedCards.splice(destination.index, 0, removed);

    try {
      await http.put(`/users/${draggableId}`, {
        position: destination.index,
      });
      setCards(updatedCards);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <DragDropContext onDragEnd={handleCardDragEnd}>
      <Droppable droppableId="UserCard">
        {(provided, snapshot) => (
          <Box {...provided.droppableProps} ref={provided.innerRef}>
            {cards?.map((card, index) => (
              <Draggable
                key={card.id}
                draggableId={card.id.toString()}
                index={index}
              >
                {(provided, snapshot) => (
                  <Card
                    sx={{ minWidth: 150, margin: "10px" }}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <CardContent>
                      <Typography
                        sx={{ fontSize: 14, mb: 1.5 }}
                        color="text.secondary"
                        gutterBottom
                      >
                        Name = {card.name}
                      </Typography>
                      <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        Email = {card.email}
                      </Typography>
                      <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        Phone = {card.phone}
                      </Typography>
                      <Typography variant="body2">
                        Index # {card.position}
                      </Typography>
                    </CardContent>
                  </Card>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </Box>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default UserCard;
