import { useAppContext } from "../AppProvider";

const ImageEditor = () => {
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
		<div className="">
			<h3 className="mb-4 text-lg/none font-semibold ml-0.5">
				Edit image
			</h3>

			<div className="mt-4 flex items-center gap-3">
				{["normal", "grayscale", "sepia"].map((filter, index) => (
					<button
						key={index}
						className={`py-1 px-3 border rounded capitalize
						${selectedFilter == filter ? "bg-content text-card" : ""}
						`}
						onClick={() => updateImage({ filter })}
					>
						{filter}
					</button>
				))}
			</div>
		</div>
	);
};

export default ImageEditor;
