import NavBar from "./navbar";
import Footer from "./footer";

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
