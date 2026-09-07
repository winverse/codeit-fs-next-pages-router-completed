import { useRouter } from "next/router";
import { useState } from "react";
import * as styles from "./SearchLayout.css.js";

export default function SearchLayout({ children }) {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const nextQuery = search.trim();
    if (!nextQuery) return;

    router.push({
      pathname: "/search",
      query: { q: nextQuery },
    });
  };

  return (
    <>
      <form className={styles.container} onSubmit={handleSubmit}>
        <input
          aria-label="영화 검색어"
          className={styles.input}
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="검색어를 입력하세요"
        />
        <button type="submit" className={styles.button}>
          검색
        </button>
      </form>
      {children}
    </>
  );
}
