import { SearchResults } from "@/typings";

export const upcomingMoviesURL = "https://api.themoviedb.org/3/movie/upcoming";
export const topRatedMoviesURL = "https://api.themoviedb.org/3/movie/top_rated";
export const popularMoviesURL = "https://api.themoviedb.org/3/movie/popular";
const discoverMoviesURL = "https://api.themoviedb.org/3/discover/movie";
const searchMoviesURL = "https://api.themoviedb.org/3/search/movie";

async function fetchFromTMDB(url: URL, cacheTime?: number) {
  //   url.searchParams.set("include_adult", "false");
  url.searchParams.set("include_video", "false");
  url.searchParams.set("sort_by", "popularity.desc");
  url.searchParams.set("language", "en-US");
  url.searchParams.set("page", "1");

  const options: RequestInit = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
    },
    next: {
      revalidate: cacheTime || 60 * 60 * 24,
    },
  };

  const response = await fetch(url.toString(), options);
  const data = (await response.json()) as SearchResults;

  return data;
}

export const getMovies = async (movieTypeURL: string) => {
  const url = new URL(movieTypeURL);
  const data = await fetchFromTMDB(url);

  return data.results;
};

export const getDiscoverMovies = async (id?: string, keywords?: string) => {
  const url = new URL(discoverMoviesURL);
  keywords && url.searchParams.set("with_keywords", keywords);
  id && url.searchParams.set("with_genres", id);

  const data = await fetchFromTMDB(url);

  return data.results;
};

export const getSearchedMovies = async (term: string) => {
  const url = new URL(searchMoviesURL);

  url.searchParams.set("query", term);

  const data = await fetchFromTMDB(url);
  return data.results;
};
