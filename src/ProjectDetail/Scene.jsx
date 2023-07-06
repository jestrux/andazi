const Scene = ({ id, image, text, className }) => {
	const textPlacement = text?.placement || "top";

	return (
		<div id={id} className={`absolute inset-6 ${className}`}>
			<div className="rounded-lg h-full w-full relative overflow-hidden">
				<img
					id="image"
					className="w-full h-full rounded-lg object-cover"
					src={image.url}
					alt=""
				/>

				{text && (
					<ul
						className="absolute inset-x-2 text-3xl/none tracking-wide font-bold flex gap-1 flex-col items-center justify-center"
						style={{
							top: ["center", "top"].includes(textPlacement)
								? 24
								: "",
							bottom: ["center", "bottom"].includes(textPlacement)
								? 24
								: "",
						}}
					>
						{text.content.split("\n").map((text, i) => (
							<li key={i} className="relative p-3 px-4 opacity-0">
								<div className="absolute inset-0 bg-black origin-bottom-left rounded skew-x-6"></div>
								<strong className="relative text-white inline-flex gap-2">
									{text.split(" ").map((t, i) => (
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
