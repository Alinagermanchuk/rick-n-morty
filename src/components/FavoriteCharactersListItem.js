import { Card, Col, Container, Row } from "react-bootstrap";
import { Trash } from "react-bootstrap-icons";
import styled from "styled-components";
import NotFoundImage from "../assets/not-found-image.jpg";
import { getStatusColor } from "../services";

const CategoryTitle = styled.h6`
  color: #898989;
  margin: 5px 0;
`;

const CategoryContent = styled.p`
  font-size: 18px;
  margin: 0;
`;

export function FavoriteCharactersListItem({
  character,
  removeFavoriteCharacterHandler,
}) {
  const { name, status, species, gender, location, image } = character;

  function onClickHandler() {
    removeFavoriteCharacterHandler(character.id);
  }

  return (
    <Card style={{ backgroundColor: "#f0f0f0", borderRadius: "15px" }}>
      <Row sm={1} md={2}>
        <Col md={5}>
          <Card.Img
            style={{ borderRadius: "15px 0 0 15px" }}
            variant="top"
            src={image || NotFoundImage}
          />
        </Col>
        <Col md={7}>
          <Card.Body
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: "100%",
            }}
          >
            <Container
              style={{
                padding: 0,
                display: "flex",
                justifyContent: "space-between",
                alignContent: "center",
              }}
            >
              <h3
                style={{
                  color: "#646464",
                  margin: 0,
                }}
              >
                {name}
              </h3>
              <div style={{ paddingTop: "3px" }}>
                <Trash
                  className="favoriteItem-icon"
                  style={{ cursor: "pointer" }}
                  onClick={onClickHandler}
                />
              </div>
            </Container>

            <Container
              style={{
                display: "flex",
                alignItems: "center",
                color: "#646464",
                padding: 0,
              }}
            >
              <div
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: 50,
                  marginRight: "5px",
                  backgroundColor: getStatusColor(status),
                }}
              />
              <Card.Text>
                {status} - {species}
              </Card.Text>
            </Container>

            <Container className="p-0">
              <CategoryTitle>Gender:</CategoryTitle>
              <CategoryContent>{gender}</CategoryContent>
            </Container>

            <Container className="p-0">
              <CategoryTitle>Last known location:</CategoryTitle>
              <CategoryContent>{location.name}</CategoryContent>
            </Container>
          </Card.Body>
        </Col>
      </Row>
    </Card>
  );
}
