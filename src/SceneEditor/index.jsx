import { Outlet, useNavigate } from "react-router-dom";
import BackToProjectButton from "../components/backToProjectButton";

const SceneEditor = () => {
	const navigate = useNavigate();

	return (
		<div className="z-50 fixed inset-0 bottom-0 flex flex-col justify-end">
			<div
				className="absolute inset-0 bg-black/10"
				onClick={() => navigate("/")}
			></div>
			<div
				className="relative bg-card rounded-t-2xl border-t p-4"
				style={{ minHeight: "140px" }}
			>
				<div className="absolute right-2 top-2">
					<BackToProjectButton />
				</div>

				<Outlet />
			</div>
		</div>
	);
};

export default SceneEditor;
