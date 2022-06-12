function fetchData(url) {
  return fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      return data;
    });
}

export async function getCharacters({ page, species, gender, status, name }) {
  const response = await fetchData(
    `https://rickandmortyapi.com/api/character?name=${name}&page=${page}&species=${species}&gender=${gender}&status=${status}`
  );

  if (response.error === "There is nothing here") {
    return { results: [], info: { pages: 0 } };
  }

  const { results, info } = response;
  return { results, info };
}

export async function getCharactersByIds(ids) {
  const response = await fetchData(
    `https://rickandmortyapi.com/api/character/${ids.join(",")}`
  );
  if (!Array.isArray(response)) {
    return [response];
  }
  return response;
}
