//define the model
export type Film = {
  id: string;
  title: string;
  original_title: string;
  description: string;
  image: string;
  movie_banner: string;
  people: string[]; //this will host the 2nd api get call
  characters?: FilmCharacter[];
};

//define the model character
export type FilmCharacter = {
  id: string;
  name: string;
  gender?: string;
  age?: string;
  eye_color?: string;
  hair_color?: string;
};

export async function getFilms(title?: string | null) {
  //api call
  const response = await fetch("https://ghibliapi.herokuapp.com/films");

  //declare an array type Films that receives the json response 
  const films: Film[] = await response.json();

  //return films; //this will be the data loaded to use in the client side

  return films.filter((film) =>
    title ? film.title.toLowerCase().includes(title.toLowerCase()) : true
  ); //return titles that match the title in the search form
}

export async function getFilmById(filmId: string) {
  const response = await fetch(
    `https://ghibliapi.herokuapp.com/films/${filmId}`
  ); //to return film with the id passed

  const film: Film = await response.json();

  const characters = await Promise.all(
    film.people
      .filter((url) => url !== 'https://ghibliapi.herokuapp.com/people/')
      //map because we have one url per character, we need one request per character
      .map((url) => fetch(url).then((res) => res.json()))
  );

  return {...film, characters}; //why this format? doesn't work if I use {film, characters}
}

//fetch character id

export async function getFilmCharacter(characterId: string): Promise<FilmCharacter> {
  const response = await fetch (
    `https://ghibliapi.herokuapp.com/people/${characterId}`
  );

  if (!response.ok) {
    throw response;
  }
  //put the results in a var
  //const character: FilmCharacter = await response.json();
  return response.json()
}
