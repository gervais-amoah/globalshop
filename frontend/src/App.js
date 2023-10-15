import React from "react";
import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Footer from "./components/Footer";
import Header from "./components/Header";

export default function App() {
  return (
    <>
      <Header />
      <main className="pb-3">
        <Container>
          <Outlet />
        </Container>
        <ToastContainer />
      </main>
      <Footer />
    </>
  );
}
