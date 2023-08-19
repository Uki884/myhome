import React from 'react'
import '@/styles/global.css';
import 'highlight.js/styles/tokyo-night-dark.css';
import 'prismjs/themes/prism-okaidia.css'
import 'prismjs/plugins/line-numbers/prism-line-numbers.min.js'
import 'prismjs/plugins/line-numbers/prism-line-numbers.css'

import App from "next/app";
import { RecoilRoot } from 'recoil'
import { CommonLayout } from '@/layouts/CommonLayout';
class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <RecoilRoot>
        <CommonLayout>
          <main style={{ flexGrow: 1, paddingTop: 80, paddingBottom: 80 }}>
            <Component {...pageProps} />
          </main>
        </CommonLayout>
      </RecoilRoot>
    );
  }
}

export default MyApp;