import { Outlet } from "react-router-dom";
import { useAppContext } from "../AppProvider";
import BottomSheet from "./BottomSheet";
import { themes } from "../utils";

export default function DesignEditor() {
	const { theme, updateTheme } = useAppContext();

	const handleImageSelected = (e) => {
		const files = e.target.files;
		if (!files?.length) return;

		const reader = new FileReader();
		reader.onload = (e) => {
			updateTheme({ image: e.target.result });
		};
		reader.readAsDataURL(files[0]);

		setTimeout(() => {
			e.target.value = null;
		});
	};

	return (
		<>
			<BottomSheet title="Card design">
				<div className="flex flex-col gap-4">
					<div className="flex flex-col gap-1">
						<span className="tex-sm/none">Theme</span>
						<div className="flex items-center gap-4">
							{Object.entries(themes).map(
								([themeName, themeDetails], index) => (
									<button
										className="relative h-9 w-9 rounded-full"
										style={{
											background:
												themeDetails.primaryColor,
										}}
										key={index}
										onClick={() =>
											updateTheme(themeDetails)
										}
									>
										{theme?.name == themeName && (
											<span className="absolute inset-1 border-2 border-card rounded-full"></span>
										)}
									</button>
								)
							)}
						</div>
					</div>

					<div className="flex flex-col items-start gap-1">
						<span className="tex-sm/none">Image</span>
						<label className="bg-content text-card sbg-gradient-to-r from-[#8BC34A] to-[#4CAF50] stext-white h-9 flex items-center pt-px px-3.5 text-sm/none font-medium rounded-full">
							<input
								className="hidden"
								type="file"
								onChange={handleImageSelected}
							/>
							Change Image
						</label>
					</div>
				</div>
			</BottomSheet>

			<Outlet />
		</>
	);
}
