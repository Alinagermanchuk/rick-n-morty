import { Container, Row } from "react-bootstrap";
import { CharactersList } from "../components/CharactersList";
import { Filters } from "../components/Filters";
import { Pagination } from "../components/Pagination";

export function HomePage({
  filters,
  totalPages,
  characters,
  filterActions,
  addFavoriteCharacterHandler,
  removeFavoriteCharacterHandler,
}) {
  return (
    <Container>
      <Row>
        <Filters filters={filters} filterActions={filterActions} />
        <Pagination
          currentPage={filters.currentPage}
          totalPages={totalPages}
          filterActions={filterActions}
        />
      </Row>

      <CharactersList
        filters={filters}
        totalPages={totalPages}
        characters={characters}
        filterActions={filterActions}
        addFavoriteCharacterHandler={addFavoriteCharacterHandler}
        removeFavoriteCharacterHandler={removeFavoriteCharacterHandler}
      />
    </Container>
  );
}
