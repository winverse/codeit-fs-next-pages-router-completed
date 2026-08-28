import clsx from "clsx";
import Image from "next/image";
import * as styles from "./MovieDetail.css.js";

export default function MovieDetail({
  title,
  tagline,
  overview,
  releaseDate,
  genres,
  runtime,
  posterPath,
  voteAverage,
}) {
  const hasPoster = Boolean(posterPath);
  const genreNames =
    genres?.map((genre) => genre.name).join(", ") || "장르 정보 없음";
  const formattedVoteAverage =
    typeof voteAverage === "number" ? voteAverage.toFixed(1) : "평점 없음";
  const coverStyle = hasPoster
    ? { backgroundImage: `url('${posterPath}')` }
    : undefined;

  return (
    <div className={styles.container}>
      <div
        className={clsx(
          styles.coverImgContainer,
          !hasPoster && styles.coverImgContainerEmpty,
        )}
        style={coverStyle}
      >
        {hasPoster ? (
          <Image
            src={posterPath}
            width={240}
            height={350}
            alt={title}
            className={styles.coverImg}
          />
        ) : (
          <div className={styles.coverPlaceholder}>이미지 없음</div>
        )}
      </div>

      <div className={styles.infoContainer}>
        <div className={styles.title}>{title}</div>
        <div>
          {releaseDate || "개봉일 미정"} | {genreNames} |{" "}
          {runtime || "상영 시간 미정"} | {formattedVoteAverage}
        </div>
        {tagline && <div className={styles.tagline}>{tagline}</div>}
        <div className={styles.overview}>
          {overview || "줄거리 정보가 없습니다."}
        </div>
      </div>
    </div>
  );
}
