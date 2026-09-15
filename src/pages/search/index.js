import { MovieItem } from "@/components/MovieItem";
import { SearchLayout } from "@/components/layouts/SearchLayout";
import { fetchSearchMovies } from "@/lib/movie.client";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function SearchPage() {
  const router = useRouter();
  const query = typeof router.query.q === "string" ? router.query.q : "";
  const [movies, setMovies] = useState(null);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (!router.isReady || !query) {
      return;
    }

    fetchSearchMovies(query)
      .then((data) => {
        setMovies(data);
        setHasError(false);
      })
      .catch((error) => {
        console.error(error);
        setHasError(true);
      });
  }, [query, router.isReady]);

  return (
    <>
      <Head>
        <title>
          {query ? `${query} 검색 | Next Cinema` : "영화 검색 | Next Cinema"}
        </title>
        <meta
          name="description"
          content="영화 제목으로 검색한 결과를 확인합니다."
        />
      </Head>
      {query && hasError && <p>검색 결과를 불러오지 못했습니다.</p>}
      {query && !hasError && movies && movies.length === 0 && (
        <p>검색 결과가 없습니다.</p>
      )}
      {query && !hasError && movies && (
        <div>
          {movies.map((movie) => (
            <MovieItem key={movie.id} {...movie} />
          ))}
        </div>
      )}
    </>
  );
}

SearchPage.getLayout = (page) => <SearchLayout>{page}</SearchLayout>;
