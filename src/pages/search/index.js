import { MovieItem } from "@/components/MovieItem";
import { SearchLayout } from "@/components/layouts/SearchLayout";
import { fetchSearchMovies } from "@/lib/movie.client";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function SearchPage() {
  const router = useRouter();
  const query = typeof router.query.q === "string" ? router.query.q : "";
  const [status, setStatus] = useState("idle");
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    if (!router.isReady) return;

    if (!query) {
      setStatus("idle");
      setMovies([]);
      return;
    }

    setStatus("loading");

    fetchSearchMovies(query)
      .then((data) => {
        setMovies(data);
        setStatus("success");
      })
      .catch((error) => {
        console.error(error);
        setMovies([]);
        setStatus("error");
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
      {status === "loading" && <p>검색 중입니다.</p>}
      {status === "error" && <p>검색 결과를 불러오지 못했습니다.</p>}
      {status === "success" && movies.length === 0 && (
        <p>검색 결과가 없습니다.</p>
      )}
      {status === "success" && (
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
