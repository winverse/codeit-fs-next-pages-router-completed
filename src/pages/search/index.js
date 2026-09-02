import MovieItem from "@/components/MovieItem";
import SearchLayout from "@/components/layouts/SearchLayout";
import { fetchSearchMovies } from "@/lib/movie.client";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function SearchPage() {
  const router = useRouter();
  const query = typeof router.query.q === "string" ? router.query.q : "";
  const [result, setResult] = useState({
    query: "",
    movies: [],
    error: null,
  });

  useEffect(() => {
    if (!router.isReady || !query) return undefined;

    const controller = new AbortController();

    fetchSearchMovies(query, controller.signal)
      .then((data) => {
        setResult({ query, movies: data, error: null });
      })
      .catch((error) => {
        if (error.name === "AbortError") return;
        console.error(error);
        setResult({ query, movies: [], error });
      });

    return () => controller.abort();
  }, [query, router.isReady]);

  let status = "success";
  if (!query) status = "idle";
  else if (result.query !== query) status = "loading";
  else if (result.error) status = "error";

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
      {status === "loading" && <p>검색 중입니다.</p>}
      {status === "error" && <p>검색 결과를 불러오지 못했습니다.</p>}
      {status === "success" && result.movies.length === 0 && (
        <p>검색 결과가 없습니다.</p>
      )}
      {status === "success" && (
        <div>
          {result.movies.map((movie) => (
            <MovieItem key={movie.id} {...movie} />
          ))}
        </div>
      )}
    </>
  );
}

SearchPage.getLayout = (page) => <SearchLayout>{page}</SearchLayout>;
