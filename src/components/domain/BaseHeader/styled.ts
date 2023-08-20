import styled from "@emotion/styled";

export const $Header = styled.header`
  z-index: 1000;
  background: white;
  width: 100%;
  height: 64px;
  border-bottom: 1px solid #eaeaea;
  position: fixed;
  top: 0;
`;

export const $Content = styled.div`
  max-width: 1280px;
  margin: 0px auto;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
`;

export const $Title = styled.h1`
  font-size: 20px;
  cursor: pointer;
`;
