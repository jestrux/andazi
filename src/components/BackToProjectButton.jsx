import { XMarkIcon } from "@heroicons/react/24/outline";
import { useAppContext } from "../AppProvider";
export default function BackToProjectButton() {
	const { closeBottomSheet } = useAppContext();

	return (
		<button
			className="flex items-center justify-center bg-card border rounded-full w-7 p-1.5"
			onClick={closeBottomSheet}
		>
			<XMarkIcon width={20} strokeWidth={3} />
		</button>
	);
}
