
import Footer from "./components/Footer"
import { Outlet } from "react-router-dom"
import "./Layout.css"
import Header from "./components/Header"

function Layout() {
  return (
    <>
      <Header />
      <main>
        <Outlet /> {/* เนื้อหาของ Route แต่ละหน้า */}
      </main>
      <Footer />
    </>
  )
}

export default Layout