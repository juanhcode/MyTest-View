import { Navigate, Route, Routes } from "react-router-dom"
import { MyTestPages } from "../pages/MyTestPages"
import { Error404 } from "../../auth/pages/Error404"

export const MyTestRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<MyTestPages />} />
            <Route path="/*" element={<Navigate to='/' />} />
            <Route path='*' element={<Error404 />} />
        </Routes>

    )
}
