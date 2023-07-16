import {
	MusicalNoteIcon,
	RectangleStackIcon,
} from "@heroicons/react/24/outline";
import PlayButton from "../PlayButton";
import { useAppContext } from "../../AppProvider";
import { Link } from "react-router-dom";

export default function MainMenu() {
	const { setCurrentScreen } = useAppContext();

	return (
		<div className="h-full py-1 bg-card border-t flex items-center justify-between gap-3">
			<Link
				className="flex flex-col gap-1 items-center justify-center flex-1 flex-shrink-0"
				to="scenes"
			>
				<RectangleStackIcon width={20} />
				<span className="text-xs/none font-light opacity-70">
					Scenes
				</span>
			</Link>

			<PlayButton />

			<button
				className="flex flex-col gap-1 items-center justify-center flex-1 flex-shrink-0"
				onClick={() => setCurrentScreen("music")}
			>
				<MusicalNoteIcon width={20} />
				<span className="text-xs/none font-light opacity-70">
					Music
				</span>
			</button>
		</div>
	);
}
