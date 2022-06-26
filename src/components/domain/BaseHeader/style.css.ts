import { style, styleVariants } from "@vanilla-extract/css";

export const header = style({
  zIndex: 1000,
  background: 'white',
  width: '100%',
  height: 80,
  borderBottom: '1px solid #eaeaea',
  position: 'fixed',
  top: 0,
});

export const content = style({
  maxWidth: 1280,
  margin: "0px auto",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});

export const title = style({
  fontSize: 20,
  cursor: 'pointer'
});
