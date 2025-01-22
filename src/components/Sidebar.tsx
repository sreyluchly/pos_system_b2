import {
	Layers,
	LayoutDashboard,
	ShoppingBag,
	ShoppingCartIcon,
} from 'lucide-react'
import { Link, useMatch, useResolvedPath } from 'react-router-dom'
import { useSidebar } from '../providers/SidebarProvider'
import useMediaQuery from '../hooks/use-media-query'

const menuItems: MenuItem[] = [
	{
		label: 'Dashboard',
		href: '/dashboard',
		icon: LayoutDashboard,
	},
	{
		label: 'Product',
		href: '/product',
		icon: ShoppingBag,
	},
	{
		label: 'Orders',
		href: '/orders',
		icon: ShoppingCartIcon,
	},
	{
		label: 'Categories',
		href: '/categories',
		icon: Layers,
	},
]

const Sidebar = () => {
	const { collapse } = useSidebar()
	const isMobile = useMediaQuery('(max-width: 768px')
	return (
		<div
			className={`sticky top-0 left-0 h-screen border-r transition-all ${
				!isMobile && collapse ? 'w-64' : 'hidden'
			}`}>
			<h4 className="px-5 py-3 text-2xl font-semibold">
				<Link to={'/dashboard'}>POS System</Link>
			</h4>
			<menu className="p-5 flex flex-col">
				{menuItems.map((menuItem, index) => (
					<MenuLink
						key={index}
						menuItem={menuItem}
					/>
				))}
			</menu>
		</div>
	)
}

export default Sidebar

const MenuLink = ({ menuItem }: { menuItem: MenuItem }) => {
	const { pathname } = useResolvedPath(menuItem.href)
	const isActive = useMatch({ path: pathname })
	return (
		<Link
			to={menuItem.href}
			className={`flex gap-3 items-center ${
				isActive ? 'bg-gray-100' : ''
			} p-3 rounded-md`}>
			<menuItem.icon />
			{menuItem.label}
		</Link>
	)
}
