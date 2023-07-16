import { useEffect, useRef, useState } from "react";

export default function useMusic() {
	const audioRef = useRef(new Audio());
	const audio = audioRef.current;
	const [playing, setPlaying] = useState(false);
	const onEndHandler = useRef(() => {});
	const onSongEnd = (callback) => (onEndHandler.current = callback);
	const playMusic = (src) => {
		src = `music/${src}.aac`;
		audio.src = src;
		audio.currentTime = 0;
		audio.play();

		setPlaying(true);
	};

	const stopMusic = () => {
		audio.pause();
		audio.currentTime = 0;
		setPlaying(false);
	};

	const togglePlay = () => {
		if (audio.paused) audio.play();
		else audio.pause();

		setPlaying(!audio.paused);
	};

	useEffect(() => {
		audio.addEventListener("ended", () => {
			setPlaying(false);
			onEndHandler.current();
		});
	}, []);

	return { playing, playMusic, togglePlay, stopMusic, onSongEnd };
}
