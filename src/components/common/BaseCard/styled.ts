import styled from "@emotion/styled";

export const $Card = styled.div`
  cursor: pointer;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgb(0 0 0 / 20%);
  max-width: 340px;
  min-width: 340px;
  height: 100%;
  position: relative;
  color: #333;
  padding: 16px;
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.24);
  transform: translate(0, -2px);
  transition: box-shadow 0.3s, transform 0.3s;

  &:hover {
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
    transform: initial;
  }
`;
