import NavBar from "./navbar";
import Footer from "./footer";

/**
 * RootLayout Component
 *
 * This is a React component named `Layout` that represents the overall layout of a web page.
 * It includes a `Navbar` at the top, followed by the main content represented by `children`,
 * and finally, a `Footer` at the bottom.
 *
 * @component Layout
 *
 * @param {ReactNode} children - The main content of the layout.
 * @returns {JSX.Element} The rendered Layout component.
 * @example
 *
 * import React from 'react';
 * import Layout from './Layout';
 * import Navbar from './Navbar';
 * import Footer from './Footer';
 * import Home from './Home';
 *
 * const Example: React.FC = () => {
 *   return (
 *     <Layout>
 *       <Navbar />
 *       <Home />
 *       <Footer />
 *     </Layout>
 *   );
 * };
 *
 * export default Example;
 */


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
    <NavBar/>
      <div>
        {children}
      </div>
      <Footer/>
    </>
  );
}
