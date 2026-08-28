import clsx from "clsx";
import Image from "next/image";
import { Noto_Sans_KR } from "next/font/google";
import Link from "next/link";
import * as styles from "./GlobalLayout.css.js";

const notoSansKr = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["500"],
});

export default function GlobalLayout({ children }) {
  return (
    <div className={clsx(styles.container, notoSansKr.className)}>
      <header className={styles.header}>
        <Link href="/" className={styles.headerLink}>
          NEXT CINEMA
        </Link>
      </header>
      <main className={styles.main}>{children}</main>
      <footer className={styles.footer}>
        <a
          className={styles.footerLogo}
          href="https://www.themoviedb.org"
          target="_blank"
          rel="noreferrer"
        >
          <Image
            src="/images/tmdb-logo.svg"
            width={44}
            height={44}
            alt="TMDB"
          />
        </a>
        <p>
          This product uses the TMDB API but is not endorsed or certified by
          TMDB.
        </p>
      </footer>
    </div>
  );
}
