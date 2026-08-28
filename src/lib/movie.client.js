const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
  throw new Error("NEXT_PUBLIC_API_URL 환경 변수가 필요합니다.");
}

export async function fetchSearchMovies(query, signal) {
  const url = new URL("/api/movies/search", API_URL);
  url.searchParams.set("q", query);

  const response = await fetch(url, { signal });
  if (!response.ok) {
    throw new Error(`검색 요청 실패: ${response.status}`);
  }

  const data = await response.json();
  return data.movies;
}
