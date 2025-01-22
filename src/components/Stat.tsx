const Stat = ({ icon: Icon, title, value, color }: Stat) => {
	return (
		<div
			className={`p-3 flex flex-col justify-between space-y-5 border flex-1 rounded-lg bg-white ${color}`}>
			<div className="flex justify-between">
				<div className="text-2xl">{value}</div>
				<Icon />
			</div>
			<div className="text-gray-500">{title}</div>
		</div>
	)
}

export default Stat
