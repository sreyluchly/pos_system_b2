import { RectangleVertical, ShoppingBasket } from 'lucide-react'
import Stat from '../components/Stat'
import { topSellingProducts, topSellingProductsKey } from '../constants'
import { get } from '../lib/local-storage'
import { useEffect, useState } from 'react'

const stats: Stat[] = [
	{
		title: 'Total Products in Store',
		value: 100,
		icon: ShoppingBasket,
		color: 'bg-blue-100',
	},
	{
		title: 'Total Revenue',
		value: 1000,
		icon: RectangleVertical,
		color: 'bg-green-100',
	},
	{
		title: 'Total Products in Store',
		value: 100,
		icon: ShoppingBasket,
		color: 'bg-yellow-100',
	},
	{
		title: 'Total Products in Store',
		value: 100,
		icon: ShoppingBasket,
		color: 'bg-red-100',
	},
]

const Dashboard = () => {
	const [products, setProducts] = useState<typeof topSellingProducts>()
	useEffect(() => {
		const fetchData = async () => {
			const products = await get(topSellingProductsKey)
			setProducts(products)
		}
		fetchData()
		return () => {}
	}, [products])

	return (
		<>
			<section className="flex gap-3">
				{stats.map((stat, index) => (
					<Stat
						key={index}
						icon={stat.icon}
						title={stat.title}
						value={stat.value}
						color={stat.color}
					/>
				))}
			</section>
			<section className="mt-3">
				<h2 className="p-3 font-medium text-xl">Top selling products</h2>
				{products?.length ? (
					<table className="w-full text-start border rounded-lg overflow-hidden">
						<thead className="table-header-group bg-white">
							<tr className="border-collapse">
								{Object.keys(products[0]).map((key, index) => (
									<th
										key={index}
										className="text-start p-2 border capitalize">
										{key}
									</th>
								))}
							</tr>
						</thead>
						<tbody className="bg-white">
							{products?.map((product, index) => (
								<tr
									key={index}
									className="border-collapse">
									<td className="p-2 border">{product.name}</td>
									<td className="p-2 border">{product.category}</td>
									<td className="p-2 border">{product.price}</td>
								</tr>
							))}
						</tbody>
					</table>
				) : (
					<div className="p-3">No products found</div>
				)}
			</section>
		</>
	)
}

export default Dashboard
