import AppProvider, { useAppContext } from "./AppProvider";
import { Outlet, useLocation } from "react-router-dom";
import Card from "./components/Card";

const App = () => {
	const { pathname } = useLocation();
	const { selectedScene, editorAnimator } = useAppContext();

	const handleShare = async () => {
		try {
			const dataUrl = await window.domtoimage.toPng(
				document.querySelector("#cardPreview")
			);
			const response = await fetch(dataUrl);
			const blob = await response.blob();
			const file = new File([blob], "invitation-card.png", {
				type: "image/png",
			});

			if (navigator.share && navigator.canShare) {
				await navigator.share({ files: [file] });
				console.log("Share was successful.");
			} else {
				const link = document.createElement("a");
				link.href = dataUrl;
				link.download = "invitation-card.png";
				link.click();
				link.remove();
			}
		} catch (error) {
			console.log("Sharing failed", error);
		}
	};

	return (
		<>
			<div id="appWrapper" className="flex flex-col">
				<div className="nav-bar bg-card">
					<div className="h-14 p-3 border-b flex items-center">
						<button
							className="flex items-center"
							onClick={() => window.location.reload()}
						>
							<img
								className="h-7 mr-0.5"
								src="icon-512.png"
								alt=""
							/>
							<h1 className="font-bold text-xl/none pt-1 logo">
								ndazi
							</h1>
						</button>

						<div className="flex-1"></div>

						<button
							className="bg-white/5 border border-neutral-200/80 dark:border-white/5 h-9 flex items-center gap-2 rounded-full px-3.5"
							onClick={handleShare}
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
									// d="M12 4.5v15m7.5-7.5h-15"
									fill="none"
									d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
									stroke="url(#grad1)"
									strokeWidth="3"
									// strokeWidth="3.5"
									strokeLinecap="round"
								/>
							</svg>
							<span className="mr-0.5 text-sm/none">Share</span>
						</button>
					</div>
				</div>

				<div className="flex-1 bg-canvas overflow-auto relative p-6">
					<Card />
				</div>

				{/* <div className="flex-1 flex items-stretch bg-canvas overflow-auto relative">
					<div className="shadow-xl h-full w-full relative overflow-hidden">
						<div className="absolute inset-x-6">
							<Card />
						</div>
					</div>
				</div> */}

				<Outlet />
			</div>
		</>
	);
};

export default function AppWrapper() {
	return (
		<AppProvider>
			<App />
		</AppProvider>
	);
}
