import Link from "next/link";
import Image from "next/image";
import * as styles from "./MovieItem.css.js";

export default function MovieItem({
  id,
  title,
  overview,
  posterPath,
  releaseDate,
  voteAverage,
}) {
  const hasPoster = Boolean(posterPath);
  const formattedVoteAverage =
    typeof voteAverage === "number" ? voteAverage.toFixed(1) : "평점 없음";

  return (
    <Link href={`/movies/${id}`} className={styles.container}>
      {hasPoster ? (
        <Image
          src={posterPath}
          width={80}
          height={120}
          alt={title}
          className={styles.coverImg}
        />
      ) : (
        <div className={styles.coverPlaceholder}>이미지 없음</div>
      )}
      <div className={styles.info}>
        <div className={styles.title}>{title}</div>
        {overview && (
          <div className={styles.subTitle}>{overview.slice(0, 100)}...</div>
        )}
        <div className={styles.author}>
          {releaseDate || "개봉일 미정"} | {formattedVoteAverage}
        </div>
      </div>
    </Link>
  );
}
