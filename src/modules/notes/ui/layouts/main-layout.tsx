import AuthGuard from "@/modules/auth/ui/components/auth-guard"
import { Toaster } from "react-hot-toast"
import { CommandSearchProvider } from "../../contexts/command-search-context"
import { CommandMenu } from "../components/notes-command-search"

interface Props {
	children: React.ReactNode
}

const MainLayout = ({ children }: Props) => {
	return (
		<AuthGuard>
			<CommandSearchProvider>
				<Toaster position="top-right" />
				<CommandMenu />
				{children}
			</CommandSearchProvider>
		</AuthGuard>
	)
}

export default MainLayout
