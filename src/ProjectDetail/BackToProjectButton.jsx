import { XMarkIcon } from "@heroicons/react/24/outline";
import { Link, useLocation, useParams } from "react-router-dom";

export default function BackToProjectButton() {
	const { state } = useLocation();
	const { projectId } = useParams();

	return (
		<Link
			className="flex items-center justify-center border rounded-full w-7 p-1.5"
			replace
			to={`/${projectId}`}
			state={{ project: state?.project }}
		>
			<XMarkIcon width={20} strokeWidth={3} />
		</Link>
	);
}
