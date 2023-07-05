import { useState } from "react";
import { Link } from "react-router-dom";

const Projects = () => {
	const [projects] = useState([
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
			<div className="nav-bar bg-card">
				<div className="h-14 px-4 border-b flex items-center">
					<img className="h-7 mr-0.5" src="icon-512.png" alt="" />
					<h1 className="font-bold text-xl/none pt-1 logo">ndazi</h1>

					<div className="flex-1"></div>

					<Link
						className="bg-white/5 border border-neutral-200/80 dark:border-white/5 h-9 flex items-center gap-2 rounded-full px-3"
						to="new"
						state={{
							project:
								"https://images.unsplash.com/photo-1429198739803-7db875882052?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxNjE2NXwwfDF8c2VhcmNofDF8fGF1dHVtbnxlbnwwfHx8fDE2ODg1NDQzOTN8MA&ixlib=rb-4.0.3&q=80&w=600",
						}}
					>
						<svg className="h-4 mb-px" viewBox="0 0 24 24">
							<defs>
								<linearGradient
									id="grad1"
									x1="0%"
									y1="0%"
									x2="100%"
									y2="0%"
								>
									<stop
										offset="0%"
										style={{
											stopColor: "#8BC34A",
											stopOpacity: 1,
										}}
									/>
									<stop
										offset="100%"
										style={{
											stopColor: "#4CAF50",
											stopOpacity: 1,
										}}
									/>
								</linearGradient>
							</defs>

							<path
								d="M12 4.5v15m7.5-7.5h-15"
								stroke="url(#grad1)"
								strokeWidth="3.5"
								strokeLinecap="round"
							/>
						</svg>
						<span className="mr-0.5 text-xs">New project</span>
					</Link>
				</div>
			</div>

			<div className="flex-1 bg-canvas overflow-auto">
				<div className="grid grid-cols-2 gap-3 p-3 mb-4">
					{projects.map((image, i) => (
						<Link
							key={i}
							className="bg-card shadow border dark:border-white/5 rounded-lg text-left aspect-[1/1.5] relative flex items-stretch overflow-hidden p-1.5"
							to={`project${i + 1}`}
							state={{
								project: image,
							}}
						>
							<img
								className="object-cover rounded"
								src={image}
								alt=""
							/>
						</Link>
					))}
				</div>
			</div>
		</>
	);
};

export default Projects;
