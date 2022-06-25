import React from 'react'
import '../styles/reset.css'
import 'highlight.js/styles/tokyo-night-dark.css';
import App from "next/app";
import { RecoilRoot } from 'recoil'
import { CommonLayout } from '@/layouts/CommonLayout';
class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <RecoilRoot>
        <CommonLayout>
          <Component {...pageProps} />
        </CommonLayout>
      </RecoilRoot>
    );
  }
}

export default MyApp;