import { globalStyle } from "@vanilla-extract/css";

globalStyle("h1, h2, h3, h4, h5, h6, p, ul, ol, li, figure, blockquote", {
  margin: 0,
  padding: 0,
});

globalStyle("ul, ol", {
  listStyle: "none",
});

globalStyle("button", {
  padding: 0,
  border: "none",
  background: "none",
  color: "inherit",
  cursor: "pointer",
  font: "inherit",
});

globalStyle("input, textarea", {
  font: "inherit",
});

globalStyle("img", {
  display: "block",
  maxWidth: "100%",
});
