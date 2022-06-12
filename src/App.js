import { useCallback, useEffect, useReducer, useState } from "react";
import { useSigninCheck } from "reactfire";
import { Header } from "./components/Header";
import { Router } from "./components/Router";
import { INITIAL_FILTERS_STATE } from "./constants";
import { LoadingPage } from "./pages/LoadingPage";
import { getCharacters } from "./services/api";
import { filtersReducer } from "./services/filters";
import {
  addFavoriteCharacter,
  getFavoriteCharacterIds,
  removeFavoriteCharacter,
} from "./services/firebase";

function App() {
  const { data, status } = useSigninCheck();
  const isLoggedIn = status === "success" && data.signedIn;
  const uid = data?.user?.uid;

  const [characters, setCharacters] = useState([]);
  const [totalPages, setTotalPages] = useState(42);
  const [isLoadingPageShown, setIsLoadingPageShown] = useState(true);
  const [favoriteCharacterIds, setFavoriteCharacterIds] = useState([]);
  const [filters, filtersDispatch] = useReducer(
    filtersReducer,
    INITIAL_FILTERS_STATE
  );

  function increaseCurrentPageHandler() {
    filtersDispatch({ type: "INCREASE_CURRENT_PAGE" });
  }

  function decreaseCurrentPageHandler() {
    filtersDispatch({ type: "DECREASE_CURRENT_PAGE" });
  }

  function setCurrentPageHandler(value) {
    filtersDispatch({
      type: "SET_CURRENT_PAGE",
      currentPage: value,
    });
  }

  function setStatusHandler(value) {
    filtersDispatch({
      type: "SET_STATUS",
      status: value,
    });
  }

  function setSpeciesHandler(value) {
    filtersDispatch({
      type: "SET_SPECIES",
      species: value,
    });
  }

  function setGenderHandler(value) {
    filtersDispatch({
      type: "SET_GENDER",
      gender: value,
    });
  }

  function setNameHandler(value) {
    filtersDispatch({
      type: "SET_NAME",
      name: value,
    });
  }

  function resetFiltersHandler() {
    filtersDispatch({
      type: "RESET_FILTERS",
    });
  }

  const filterActions = {
    increaseCurrentPageHandler,
    decreaseCurrentPageHandler,
    setCurrentPageHandler,
    setStatusHandler,
    setSpeciesHandler,
    setGenderHandler,
    setNameHandler,
    resetFiltersHandler,
  };

  const addIsFavoriteFieldToCharacters = useCallback(() => {
    return setCharacters((prevCharacters) =>
      prevCharacters.map((character) =>
        favoriteCharacterIds.includes(String(character.id))
          ? { ...character, isFavorite: true }
          : { ...character, isFavorite: false }
      )
    );
  }, [favoriteCharacterIds]);

  async function addFavoriteCharacterHandler(characterId) {
    setFavoriteCharacterIds((prevIds) => [...prevIds, String(characterId)]);
    await addFavoriteCharacter(uid, characterId);
  }

  function removeFavoriteCharacterHandler(characterId) {
    setFavoriteCharacterIds((prevIds) =>
      prevIds.filter((id) => id !== String(characterId))
    );
    removeFavoriteCharacter(uid, characterId);
  }

  const getCharactersDataHandler = useCallback(
    async ({ page, species, gender, status, name }) => {
      const { results, info } = await getCharacters({
        page,
        species,
        gender,
        status,
        name,
      });

      setCharacters(results);
      setTotalPages(info.pages);

      if (isLoggedIn && uid) {
        addIsFavoriteFieldToCharacters();
      }
    },
    [uid, isLoggedIn, addIsFavoriteFieldToCharacters]
  );

  const fetchFavoriteCharacterIds = useCallback(async () => {
    setIsLoadingPageShown(true);
    const ids = await getFavoriteCharacterIds(uid);
    setFavoriteCharacterIds(ids);
    setIsLoadingPageShown(false);
  }, [uid]);

  useEffect(() => {
    const { currentPage: page, species, gender, status, name } = filters;
    getCharactersDataHandler({ page, species, gender, status, name });
  }, [filters, getCharactersDataHandler]);

  useEffect(() => {
    addIsFavoriteFieldToCharacters();
  }, [favoriteCharacterIds, addIsFavoriteFieldToCharacters]);

  useEffect(() => {
    if (isLoggedIn && status === "success") {
      fetchFavoriteCharacterIds();
    }

    if (!isLoggedIn && status === "success") {
      setIsLoadingPageShown(false);
    }
  }, [isLoggedIn, fetchFavoriteCharacterIds, status]);

  if (status === "loading" || isLoadingPageShown) {
    return <LoadingPage />;
  }

  return (
    <>
      <Header />
      <Router
        filters={filters}
        totalPages={totalPages}
        characters={characters}
        favoriteCharacterIds={favoriteCharacterIds}
        filterActions={filterActions}
        addFavoriteCharacterHandler={addFavoriteCharacterHandler}
        removeFavoriteCharacterHandler={removeFavoriteCharacterHandler}
      />
    </>
  );
}

export default App;
