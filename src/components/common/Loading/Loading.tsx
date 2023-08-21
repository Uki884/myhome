import React from "react";
import ReactLoading from "react-loading";
import * as Styled from './styled';

export const Loading = () => {
  return (
    <Styled.$Loading>
      <ReactLoading
        type={'bubbles'}
        color="#2222"
        height="100px"
        width="100px"
      />
    </Styled.$Loading>
  );
};

export default Loading;