import { style } from "@vanilla-extract/css";

export const container = style({
  maxWidth: "600px",
  minHeight: "100vh",
  margin: "0 auto",
  padding: "0 20px",
  backgroundColor: "white",
  boxShadow: "0 0 20px rgba(0, 0, 0, 0.05)",
});

export const header = style({
  display: "flex",
  alignItems: "center",
  height: "60px",
  padding: "0 15px",
  borderBottom: "1px solid #eee",
  fontSize: "18px",
  fontWeight: "bold",
});

export const headerLink = style({
  color: "#e50914",
  textDecoration: "none",
  ":hover": {
    color: "#b20710",
  },
});

export const main = style({
  paddingTop: "10px",
});

export const footer = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "8px",
  marginTop: "50px",
  padding: "30px 0",
  borderTop: "1px solid #eee",
  color: "#666",
  fontSize: "12px",
  textAlign: "center",
});

export const footerLogo = style({
  display: "inline-flex",
});
