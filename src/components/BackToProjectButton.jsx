import { XMarkIcon } from "@heroicons/react/24/outline";
import { useAppContext } from "../AppProvider";
import { useNavigate, useParams } from "react-router-dom";
export default function BackToProjectButton() {
	const navigate = useNavigate();
	const { sceneId } = useParams();
	const { setCurrentScreen } = useAppContext();

	return (
		<button
			className="flex items-center justify-center bg-card border rounded-full w-7 p-1.5"
			onClick={() =>
				sceneId
					? navigate("/", { replace: true })
					: setCurrentScreen("/")
			}
		>
			<XMarkIcon width={20} strokeWidth={3} />
		</button>
	);
}
