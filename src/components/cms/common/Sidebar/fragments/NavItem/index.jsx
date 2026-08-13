import { NavLink } from "react-router";

function index({ label = "", href, icon, bgColor, iconColor, onClick }) {
	return (
		<NavLink
			to={href}
			onClick={onClick}
			className={
				"flex items-center gap-3 duration-150 transition-all hover:bg-zinc-100/70 p-1.5 rounded-lg relative"
			}
		>
			{(link) => (
				<>
					{link.isActive && (
						<>
							<div
								className={`absolute size-full right-0 rounded-lg opacity-6 ${bgColor}`}
							></div>
							<span
								className={`absolute to-0 w-1 rounded-full h-[80%] bottom-0 my-auto right-1 z-0 opacity-5 ${bgColor}`}
							></span>
						</>
					)}
					<div
						className={`size-10 rounded-lg flex items-center justify-center text-xl relative overflow-hidden ${iconColor}`}
					>
						<span
							className={`size-full absolute z-0 opacity-15 inset-0 ${bgColor}`}
						></span>
						{icon}
					</div>
					<span className="text-sm text-zinc-600 ">{label}</span>
				</>
			)}
		</NavLink>
	);
}

export default index;
