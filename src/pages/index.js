import { MovieItem } from "@/components/MovieItem";
import { SearchLayout } from "@/components/layouts/SearchLayout";
import { fetchMovies, fetchNowPlayingMovies } from "@/lib/movie.server";
import * as styles from "@/styles/home.css.js";
import Head from "next/head";

export default function HomePage({ nowPlaying, allMovies }) {
  return (
    <>
      <Head>
        <title>Next Cinema | 홈</title>
        <meta
          name="description"
          content="현재 상영 중인 영화와 인기 영화 목록을 확인합니다."
        />
      </Head>
      <div className={styles.container}>
        <section>
          <h2>지금 상영 중인 영화</h2>
          <div className={styles.list}>
            {nowPlaying.map((movie) => (
              <MovieItem key={`now-playing-${movie.id}`} {...movie} />
            ))}
          </div>
        </section>
        <section>
          <h2>등록된 모든 영화</h2>
          <div className={styles.list}>
            {allMovies.map((movie) => (
              <MovieItem key={`all-${movie.id}`} {...movie} />
            ))}
          </div>
        </section>
      </div>
    </>
  );
}

HomePage.getLayout = (page) => <SearchLayout>{page}</SearchLayout>;

export async function getStaticProps() {
  const [nowPlaying, allMovies] = await Promise.all([
    fetchNowPlayingMovies(),
    fetchMovies(),
  ]);
  const nowPlayingIds = new Set(nowPlaying.map((movie) => movie.id));

  return {
    props: {
      nowPlaying: nowPlaying.slice(0, 6),
      allMovies: allMovies.filter((movie) => !nowPlayingIds.has(movie.id)),
    },
  };
}
