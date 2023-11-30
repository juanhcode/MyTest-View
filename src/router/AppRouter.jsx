import { Route, Routes } from "react-router-dom"
import { AuthRoutes } from "../auth/routes/AuthRoutes"
import { MyTestRoutes } from "../myTest/routes/MyTestRoutes"

export const AppRouter = () => {
  return (
    <Routes> 

        {/* Login y Reegistro */}
        <Route path="/auth/*" element={<AuthRoutes /> }/>

        {/* JournalApp  */}
        <Route path="/*" element={<MyTestRoutes /> }/>
        
    </Routes>
    )
}
