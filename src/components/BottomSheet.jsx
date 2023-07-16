import { motion } from "framer-motion";
import BackToProjectButton from "./backToProjectButton";
import { useAppContext } from "../AppProvider";

const BottomSheet = ({ children }) => {
	const { closeBottomSheet } = useAppContext();

	return (
		<>
			<div
				className="fixed inset-0 z-50"
				onClick={closeBottomSheet}
			></div>

			<div className="relative">
				<div
					className="absolute bg-canvas h-4 top-0 inset-x-0"
					onClick={closeBottomSheet}
				></div>

				<motion.div
					initial={{ opacity: 0, y: 10 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: 10 }}
					className="z-[100] bottom-nav bg-card border-t relative rounded-t-2xl p-3"
				>
					<div className="absolute right-2 top-2">
						<BackToProjectButton />
					</div>

					{children}
				</motion.div>
			</div>
		</>
	);
};

export default BottomSheet;
