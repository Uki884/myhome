import { style, styleVariants } from "@vanilla-extract/css";

export const card = style({
  cursor: 'pointer',
  borderRadius: 8,
  boxShadow: '0 2px 4px rgb(0 0 0 / 20%)',
  height: 400,
  width: 340,
  margin: '1em 0',
  position: 'relative',
  color: '#333'
});
