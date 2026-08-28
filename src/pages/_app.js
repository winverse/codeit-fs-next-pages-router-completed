import GlobalLayout from "@/components/layouts/GlobalLayout";
import "@/styles/globals.css.js";
import "@/styles/reset.css.js";

export default function App({ Component, pageProps }) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return <GlobalLayout>{getLayout(<Component {...pageProps} />)}</GlobalLayout>;
}
