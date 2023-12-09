import { AuthProvider } from "./auth/pages/context/AuthContext"
import { AppRouter } from "./router/AppRouter"
import { AppTheme } from "./theme"

export const MyTestApp = () => {
  return (
    <>
      <AuthProvider>
        <AppTheme>
          <AppRouter />
        </AppTheme>
      </AuthProvider>
    </>
  )
}
