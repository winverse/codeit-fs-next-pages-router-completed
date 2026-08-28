import { style } from "@vanilla-extract/css";

export const container = style({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  margin: "0 auto 30px",
  padding: "10px 20px",
  borderRadius: "10px",
  backgroundColor: "#fff",
  boxShadow: "0 2px 5px rgba(0, 0, 0, 0.05)",
});

export const input = style({
  flex: 1,
  padding: "12px 15px",
  border: "1px solid #ddd",
  borderRadius: "5px",
  fontSize: "16px",
  ":focus": {
    borderColor: "#e50914",
    outline: "none",
  },
});

export const button = style({
  padding: "12px 20px",
  borderRadius: "5px",
  backgroundColor: "#e50914",
  color: "white",
  fontSize: "16px",
  fontWeight: "bold",
  ":hover": {
    backgroundColor: "#b20710",
  },
});
