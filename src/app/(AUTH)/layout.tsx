import { AuthLayout } from "@/modules/auth/ui/layouts/auth-layout"

const AuthenticationWrapper = ({ children }: { children: React.ReactNode }) => {
	return <AuthLayout>{children}</AuthLayout>
}

export default AuthenticationWrapper
