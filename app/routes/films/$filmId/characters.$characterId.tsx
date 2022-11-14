//loader functin is to bring backend data to the client easily
import { LoaderFunction, Outlet, useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import { getFilmCharacter } from "~/api/films";




//BACKEND
export const loader: LoaderFunction = async ({ params }) => {
  //params means all the paramsn included in the top url

  invariant(params.characterId, "expected params.characterId"); //to make sure the param is there, instead of using an if validation or forcing unwrap (!)
  

  return getFilmCharacter(params.characterId);
};

export default function Character() {
    const characterDetails = useLoaderData<FilmCharacter>();
  return (
    <div className="mb-3">
      <div className="text-3xl mb-2">Character Details</div>
      <div className="p-4 rounded shadow-lg border">
        <div className="text-gray-700 font-bold text-xl mb-2">
          {characterDetails.name}
        </div>
        <ul className="py-2">
          <li>{characterDetails.gender}</li>
          <li>{characterDetails.age}</li>
          <li>{characterDetails.eye_color}</li>
        </ul>
      </div>
    </div>
  );
}