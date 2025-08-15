import AuthGuard from "@/modules/auth/ui/components/auth-guard"
import { Toaster } from "react-hot-toast"
type Props = {
	children: React.ReactNode
}

const MainLayout = ({ children }: Props) => {
	return (
		<AuthGuard>
			<Toaster position="bottom-right" />
			{children}
		</AuthGuard>
	)
}

export default MainLayout
