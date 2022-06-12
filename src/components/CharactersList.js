import { Col, Row } from "react-bootstrap";
import { EmojiExpressionless } from "react-bootstrap-icons";
import { CharactersListItem } from "./CharactersListItem";

export function CharactersList({
  characters,
  addFavoriteCharacterHandler,
  removeFavoriteCharacterHandler,
}) {
  return (
    <>
      {characters.length ? (
        <Row
          xs={1}
          sm={2}
          lg={4}
          xl={4}
          xxl={5}
          className="d-flex justify-content-sm-between g-4"
        >
          {characters.map((character) => (
            <Col className="g-4" key={character.id}>
              <CharactersListItem
                image={character.image}
                name={character.name}
                status={character.status}
                species={character.species}
                gender={character.gender}
                id={character.id}
                isFavorite={character?.isFavorite}
                addFavoriteCharacterHandler={addFavoriteCharacterHandler}
                removeFavoriteCharacterHandler={removeFavoriteCharacterHandler}
              />
            </Col>
          ))}
        </Row>
      ) : (
        <>
          <Row className="mt-5 justify-content-center">
            <EmojiExpressionless size="70px" />
          </Row>
          <Row className="my-2" style={{ textAlign: "center" }}>
            <h3 style={{ margin: "20px 0" }}>No characters found!</h3>
            <h5 style={{ color: "#646464" }}>Please, clear the filters!</h5>
          </Row>
        </>
      )}
    </>
  );
}
