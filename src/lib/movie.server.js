const API_URL = process.env.API_URL;

if (!API_URL) {
  throw new Error("API_URL 환경 변수가 필요합니다.");
}

async function request(path, { notFoundAsNull = false } = {}) {
  const response = await fetch(new URL(path, API_URL));
  if (notFoundAsNull && response.status === 404) {
    return null;
  }
  if (!response.ok) {
    throw new Error(`API 요청 실패: ${response.status}`);
  }
  return response.json();
}

export async function fetchMovies({ query } = {}) {
  const path = query
    ? `/api/movies/search?q=${encodeURIComponent(query)}`
    : "/api/movies";
  const data = await request(path);
  return data.movies;
}

export async function fetchNowPlayingMovies() {
  const data = await request("/api/movies/now-playing");
  return data.movies;
}

export function fetchOneMovie(id) {
  return request(`/api/movies/${id}`, { notFoundAsNull: true });
}
