import { motion } from "framer-motion";
import BackToProjectButton from "./backToProjectButton";
import { useAppContext } from "../AppProvider";
import { useEffect, useRef } from "react";
import useOnClickOutside from "../hooks/useOnClickOutside";

const BottomSheet = ({ title, children }) => {
	const { closeBottomSheet } = useAppContext();
	const initialized = useRef(false);
	const bottomSheetRef = useRef(null);

	useOnClickOutside(bottomSheetRef, () => {
		if (initialized.current) closeBottomSheet();
	});

	useEffect(() => {
		setTimeout(() => {
			initialized.current = true;
		});
		() => (initialized.current = false);
	}, []);

	return (
		<>
			{/* <div
				className="fixed inset-0 z-50"
				onClick={closeBottomSheet}
			></div> */}

			<div ref={bottomSheetRef} className="relative pointer-events-auto">
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

					{title && (
						<h3 className="mt-2 mb-4 text-lg/none font-semibold ml-0.5">
							{title}
						</h3>
					)}

					{children}
				</motion.div>
			</div>
		</>
	);
};

export default BottomSheet;
