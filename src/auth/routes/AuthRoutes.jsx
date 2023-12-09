import { Navigate, Route, Routes } from "react-router-dom"
import { LoginPage, RegisterPage } from "../pages"
import { Error404 } from "../pages/Error404"
import Home from "../pages/Home"

export const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="home" element={<Home />} />
      <Route path="login" element={<LoginPage />} />
      <Route path="register" element={<RegisterPage />} />
      <Route path='*' element={<Error404 />} />

      <Route path="/" element={<Navigate to='/auth/login' />} />
    </Routes>
  )
}
