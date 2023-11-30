import { Navigate, Route, Routes } from "react-router-dom"
import { MyTestPages } from "../pages/MyTestPages"

export const MyTestRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<MyTestPages />} />
            <Route path="/*" element={<Navigate to='/' />} />
        </Routes>

    )
}
