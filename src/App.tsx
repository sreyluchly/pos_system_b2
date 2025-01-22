import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Product from './pages/Product'
import SidebarProvider from './providers/SidebarProvider'
import Orders from './pages/Orders'
import Category from './pages/Category'
import { get, set } from './lib/local-storage'
import { topSellingProducts, topSellingProductsKey } from './constants'
import Dashboard from './pages/Dashboard'

const App = () => {
	const existingProducts = get(topSellingProductsKey)
	if (!existingProducts) {
		set(topSellingProductsKey, topSellingProducts)
	}
	return (
		<SidebarProvider>
			<div className="relative flex">
				<Sidebar />
				<div className="flex-1 bg-gray-100 flex flex-col">
					<Navbar />
					<main className="p-3 flex-1">
						<Routes>
							<Route
								path="/"
								element={<div>Hello world</div>}
							/>
							<Route
								path="/dashboard"
								element={<Dashboard />}
							/>
							<Route
								path="/product"
								element={<Product />}
							/>
							<Route
								path="/orders"
								element={<Orders />}
							/>
							<Route
								path="/categories"
								element={<Category />}
							/>
							<Route
								path="*"
								element={
									<div className="w-full h-full flex justify-center items-center">
										Page not found
									</div>
								}
							/>
						</Routes>
					</main>
				</div>
			</div>
		</SidebarProvider>
	)
}

export default App
