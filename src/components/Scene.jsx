import { parseColor } from "../utils";

const Scene = ({ id, background, image, text, className, hideText }) => {
	const textPlacement = text.placement || "top";

	return (
		<div id={id} className={`${className}`}>
			<div
				className="rounded-lg h-full w-full relative overflow-hidden"
				style={{ background: parseColor(background) }}
			>
				<div
					className="h-full w-full"
					style={{ opacity: !image.show ? 0 : 1 }}
				>
					<img
						id="image"
						className={`w-full h-full rounded-lg object-cover
					${image.filter == "grayscale" && "grayscale"}
					${image.filter == "sepia" && "sepia"}
				`}
						src={image.url}
						alt=""
					/>
				</div>

				{text && (
					<ul
						className={`${
							text.background == "transparent"
								? "-space-y-1"
								: "gap-1"
						} absolute inset-x-2 text-3xl/none tracking-wide font-bold flex flex-col items-center justify-center`}
						style={{
							top: ["center", "top"].includes(textPlacement)
								? 24
								: "",
							bottom: ["center", "bottom"].includes(textPlacement)
								? 24
								: "",
						}}
					>
						{text.content.split("\n").map((_text, i) => (
							<li
								key={i}
								className={`relative p-3 px-4 ${
									hideText && "opacity-0"
								}`}
							>
								<div
									className="absolute inset-0 origin-bottom-left rounded skew-x-6 bg-black"
									style={{ background: text.background }}
								></div>
								<strong
									className="relative inline-flex gap-2 text-white"
									style={{
										color: text.color,
										WebkitTextFillColor: text.outline
											? "transparent"
											: text.color,
										WebkitTextStroke: `1px ${text.color}`,
									}}
								>
									{_text.split(" ").map((t, i) => (
										<span key={i}>
											{t.split("").map((t, i) => (
												<small
													key={i}
													className="inline-block"
												>
													{t}
												</small>
											))}
										</span>
									))}
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
