import {
	MusicalNoteIcon,
	RectangleStackIcon,
} from "@heroicons/react/24/outline";
import { Stage, PlayButton } from "./Player";

export default function PlayerScreen() {
	return (
		<>
			<div className="flex-1 flex items-stretch bg-canvas overflow-auto relative">
				<Stage />
			</div>

			<div className="bottom-nav">
				<div className="h-full py-1 bg-card border-t flex items-center justify-between gap-3">
					<button className="flex flex-col gap-1 items-center justify-center flex-1 flex-shrink-0">
						<RectangleStackIcon width={20} />
						<span className="text-xs/none font-light opacity-70">
							Scenes
						</span>
					</button>
					{/* <button className="flex flex-col gap-1 items-center justify-center flex-1 flex-shrink-0">
						<SwatchIcon width={20} />
						<span className="text-xs/none font-light opacity-70">
							Theme
						</span>
					</button> */}

					<PlayButton />

					<button className="flex flex-col gap-1 items-center justify-center flex-1 flex-shrink-0">
						<MusicalNoteIcon width={20} />
						<span className="text-xs/none font-light opacity-70">
							Music
						</span>
					</button>
					{/* <button className="flex flex-col gap-1 items-center justify-center flex-1 flex-shrink-0">
						<FolderOpenIcon width={20} />
						<span className="text-xs/none font-light opacity-70">
							Assets
						</span>
					</button> */}
				</div>
			</div>
		</>
	);
}
