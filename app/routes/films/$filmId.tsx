//the $ in the file name means the link is DYNAMIC!!
import { LoaderFunction, Outlet, useLoaderData } from "@remix-run/react";

import invariant from "tiny-invariant";

import { getFilmById, Film } from "~/api/films";
import FilmsIndex from ".";
import CharacterList from "../components/CharacterList";
import FilmBanner from "../components/FilmBanner";

//BACKEND
export const loader: LoaderFunction = async ({ params }) => {
  //params means all the paramsn included in the top url

  invariant(params.filmId, "expected params.filmId"); //to make sure the param is there, instead of using an if validation or forcing unwrap (!)
  //const film = await getFilmById(params.filmId); //call the function in the API helper file
  const film = await getFilmById(params.filmId);
  console.log("fetching film... -->", film.title);

  return film;
};

export default function Film() {
  //get the data from the backend
  const film = useLoaderData<Film>();
  return (
    <div>
      <FilmBanner film={film} />

      <div className="p-10">
        {film.description}
        <div className="flex py-5 space">
          <CharacterList characters={film.characters} />

          <div className="flex-1 mx-5">
            {/*outlet is needed to show a nested route, as character is showed inside film id*/}
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
    
  
}
