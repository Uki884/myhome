import styled from "@emotion/styled";

export const $Loading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`

export const $Posts = styled.div`
  display: flex;
  gap: 20px;
  padding: 32px 20px;
  flex-wrap: wrap;

  a {
    color: #333333;
    text-decoration: none;
  }

  @media (max-width: 480px) {
    flex-wrap: wrap;
    justify-content: center;
  }
`;

export const $Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;

export const $Date = styled.div`
  font-size: 14px;
  line-height: 150%;
  text-align: right;
`;

export const $Title = styled.h2`
  font-size: 24px;
  padding: 16px;
  margin: 0;
`;

export const $Section = styled.section`
  margin: 24px 0px;
`;

export const $Image = styled.img`
  width: 100%;
  height: 200px;
  object-fit: contain;
  border-bottom: 1px solid #eaeaea;
`;
