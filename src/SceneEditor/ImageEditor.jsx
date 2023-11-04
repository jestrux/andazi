import { useAppContext } from "../AppProvider";
import BottomSheet from "../components/BottomSheet";
import ButtonGroup from "../components/ButtonGroup";
import { Outlet, useNavigate } from "react-router-dom";

const ImageEditor = () => {
	const navigate = useNavigate();
	const { selectedScene, updateSelectedScene } = useAppContext();
	const image = selectedScene?.image;
	const selectedFilter = image?.filter || "normal";

	const updateImage = (newProps = {}) => {
		updateSelectedScene({
			image: {
				...(image || {}),
				...newProps,
			},
		});
	};

	return (
		<>
			<BottomSheet>
				<div className="flex flex-col gap-2.5 pl-1">
					<div className="-ml-1 flex items-center">
						<button
							className="border h-8 flex items-center pt-px px-3 text-sm/none font-semibold rounded-full"
							onClick={() => navigate("search")}
						>
							Change Image
						</button>
					</div>

					<div className="flex items-center justify-between gap-2">
						<span className="tex-sm/none">Filter</span>

						<ButtonGroup
							choices={["normal", "grayscale", "sepia"]}
							value={selectedFilter}
							onChange={(filter) => updateImage({ filter })}
						/>
					</div>
				</div>
			</BottomSheet>

			<div className="bottom-nav z-[200] fixed inset-0 pointer-events-none">
				<Outlet />
			</div>
		</>
	);
};

export default ImageEditor;
