import { useState } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";

const Projects = ({ onSelect }) => {
	const [projects, setProjects] = useState([
		"https://images.unsplash.com/photo-1588072432904-843af37f03ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxNjE2NXwwfDF8c2VhcmNofDI3fHxzY2hvb2x8ZW58MHx8fHwxNjg4NTQwMDIwfDA&ixlib=rb-4.0.3&q=80&w=600",
		"https://images.unsplash.com/photo-1522202176988-66273c2fd55f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxNjE2NXwwfDF8c2VhcmNofDIzfHxzY2hvb2x8ZW58MHx8fHwxNjg4NTQwMDIwfDA&ixlib=rb-4.0.3&q=80&w=600",
		"https://images.unsplash.com/photo-1606761568499-6d2451b23c66?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxNjE2NXwwfDF8c2VhcmNofDI2fHxzY2hvb2x8ZW58MHx8fHwxNjg4NTQwMDIwfDA&ixlib=rb-4.0.3&q=80&w=600",
		"https://images.unsplash.com/photo-1491841550275-ad7854e35ca6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxNjE2NXwwfDF8c2VhcmNofDMyfHxzY2hvb2x8ZW58MHx8fHwxNjg4NTQxNDM5fDA&ixlib=rb-4.0.3&q=80&w=600",
		"https://images.unsplash.com/photo-1491308056676-205b7c9a7dc1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxNjE2NXwwfDF8c2VhcmNofDQzfHxzY2hvb2x8ZW58MHx8fHwxNjg4NTQxNDM5fDA&ixlib=rb-4.0.3&q=80&w=600",
		"https://images.unsplash.com/photo-1501504905252-473c47e087f8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxNjE2NXwwfDF8c2VhcmNofDQyfHxzY2hvb2x8ZW58MHx8fHwxNjg4NTQxNDM5fDA&ixlib=rb-4.0.3&q=80&w=600",
		"https://images.unsplash.com/photo-1488722796624-0aa6f1bb6399?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxNjE2NXwwfDF8c2VhcmNofDQ1fHxzY2hvb2x8ZW58MHx8fHwxNjg4NTQxNDM5fDA&ixlib=rb-4.0.3&q=80&w=600",
	]);

	return (
		<>
			<div className="nav-bar bg-white">
				<div className="h-14 p-3 border-b flex items-center justify-between">
					<h1 className="font-bold text-xl/none">Andazi</h1>

					<button
						className="bg-gradient-to-br text-white from-[#8BC34A] to-[#4CAF50] h-9 flex items-center gap-2 rounded-full px-4"
						onClick={() =>
							onSelect(
								"https://images.unsplash.com/photo-1429198739803-7db875882052?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxNjE2NXwwfDF8c2VhcmNofDF8fGF1dHVtbnxlbnwwfHx8fDE2ODg1NDQzOTN8MA&ixlib=rb-4.0.3&q=80&w=600"
							)
						}
					>
						<PlusIcon
							className="mb-px"
							width={14}
							strokeWidth={3.5}
						/>
						<span className="mr-0.5">New project</span>
					</button>
				</div>
			</div>

			<div className="flex-1 bg-neutral-200 overflow-auto">
				<div className="grid grid-cols-2 gap-3 p-3">
					{projects.map((image, i) => (
						<button
							key={i}
							className="bg-white shadow rounded-lg text-left aspect-[1/1.5] relative overflow-hidden p-1.5"
							onClick={() => onSelect(image)}
						>
							<img
								className="w-full h-full object-cover rounded"
								src={image}
								alt=""
							/>
						</button>
					))}
				</div>
			</div>
		</>
	);
};

export default Projects;
