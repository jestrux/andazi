import { useAnimate, stagger } from "framer-motion";
import { useEffect } from "react";

const Scene = ({ image, onInit }) => {
	const [scope, animate] = useAnimate();
	const sequence = () => [
		["circle", { at: "<", r: [0, 500] }, { duration: 3 }],
		[
			"li",
			{ opacity: [0, 1], y: [60, 0] },
			{ at: "-2.5", duration: 1, delay: stagger(0.1) },
		],
		["#image", { at: "-5", scale: [1, 1.2] }, { duration: 10 }],
	];

	useEffect(() => {
		if (scope.animations?.length) scope.animations = [];

		setTimeout(() => {
			onInit(() => animate(sequence()));
		});
	}, []);

	return (
		<div
			ref={scope}
			className="bg-card shadow-xl rounded-lg w-full text-left relative overflow-hidden"
		>
			<div id="image" className="absolute inset-0">
				<svg
					className="w-full h-full"
					viewBox="0 0 200 200"
					preserveAspectRatio="xMidYMid slice"
				>
					<defs>
						<clipPath id="clipper">
							<circle fill="#fff" cx="100" cy="100" />
						</clipPath>
					</defs>

					<image
						height="200"
						width="200"
						clipPath="url(#clipper)"
						xlinkHref={image}
					></image>
				</svg>
			</div>

			<ul className="absolute top-6 inset-x-2 text-4xl/none tracking-wide font-black flex gap-2 flex-col items-center">
				<li className="relative p-3">
					<span className="absolute inset-0 bg-black rounded"></span>
					<strong className="relative text-white">#AUTUMN-ING</strong>
				</li>
				<li className="relative p-3">
					<span className="absolute inset-0 bg-black rounded"></span>
					<strong className="relative text-white">IN STYLE</strong>
				</li>
			</ul>
		</div>
	);
};

export default Scene;
