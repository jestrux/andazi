import { Outlet, useNavigate } from "react-router-dom";
import BackToProjectButton from "../components/backToProjectButton";
import { motion } from "framer-motion";

const SceneEditor = () => {
	const navigate = useNavigate();

	return (
		<motion.div
			initial={{ opacity: 0, y: 10 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: 10 }}
			className="z-50 fixed inset-0 bottom-0 flex flex-col justify-end"
		>
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
		</motion.div>
	);
};

export default SceneEditor;
