import { ScrollViewStyleReset } from "expo-router/html";
import type { PropsWithChildren } from "react";

// This file is web-only and used to configure the root HTML for every
// web page during static rendering.
// The contents of this function only run in Node.js environments and
// do not have access to the DOM or browser APIs.
export default function Root({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />

        {/* Link the PWA manifest file. */}
        <link rel="manifest" href="/manifest.json" />
        {/* <!-- Define the name of the app --> */}
        <meta
          name="apple-mobile-web-app-title"
          content="Plate Calculator"
        ></meta>

        {/* <!-- Define the start URL --> */}
        <meta name="apple-mobile-web-app-capable" content="yes"></meta>

        {/* <!-- Define the status bar style (default, black, or black-translucent) --> */}
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black"
        ></meta>

        {/* <!-- Link to the icon --> */}
        <link rel="apple-touch-icon" href="/apple-touch-icon.png"></link>

        {/* <!-- Define the display (standalone, fullscreen, or minimal-ui) --> */}
        <meta name="mobile-web-app-capable" content="yes"></meta>

        {/*
          Disable body scrolling on web. This makes ScrollView components work closer to how they do on native.
          However, body scrolling is often nice to have for mobile web. If you want to enable it, remove this line.
        */}
        <ScrollViewStyleReset />

        {/* Add any additional <head> elements that you want globally available on web... */}
      </head>
      <body>{children}</body>
    </html>
  );
}
