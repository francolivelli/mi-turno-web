"use client";
import "../styles/globals.css";
import store from "./store.js";
import { Provider, useSelector } from "react-redux";
import TopBanner from "./components/TopBanner";
import Navbar from "./components/Navbar";
import { selectUser } from "./features/userSlice";

function MyApp({ children }) {
  return (
    <Provider store={store}>
      <RootLayout children={children} />
    </Provider>
  );
}

function RootLayout({ children }) {
  const user = useSelector(selectUser);
  return (
    <html>
      <head />
      <body>
        <TopBanner />
        {user && <Navbar user={user}/>}
        {children}
      </body>
    </html>
  );
}

export default MyApp;
