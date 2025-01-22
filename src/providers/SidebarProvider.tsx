import { createContext, useContext, useState, type ReactNode } from 'react'

const sidebarContext = createContext<SidebarContextType>({
	collapse: false,
	toggle: () => {},
})

const SidebarProvider = ({ children }: { children: ReactNode }) => {
	const [collapse, setCollapse] = useState(true)
	const toggle = () => setCollapse((prev) => !prev)
	return (
		<sidebarContext.Provider value={{ collapse, toggle }}>
			{children}
		</sidebarContext.Provider>
	)
}

export const useSidebar = () => {
	const context = useContext(sidebarContext)
	if (!context) {
		throw new Error('useSidebar must be used within a SidebarProvider')
	}
	return context
}

export default SidebarProvider
