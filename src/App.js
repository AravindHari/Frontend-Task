import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import axios from "axios";
import "./App.css";

const App = () => {
  const [cardData, setCardData] = useState([]);
  const [visible, setVisible] = useState(5);

  const allCardData = async () => {
    const response = await axios.get("https://randomuser.me/api/?results=35");
    setCardData(response.data.results);
  };

  const loadMore = () => {
    setVisible(visible + 5);
  };

  const more = () => {
    <Card.Text>
            <ul>
              <li>{cardData.email}</li>
              <li>{cardData.cell}</li>
              <li>{cardData.gender}</li>
            </ul>
          </Card.Text>
  };

  useEffect(() => {
    allCardData();
  }, []);

  const renderCard = (person, index) => {
    return (
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src={person.picture.large} />
        <Card.Body>
          <Card.Title>
            {person.name.first} {person.name.last}
          </Card.Title>
          <button onClick={more}>Fetch Details</button>
        </Card.Body>
      </Card>
    );
  };

  return (
    <div className="App">
      <div className="wrapper">
        <div className="cards">
          {cardData.slice(0, visible).map(renderCard)}
        </div>
      </div>
      {visible < cardData.length && (
        <button onClick={loadMore}>Load 5 More</button>
      )}
    </div>
  );
};

export default App;