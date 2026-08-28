import { useRouter } from "next/router";
import { useState } from "react";
import * as styles from "./SearchLayout.css.js";

export default function SearchLayout({ children }) {
  const router = useRouter();
  const query = typeof router.query.q === "string" ? router.query.q : "";
  const [previousQuery, setPreviousQuery] = useState(query);
  const [search, setSearch] = useState(query);

  if (previousQuery !== query) {
    setPreviousQuery(query);
    setSearch(query);
  }

  const handleSubmit = () => {
    const nextQuery = search.trim();
    if (!nextQuery || nextQuery === query) return;

    router.push({
      pathname: "/search",
      query: { q: nextQuery },
    });
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") handleSubmit();
  };

  return (
    <>
      <div className={styles.container}>
        <input
          aria-label="영화 검색어"
          className={styles.input}
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="검색어를 입력하세요"
        />
        <button type="button" className={styles.button} onClick={handleSubmit}>
          검색
        </button>
      </div>
      {children}
    </>
  );
}
