import { Link } from "react-router-dom";
import {
	MusicalNoteIcon,
	RectangleStackIcon,
} from "@heroicons/react/24/outline";
import { PlayButton } from "../Player";

export default function MainMenu() {
	return (
		<div className="h-full py-1 bg-card border-t flex items-center justify-between gap-3">
			<Link
				to="scenes"
				className="flex flex-col gap-1 items-center justify-center flex-1 flex-shrink-0"
			>
				<RectangleStackIcon width={20} />
				<span className="text-xs/none font-light opacity-70">
					Scenes
				</span>
			</Link>
			{/* <button className="flex flex-col gap-1 items-center justify-center flex-1 flex-shrink-0">
						<SwatchIcon width={20} />
						<span className="text-xs/none font-light opacity-70">
							Theme
						</span>
					</button> */}

			<PlayButton />

			<Link
				to="music"
				className="flex flex-col gap-1 items-center justify-center flex-1 flex-shrink-0"
			>
				<MusicalNoteIcon width={20} />
				<span className="text-xs/none font-light opacity-70">
					Music
				</span>
			</Link>
			{/* <button className="flex flex-col gap-1 items-center justify-center flex-1 flex-shrink-0">
						<FolderOpenIcon width={20} />
						<span className="text-xs/none font-light opacity-70">
							Assets
						</span>
					</button> */}
		</div>
	);
}
