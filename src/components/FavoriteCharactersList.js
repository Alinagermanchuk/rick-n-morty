import { Button, Col, Row } from "react-bootstrap";
import { ArrowDown } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import { FavoriteCharactersListItem } from "./FavoriteCharactersListItem";

export function FavoriteCharactersList({
  characters,
  removeFavoriteCharacterHandler,
}) {
  return (
    <>
      <Row>
        <h4
          style={{
            textAlign: "center",
            textTransform: "uppercase",
            fontWeight: "normal",
            textDecoration: "underline",
            paddingLeft: 0,
            margin: "20px 0 0",
          }}
        >
          Favorite Characters
        </h4>
      </Row>
      {characters.length ? (
        characters.map((character) => (
          <Row className="my-4" key={character.id}>
            <Col xs={2} lg={2} xl={3} />
            <Col xs={8} md={10} lg={8} xl={6} className="p-0">
              <FavoriteCharactersListItem character={character} removeFavoriteCharacterHandler={removeFavoriteCharacterHandler} />
            </Col>
            <Col xs={2} lg={2} xl={3} />
          </Row>
        ))
      ) : (
        <>
          <Row className="my-2" style={{ textAlign: "center" }}>
            <h3 style={{ margin: "20px 0" }}>
              You don't have any favorite characters!
            </h3>
            <h5 style={{ color: "#646464" }}>Add some on a "Home Page"</h5>
          </Row>
          <Row className="justify-content-center mt-3">
            <ArrowDown />
          </Row>
          <Row className="justify-content-center">
            <Button
              className="my-4 w-25"
              as={Link}
              to="/"
              variant="outline-secondary"
            >
              Go to the Home Page
            </Button>
          </Row>
        </>
      )}
    </>
  );
}
