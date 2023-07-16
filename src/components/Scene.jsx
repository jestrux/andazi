import { parseColor } from "../utils";
import { useAppContext } from "../AppProvider";

const Scene = ({ id, background, image, text, className, hideText }) => {
	const { writingText } = useAppContext();
	const textPlacement = text.placement || "top";
	const filled = ["filled", "inverted"].includes(text.style);
	const inverted = text.style == "inverted";
	const backgroundColor = !filled
		? "transparent"
		: inverted
		? "white"
		: "black";
	const textColor = !filled || !inverted ? "white" : "black";

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

				{!writingText && text && (
					<ul
						className={`${
							!filled ? "-space-y-3" : "gap-2"
						} absolute inset-x-2 text-3xl/none tracking-wide font-bold flex flex-col items-center justify-center`}
						style={{
							top: ["center", "top"].includes(textPlacement)
								? 40
								: "",
							bottom: ["center", "bottom"].includes(textPlacement)
								? 60
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
									style={{
										background: backgroundColor,
									}}
								></div>
								<strong
									className="relative inline-flex gap-2 text-white"
									style={{
										color: textColor,
										WebkitTextFillColor:
											text.style == "outline"
												? "transparent"
												: textColor,
										WebkitTextStroke: `1px ${textColor}`,
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
