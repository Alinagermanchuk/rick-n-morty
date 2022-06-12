import { useCallback, useEffect, useState } from "react";
import { Container, Image } from "react-bootstrap";
import { useUser } from "reactfire";
import ProfileLogo from "../assets/profile-logo.png";
import { FavoriteCharactersList } from "../components/FavoriteCharactersList";
import { getCharactersByIds } from "../services/api";
import { LoadingPage } from "./LoadingPage";

export function MyProfilePage({
  favoriteCharacterIds,
  removeFavoriteCharacterHandler,
}) {
  const { data: userData } = useUser();
  const { displayName: userName } = userData;
  const [favoriteCharacters, setFavoriteCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchFavoriteCharacters = useCallback(async () => {
    if (favoriteCharacterIds.length) {
      const favoriteCharactersData = await getCharactersByIds(
        favoriteCharacterIds
      );
      setFavoriteCharacters(favoriteCharactersData);
    } else {
      setFavoriteCharacters([]);
    }
    setIsLoading(false);
  }, [favoriteCharacterIds]);

  useEffect(() => {
    fetchFavoriteCharacters();
  }, [fetchFavoriteCharacters, favoriteCharacterIds]);

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <>
      <div
        style={{
          padding: "20px 0",
          display: "flex",
          backgroundColor: "#f0f0f0",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Image
          className="mb-4"
          style={{ width: 150, height: 130 }}
          src={ProfileLogo}
        />
        <h4 style={{ textTransform: "uppercase" }}>{userName}</h4>
      </div>
      <Container className="g-4">
        <FavoriteCharactersList
          characters={favoriteCharacters}
          removeFavoriteCharacterHandler={removeFavoriteCharacterHandler}
        />
      </Container>
    </>
  );
}
