import styled from "@emotion/styled";

export const $Posts = styled.div`
  max-width: 1280px;
  display: flex;
  margin: 0 auto;
  gap: 40px;
  padding-top: 32px;
  height: 100vh;

  @media (max-width: 480px) {
    flex-wrap: wrap;
    justify-content: center;
  }
`;

export const $Date = styled.div`
  font-size: 12px;
  text-align: center;
  line-height: 150%;
  position: absolute;
  bottom: 16px;
  right: 16px;
`;

export const $Title = styled.h2`
  font-size: 24px;
  padding: 16px;
`;

export const $Section = styled.section`
  margin: 24px 0px;
`;

export const $Image = styled.img`
  width: 100%;
  height: 200px;
  object-fit: contain;
  border-bottom: 1px solid #eaeaea;

  @media (max-width: 480px) {
    height: 160px;
  }
`;
