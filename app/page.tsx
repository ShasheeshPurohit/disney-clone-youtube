import CarouselBannerWrapper from "@/components/CarouselBannerWrapper";
import MoviesCarousel from "@/components/MoviesCarousel";
import {
  getMovies,
  popularMoviesURL,
  topRatedMoviesURL,
  upcomingMoviesURL,
} from "@/lib/getMovies";

export default async function Home() {
  const upcomingMovies = await getMovies(upcomingMoviesURL);
  const topRatedMovies = await getMovies(topRatedMoviesURL);
  const popularMovies = await getMovies(popularMoviesURL);

  return (
    <main className="">
      <CarouselBannerWrapper />
      <div>
        <MoviesCarousel movies={upcomingMovies} title="Upcoming" />
        <MoviesCarousel movies={topRatedMovies} title="Top Rated" />
        <MoviesCarousel movies={popularMovies} title="Popular" />
      </div>
    </main>
  );
}
