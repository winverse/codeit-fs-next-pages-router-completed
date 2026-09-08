const API_URL = process.env.API_URL;

if (!API_URL) {
  throw new Error("API_URL 환경 변수가 필요합니다.");
}

export async function fetchMovies({ query } = {}) {
  const url = query
    ? `${API_URL}/api/movies/search?q=${encodeURIComponent(query)}`
    : `${API_URL}/api/movies`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`API 요청 실패: ${response.status}`);
  }
  const data = await response.json();
  return data.movies;
}

export async function fetchNowPlayingMovies() {
  const response = await fetch(`${API_URL}/api/movies/now-playing`);
  if (!response.ok) {
    throw new Error(`API 요청 실패: ${response.status}`);
  }
  const data = await response.json();
  return data.movies;
}

export async function fetchOneMovie(id) {
  const response = await fetch(`${API_URL}/api/movies/${id}`);
  if (response.status === 404) {
    return null;
  }
  if (!response.ok) {
    throw new Error(`API 요청 실패: ${response.status}`);
  }
  return response.json();
}
