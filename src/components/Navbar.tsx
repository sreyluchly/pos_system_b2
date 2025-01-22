import { PanelLeftOpen, PanelRightOpen } from 'lucide-react'
import { useSidebar } from '../providers/SidebarProvider'
import useMediaQuery from '../hooks/use-media-query'

const Navbar = () => {
	const { collapse, toggle } = useSidebar()
	const isMobile = useMediaQuery('(max-width: 768px)')
	return (
		<nav className="flex justify-between items-stretch w-full p-3 border-b bg-white">
			<button
				className="p-1 hover:bg-slate-100 rounded-lg"
				onClick={() => {
					if (!isMobile) toggle()
				}}>
				{collapse ? <PanelLeftOpen /> : <PanelRightOpen />}
			</button>
			<button className="px-4 py-1.5 border bg-slate-950 text-white rounded-md">
				Logout
			</button>
		</nav>
	)
}

export default Navbar
