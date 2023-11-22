import { Html, Head, Main, NextScript } from 'next/document';
import type { DocumentProps } from 'next/document';
import i18nextConfig from '../../next-i18next.config';
import React from 'react';
type Props = DocumentProps & {
  // add custom document props
};

const Document: React.FC<Props> = ({ __NEXT_DATA__ }) => {
  const currentLocale = __NEXT_DATA__.locale ?? i18nextConfig.i18n.defaultLocale;

  return (
    <Html lang={currentLocale}>
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
