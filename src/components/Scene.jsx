import { parseColor } from "../utils";
import { useAppContext } from "../AppProvider";
import { useLocation } from "react-router-dom";

const Scene = ({ id, background, image, text, className, hideText }) => {
	const { pathname } = useLocation();
	const { writingText } = useAppContext();
	const textPlacement = text.placement || "top";
	const { background: textBackground, color: textColor } = {
		transparent: {
			background: "transparent",
			color: "white",
		},
		black: {
			background: "black",
			color: "white",
		},
		white: {
			background: "white",
			color: "black",
		},
	}[text.colors || "black"];

	const hideImage = !image.show || pathname.indexOf("edit-background") != -1;

	return (
		<div id={id} className={`${className}`}>
			<div
				className="rounded-lg h-full w-full relative overflow-hidden"
				style={{
					background: parseColor(background),
				}}
			>
				<div
					className="h-full w-full"
					style={{ opacity: hideImage ? 0 : 1 }}
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
							textBackground == "transparent"
								? "-space-y-3"
								: "gap-2"
						} absolute inset-x-2 text-3xl/none tracking-wide font-bold flex flex-col items-center justify-center`}
						style={{
							top: ["center", "top"].includes(textPlacement)
								? 30
								: "",
							bottom: ["center", "bottom"].includes(textPlacement)
								? 30
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
										background: textBackground,
									}}
								></div>
								<strong
									className="relative inline-flex gap-2 text-white"
									style={{
										color: textColor,
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
