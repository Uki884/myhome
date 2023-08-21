import React from 'react'
import { globalStyles } from '@/styles/globalStyled';
import '@/styles/reset.css';
import 'highlight.js/styles/github-dark-dimmed.css';
import App from "next/app";
import { RecoilRoot } from 'recoil'
import { CommonLayout } from '@/layouts/CommonLayout';
import { Global } from '@emotion/react';
import { Noto_Sans_JP } from "next/font/google";

const notojp = Noto_Sans_JP({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});
class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <div className={notojp.className}>
        <Global styles={globalStyles} />
        <RecoilRoot>
          <CommonLayout>
            <Component {...pageProps} />
          </CommonLayout>
        </RecoilRoot>
      </div>
    );
  }
}

export default MyApp;