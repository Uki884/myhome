import styled from "@emotion/styled";

export const $Main = styled.div`
  max-width: 1280px;
  padding: 120px 60px;
  margin: 0 auto;
  gap: 32px;
  min-height: 100vh;
  position: relative;
  line-height: 150%;
  letter-spacing: 0.05em;

  @media (max-width: 480px) {
    padding: 16px 8px;
  }
`;

export const $Date = styled.div`
  font-size: 1rem;
  text-align: center;
  line-height: 150%;
  font-weight: 300;
`;

export const $Title = styled.h1`
  font-size: 3rem;
  text-align: center;
  line-height: 200%;

  @media (max-width: 480px) {
    font-size: 2rem;
    padding: 0 8px;
  }
`;

export const $TitleWrapper = styled.div`
  border-bottom: solid 1px #eaeaea;
`;

export const $Tags = styled.div`
  font-size: 12px;
  text-align: center;
  margin-bottom: 8px;
  display: flex;
  justify-content: center;
  gap: 6px;
`;

export const $Tag = styled.div`
  font-size: 12px;
  border: 1px solid #5c93bb2b;
  border-radius: 2.5em;
  padding: 0 14px;
  cursor: pointer;
`;

export const $Section = styled.section`
  margin: 24px 0px;
  padding: 0 60px 60px 0;

  @media (max-width: 480px) {
    padding: 0 16px;
  }
`;

export const $Image = styled.img`
  width: 100%;
  height: 400px;
  object-fit: contain;
  margin-bottom: 20px;

  @media (max-width: 480px) {
    height: 200px;
  }
`;
