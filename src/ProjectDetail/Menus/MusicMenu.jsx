import { useProjectContext } from "../ProjectContext";
import BackToProjectButton from "../backToProjectButton";

export default function MusicMenu() {
	const { project } = useProjectContext();

	if (!project) return;

	return (
		<div className="bg-card border-t relative rounded-t-2xl">
			<div className="pl-4 pr-2 mt-2 flex items-center justify-between">
				<h3 className="text-lg/none font-bold">Some music choices</h3>
				<BackToProjectButton />
			</div>

			<div className="py-2"></div>
		</div>
	);
}
