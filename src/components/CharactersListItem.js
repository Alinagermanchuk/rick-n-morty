import { Card, Col, ListGroup, ListGroupItem, Row } from "react-bootstrap";
import { Heart } from "react-bootstrap-icons";
import { HeartFill } from "react-bootstrap-icons";
import { useSigninCheck } from "reactfire";
import styled from "styled-components";
import NotFoundImage from "../assets/not-found-image.jpg";
import { getStatusColor } from "../services";

const TitleSpan = styled.span`
  color: #7a7d80;
`;

export function CharactersListItem({
  image,
  name,
  status,
  species,
  gender,
  id,
  isFavorite,
  addFavoriteCharacterHandler,
  removeFavoriteCharacterHandler,
}) {
  const { data, status: signInStatus } = useSigninCheck();
  const isLoggedIn = signInStatus === "success" && data?.signedIn;

  function favoriteCharacterHandler() {
    if (isFavorite) {
      removeFavoriteCharacterHandler(id);
    } else {
      addFavoriteCharacterHandler(id);
    }
  }

  return (
    <Card style={{ width: "" }}>
      <Card.Img
        style={{ height: 230 }}
        variant="top"
        src={image || NotFoundImage}
      />
      <Card.Body className="d-flex justify-content-sm-between align-items-center">
        <Col xs={10}>
          <Card.Title className="m-0">{name}</Card.Title>
        </Col>
        <Col xs={1} />
        <Col xs={1}>
          {isLoggedIn && !isFavorite && (
            <Heart
              style={{
                cursor: "pointer",
                fill: "#000",
              }}
              onClick={favoriteCharacterHandler}
            />
          )}
          {isLoggedIn && isFavorite && (
            <HeartFill
              style={{
                cursor: "pointer",
                fill: "red",
              }}
              onClick={favoriteCharacterHandler}
            />
          )}
        </Col>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroupItem>
          <Row>
            <Col>
              <TitleSpan>status:</TitleSpan>
            </Col>
            <Col className="d-flex align-items-sm-center">
              <span>{status}</span>
              <div
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: 50,
                  marginLeft: "5px",
                  marginBottom: "5px",
                  backgroundColor: getStatusColor(status),
                }}
              />
            </Col>
          </Row>
        </ListGroupItem>
        <ListGroupItem>
          <Row>
            <Col>
              <TitleSpan>species:</TitleSpan>
            </Col>
            <Col>
              <span>{species}</span>
            </Col>
          </Row>
        </ListGroupItem>
        <ListGroupItem>
          <Row>
            <Col>
              <TitleSpan>gender:</TitleSpan>
            </Col>
            <Col>
              <span>{gender}</span>
            </Col>
          </Row>
        </ListGroupItem>
      </ListGroup>
    </Card>
  );
}
