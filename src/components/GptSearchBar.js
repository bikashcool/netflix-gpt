import React, { useRef } from "react";
import lang from "../utils/languageConstant";
import { useDispatch, useSelector } from "react-redux";
// import openai from "../utils/openai";
import { API_OPTIONS, GEMINI_KEY } from "../utils/constant";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { addGptMovieResults } from "../utils/gptSlice";

const GptSearchBar = () => {
  const dispatch = useDispatch();
  const searchText = useRef(null);
  const langKey = useSelector((store) => store.config.lang);

  //search movie in tmdb
  const searchMovieTMDB = async (movie) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movie +
        "&include_adult=false&language=en-US&page=1",
      API_OPTIONS
    );
    const json = await data.json();
    return json.results;
  };

  // Access your API key (see "Set up your API key" above)
  const genAI = new GoogleGenerativeAI(GEMINI_KEY);

  const handleGptSearchClick = async () => {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const query =
      "Act as a Movie Recommendation system and suggest some movies for the query : " +
      searchText.current.value +
      ". only give me names of 5 movies, comma seperated like the example result given ahead. Example is : Koi mil gya, Hera feri, Kabhi kushi kabhi gam, Dilwale, Dune";
    const result = await model.generateContent(query);
    const gptResults = result.response;
    const gptMovies =
      gptResults.candidates?.[0]?.content?.parts?.[0]?.text.split(",");
    // ['The Hangover', ' Bridesmaids', ' Shaun of the Dead', ' 21 Jump Street', ' The Big Sick']

    const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie));
    const tmdbResults = await Promise.all(promiseArray);

    dispatch(addGptMovieResults({movieNames: gptMovies, movieResults: tmdbResults}));
  };

  return (
    <div className="pt-[40%] md:pt-[10%] flex justify-center">
      <form
        className="w-full md:w-1/2 bg-black grid grid-cols-12"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchText}
          type="text"
          className="p-4 m-4 col-span-9"
          placeholder={lang[langKey].gptSearchPlaceholder}
        />
        <button
          className="col-span-3 m-4 py-2 px-4 bg-red-700 text-white rounded-lg"
          onClick={handleGptSearchClick}
        >
          {lang[langKey].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
