


import {
  Form,
  Link,
  LinksFunction,
  LoaderFunction,
  MetaFunction,
  useLoaderData,
} from "@remix-run/react";

//import { useLoaderData } from "@remix-run/react";
import { Film, getFilms } from "~/api/films";

//SERVER SIDE (BACKEND) fetch data from somwhere
export const loader: LoaderFunction = async ({ request }) => {
  //request captures the text of the form submitted
  const url = new URL(request.url);
  const title = url.searchParams.get("title"); //get the parameter title from url dynamic

  return getFilms(title); //pass the title to the api call function
};

export const meta: MetaFunction = () => {
  return {
    title: "Films | Studio Ghibli",
    description: "List of films",
  };
};

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: "styles" }];
};

//CLIENT SIDE
export default function FilmsIndex() {
  //react hook to retrieve data from the backend or server side
  const films = useLoaderData<Film[]>(); //get the data from remix, see import section
  return (
    <div className="p-16 font-sans">
      <h1 className="text-5xl font-bold text-center">Anime Films</h1>

      <Form reloadDocument method="get" className="py-5">
        <label htmlFor="" className="font-bold">
          Search {""}
          <input
            type="text"
            name="title"
            placeholder="Type a title"
            className="border-2 rounded py-2 px-3"
          />
        </label>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-2"
        >
          Search
        </button>
      </Form>

      <div className="grid grid-cols-4 gap-4">
        {films.map((film) => (
          <Link
            title={film.title}
            key={film.id}
            to={film.id}
            className="hover:shadow-2xl hover:scale-105 hover:font-bold cursor-pointer"
            prefetch="intent" //to download data for that next linnk before the user clicks on it! RENDER IS ANOTHER OPTION TO DOWNLOAD EVERYTHING!
          >
            <div>
              {film.title} ---- {film.director}
            </div>
            <img src={film.image} alt={film.title} />
          </Link> //this a Remix link component
        ))}
      </div>
    </div> //reference to data fetched from server side
  );
}
