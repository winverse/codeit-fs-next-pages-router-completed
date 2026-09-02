import MovieDetail from "@/components/MovieDetail";
import { fetchMovies, fetchOneMovie } from "@/lib/movie.server";
import Head from "next/head";
import { useRouter } from "next/router";

export default function MoviePage({ movie }) {
  const router = useRouter();

  if (router.isFallback) {
    return <p>영화 정보를 준비하고 있습니다.</p>;
  }

  const description =
    movie.overview?.slice(0, 160) || `${movie.title} 상세 정보`;

  return (
    <>
      <Head>
        <title>{`${movie.title} | Next Cinema`}</title>
        <meta name="description" content={description} />
      </Head>
      <MovieDetail {...movie} />
    </>
  );
}

export async function getStaticPaths() {
  const movies = await fetchMovies();
  const paths = movies.slice(0, 10).map((movie) => ({
    params: { id: String(movie.id) },
  }));

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const movieId = Number(params.id);
  if (!Number.isInteger(movieId) || movieId <= 0) {
    return { notFound: true };
  }

  const movie = await fetchOneMovie(movieId);
  if (!movie) {
    return { notFound: true };
  }

  return {
    props: { movie },
    revalidate: 60,
  };
}
