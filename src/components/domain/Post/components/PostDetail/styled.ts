import styled from "@emotion/styled";

export const $Main = styled.div`
  max-width: 1280px;
  padding: 40px 60px;
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

export const $PostInfo = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`

export const $DateList = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
`

export const $Date = styled.span`
  font-size: 1rem;
  text-align: center;
  line-height: 150%;
  font-weight: 300;
  margin-right: 8px;
  font-size: 0.8em;
`;

export const $Title = styled.h1`
  font-size: 3rem;
  text-align: center;
  line-height: 150%;

  @media (max-width: 480px) {
    font-size: 2rem;
    padding: 0 8px;
  }
`;

export const $TitleWrapper = styled.div`
  border-bottom: solid 1px #eaeaea;
`;

export const $TagWrapper = styled.div`
  margin-top: 8px;
  display: flex;
  justify-content: center;
  gap: 8px;
  flex-wrap: wrap;
`

export const $Category = styled.div`
  display: inline-block;
  font-size: 12px;
  padding: 2px 8px;
  text-decoration: none;
  background: #2f3a56;
  color: #fff;
  border-radius: 2em;
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
  display: inline-block;
  font-size: 12px;
  padding: 2px 8px;
  text-decoration: none;
  color: #2f3a56;
  border: 1px solid #2f3a56;
  border-radius: 2em;
  &:before {
    content: "#";
  }
`;

export const $Section = styled.section`
  margin: 24px 0px;

  @media (max-width: 480px) {
    padding: 0 16px;
  }
`;

export const $Image = styled.img`
  width: 100%;
  height: 400px;
  object-fit: contain;

  @media (max-width: 480px) {
    height: 200px;
  }
`;
