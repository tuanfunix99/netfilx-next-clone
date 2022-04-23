import { Fragment, ReactNode } from "react";
import * as React from "react";
import Head from "next/head";
import Header from "./Header";

interface PropType {
  title: string;
  content: string;
  children: ReactNode;
}

const Layout = ({
  title = "Home",
  content = "default",
  children,
}: Partial<PropType>) => {
  return (
    <Fragment>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content={content}></meta>
      </Head>
      {children}
    </Fragment>
  );
};

export default Layout;
