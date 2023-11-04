import { useEffect, useState } from "react";
import { useAppContext } from "../AppProvider";
import BottomSheet from "../components/BottomSheet";

const SearchImages = () => {
	const {
		selectedScene,
		updateSelectedScene,
		closeBottomSheet,
		project,
		updateProject,
	} = useAppContext();
	const [images, setImages] = useState([]);
	const image = selectedScene?.image;

	const searchUnsplash = async (q) => {
		setImages([]);

		const params = new URLSearchParams({
			query: q,
			per_page: 24,
			client_id:
				"17ef130962858e4304efe9512cf023387ee5d36f0585e4346f0f70b2f9729964",
		});
		const res = await fetch(
			`https://api.unsplash.com/${
				q?.length ? "search/" : ""
			}photos?${params}`
		).then((res) => res.json());

		const results = (res.results || res).map(
			({ color, description, urls, user }) => {
				return { color, description, urls, url: urls.regular, user };
			}
		);

		setImages(results);
		// console.log(results);
	};

	useEffect(() => {
		// searchUnsplash();
		// searchUnsplash(project.imageSearchQuery);
		// updateProject({imageSearchQuery: project.imageSearchQuery})
	}, []);

	const handleSearch = (e) => {
		updateProject({ imageSearchQuery: e.target.value });
		searchUnsplash(e.target.value);
	};

	const updateImage = (newProps = {}) => {
		updateSelectedScene({
			image: {
				...(image || {}),
				...newProps,
			},
		});

		closeBottomSheet();
	};

	return (
		<BottomSheet>
			<div
				className="bg-white flex flex-col"
				style={{ height: "100svh" }}
			>
				<div className="border-b -mx-4 px-4 pb-3">
					<h3 className="mb-4 text-lg/none font-semibold ml-0.5">
						Search images
					</h3>

					<input
						className="py-2 px-3 bg-neutral-100 border rounded w-full focus:outline-none"
						type="search"
						placeholder="Type to search"
						value={project.imageSearchQuery}
						onChange={handleSearch}
					/>
				</div>

				<div className="flex-1 overflow-auto grid grid-cols-2 gap-2 pt-3 pb-6">
					{images.map((image, index) => (
						<div
							key={index}
							className="aspect-[1/1.2] rounded-lg"
							style={{ background: image.color }}
							onClick={() => updateImage({ url: image.url })}
						>
							<img
								id="image"
								className="w-full h-full rounded-lg object-cover"
								src={image.url}
								alt=""
							/>
						</div>
					))}
				</div>
			</div>
		</BottomSheet>
	);
};

export default SearchImages;
