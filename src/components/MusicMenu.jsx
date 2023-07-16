import { useEffect } from "react";
import { useAppContext } from "../AppProvider";
import BottomSheet from "./BottomSheet";

const musicChoices = [
	"dance",
	"generic",
	"groovy",
	"happy",
	"lofi",
	"melodic",
	"whimsy",
];

export default function MusicMenu() {
	const { musicTrack, setMusicTrack, playingMusic, playMusic, stopMusic } =
		useAppContext();

	const handleSelectMusic = (choice) => {
		if (musicTrack == choice && playingMusic) stopMusic();
		else {
			setMusicTrack(choice);
			playMusic(choice);
		}
	};

	useEffect(() => {
		return () => stopMusic();
	}, []);

	return (
		<BottomSheet>
			<h3 className="mb-5 text-lg/none font-semibold ml-0.5">
				Add some music
			</h3>

			<div className="flex items-center flex-wrap gap-2">
				{musicChoices.map((choice, index) => (
					<button
						key={index}
						className={`h-9 px-4 border rounded-md text-sm/none flex items-center justify-center
						${choice == musicTrack ? "bg-content text-card" : ""}
						`}
						onClick={() => handleSelectMusic(choice)}
					>
						{choice}
					</button>
				))}
			</div>
		</BottomSheet>
	);
}
