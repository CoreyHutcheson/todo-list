import React, { useState, useEffect, useCallback } from "react";
import firebase from "./firebase.js";
import {
  Container,
  Row,
  Col,
  InputGroup,
  Input,
  InputGroupAddon,
  Button,
  ListGroup,
  ListGroupItem
} from "reactstrap";

export const Todo = () => {
  const [newListItem, setNewListItem] = useState("");
  const [items, setItems] = useState([]);

  const handleAddItem = useCallback(() => {
    if (!newListItem) return;

    const itemsRef = firebase.database().ref("list-items");

    const item = {
      text: newListItem,
      completed: false
    };

    itemsRef.push(item);

    setNewListItem("");
  }, [newListItem]);

  const handleDeleteItem = (itemId, e) => {
    e.stopPropagation();
    const itemRef = firebase.database().ref(`/list-items/${itemId}`);
    itemRef.remove();
  };

  const handleCompletedToggle = itemId => {
    const itemRef = firebase.database().ref(`/list-items/${itemId}/completed`);
    itemRef.once("value").then(snapshot => {
      itemRef.set(!snapshot.val());
    });
  };

  useEffect(() => {
    const itemsRef = firebase.database().ref("list-items");

    itemsRef.on("value", snapshot => {
      let listItems = snapshot.val();
      let newState = [];

      for (let item in listItems) {
        newState.push({
          id: item,
          text: listItems[item].text,
          completed: listItems[item].completed
        });
      }

      setItems(newState);
    });
  }, []);

  // Setup keydown event listener
  useEffect(() => {
    const handler = e => {
      if (e.keyCode === 13) {
        handleAddItem();
      }
    };

    document.addEventListener("keypress", handler);

    return () => document.removeEventListener("keypress", handler);
  }, [handleAddItem]);

  return (
    <Container fluid>
      <Row className="header">
        <Col md={{ size: 8, offset: 2 }} lg={{ size: 6, offset: 3 }}>
          <header>
            <h1>Todoist</h1>
          </header>
        </Col>
      </Row>

      <Row className="input">
        <Col md={{ size: 8, offset: 2 }} lg={{ size: 6, offset: 3 }}>
          <InputGroup>
            <Input
              autoFocus
              value={newListItem}
              onChange={e => setNewListItem(e.target.value)}
            />
            <InputGroupAddon addonType="append">
              <Button onClick={handleAddItem}>Add List Item</Button>
            </InputGroupAddon>
          </InputGroup>
        </Col>
      </Row>

      <Row className="list-items">
        <Col md={{ size: 8, offset: 2 }} lg={{ size: 6, offset: 3 }}>
          <ListGroup>
            {items.map(item => (
              <ListGroupItem
                key={item.id}
                className="justify-content-between item"
                onClick={() => handleCompletedToggle(item.id)}
              >
                <span
                  className={`checkmark ${
                    item.completed ? "checkmark--completed" : undefined
                  }`}
                >
                  &#10004;
                </span>

                <span className={item.completed ? "completed" : undefined}>
                  {item.text}
                </span>

                <Button close onClick={e => handleDeleteItem(item.id, e)} />
              </ListGroupItem>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};
