import AISuggestion from "@/components/AISuggestion";
import MoviesCarousel from "@/components/MoviesCarousel";
import {
  getMovies,
  getSearchedMovies,
  popularMoviesURL,
} from "@/lib/getMovies";
import { notFound } from "next/navigation";

type Props = {
  params: {
    term: string;
  };
};

const SearchPage = async ({ params: { term } }: Props) => {
  if (!term) notFound();

  const termToUse = decodeURI(term);

  // API call to get the searched movies
  const movies = await getSearchedMovies(termToUse);
  // API call to get the popular movies
  const popularMovies = await getMovies(popularMoviesURL);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col space-y-4 mt-32 xl:mt-42">
        <h1 className="text-6xl font-bold px-10">Results for {termToUse}</h1>

        {/* AI Suggestions */}
        <AISuggestion term={termToUse} />

        <MoviesCarousel title="Movies" movies={movies} isVertical />
        <MoviesCarousel title="You may also like" movies={popularMovies} />
      </div>
    </div>
  );
};

export default SearchPage;
