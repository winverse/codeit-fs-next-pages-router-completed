import { MovieItem } from "@/components/MovieItem";
import { SearchLayout } from "@/components/layouts/SearchLayout";
import { fetchSearchMovies } from "@/lib/movie.server";
import Head from "next/head";

export default function SearchPage({ movies, searchQuery }) {
  return (
    <>
      <Head>
        <title>
          {searchQuery
            ? `${searchQuery} 검색 | Next Cinema`
            : "영화 검색 | Next Cinema"}
        </title>
        <meta
          name="description"
          content="영화 제목으로 검색한 결과를 확인합니다."
        />
      </Head>
      <div>
        {movies.map((movie) => (
          <MovieItem key={movie.id} {...movie} />
        ))}
      </div>
    </>
  );
}

SearchPage.getLayout = (page) => <SearchLayout>{page}</SearchLayout>;

export async function getServerSideProps({ query }) {
  const searchQuery = typeof query.q === "string" ? query.q : "";
  const movies = searchQuery ? await fetchSearchMovies(searchQuery) : [];

  return {
    props: { movies, searchQuery },
  };
}
