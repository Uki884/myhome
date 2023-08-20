import styled from "@emotion/styled";

export const $Main = styled.main`
  flex-grow: 1;
  padding-top: 64px;
  padding-bottom: 80px;
  max-width: 1280px;
  margin: 0 auto;
  @media (max-width: 480px) {
    margin: 0;
  }
`;

export const $Layout = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100vh;
`;
