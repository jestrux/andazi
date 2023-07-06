import { useAnimate, stagger } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export const randomId = () => Math.random().toString(36).slice(2);

const Scene = ({ image, text, clip, hidden, onInit }) => {
	const [dimensions, setDimensions] = useState({});
	const [scope, animate] = useAnimate();
	const clipId = useRef("clipper" + randomId());

	const sequence = () => {
		const radius =
			Math.max(dimensions.width ?? 200, dimensions.height ?? 200) * 3;

		return [
			!clip
				? []
				: [`#${clip}Clip`, { r: [0, radius] }, { duration: 1.5 }],
			!text
				? []
				: [
						"li",
						{ opacity: [0, 1], y: [60, 0] },
						{ at: "-1.3", duration: 1, delay: stagger(0.1) },
				  ],
			["#image", { at: "<", scale: [1, 1.2] }, { duration: 3 }],
		];
	};

	useEffect(() => {
		if (scope.animations?.length) scope.animations = [];

		const r = animate(sequence({ dimensions, clip, text }));
		r.cancel();

		onInit(() => animate(sequence({ dimensions, clip, text })));
	}, [dimensions, clip, text]);

	return (
		<div className="absolute inset-6" style={{ opacity: hidden ? 0 : "" }}>
			<div
				ref={scope}
				className="bg-card shadow-xl rounded-lg h-full w-full relative overflow-hidden"
			>
				<div id="image" className="absolute inset-0">
					<svg
						className="w-full h-full"
						viewBox={`0 0 ${dimensions.width ?? 200} ${
							dimensions.height ?? 200
						}`}
						preserveAspectRatio="xMidYMid slice"
					>
						<defs>
							<clipPath id={clipId.current}>
								<circle
									id="circleClip"
									fill="#fff"
									cx={dimensions.width ?? 200}
									cy={dimensions.height ?? 200}
									r={0}
								/>
							</clipPath>
						</defs>

						<image
							clipPath={clip ? `url(#${clipId.current})` : null}
							xlinkHref={image}
							onLoad={(e) => setDimensions(e.target.getBBox())}
						></image>
					</svg>
				</div>

				{text && (
					<ul className="absolute top-6 inset-x-2 text-4xl/none tracking-wide font-black flex gap-2 flex-col items-center">
						{text.split("\n").map((t, i) => (
							<li key={i} className="relative p-3">
								<span className="absolute inset-0 bg-black rounded"></span>
								<strong className="relative text-white">
									{t}
								</strong>
							</li>
						))}
					</ul>
				)}
			</div>
		</div>
	);
};

export default Scene;
