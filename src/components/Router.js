import { Navigate, Route, Routes } from "react-router-dom";
import { useSigninCheck } from "reactfire";
import { AuthPage } from "../pages/AuthPage";
import { HomePage } from "../pages/HomePage";
import { MyProfilePage } from "../pages/MyProfilePage";
import { NotFoundPage } from "../pages/NotFoundPage";

export function Router({
  filters,
  totalPages,
  characters,
  favoriteCharacterIds,
  filterActions,
  addFavoriteCharacterHandler,
  removeFavoriteCharacterHandler,
}) {
  const { data, status } = useSigninCheck();
  const isLoggedIn = status === "success" && data.signedIn;

  return (
    <Routes>
      <Route path="*" element={<NotFoundPage />} />
      <Route
        path="/"
        element={
          <HomePage
            filters={filters}
            totalPages={totalPages}
            characters={characters}
            filterActions={filterActions}
            addFavoriteCharacterHandler={addFavoriteCharacterHandler}
            removeFavoriteCharacterHandler={removeFavoriteCharacterHandler}
          />
        }
      />
      <Route
        path="profile"
        element={
          isLoggedIn ? (
            <MyProfilePage
              favoriteCharacterIds={favoriteCharacterIds}
              addFavoriteCharacterHandler={addFavoriteCharacterHandler}
              removeFavoriteCharacterHandler={removeFavoriteCharacterHandler}
            />
          ) : (
            <Navigate to="/" replace />
          )
        }
      />
      <Route
        path="login"
        element={
          !isLoggedIn ? (
            <AuthPage isLoginForm={true} />
          ) : (
            <Navigate to="/" replace />
          )
        }
      />
      <Route
        path="register"
        element={
          !isLoggedIn ? (
            <AuthPage isLoginForm={false} />
          ) : (
            <Navigate to="/" replace />
          )
        }
      />
    </Routes>
  );
}
