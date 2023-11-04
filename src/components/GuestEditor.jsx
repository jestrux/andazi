import { Outlet } from "react-router-dom";
import { useAppContext } from "../AppProvider";
import BottomSheet from "./BottomSheet";

export default function GuestEditor() {
	const { guest, updateGuest } = useAppContext();

	return (
		<>
			<BottomSheet title="Guest details">
				<div className="flex flex-col gap-4">
					<div className="flex flex-col items-start gap-1">
						<span className="tex-sm/none">Name and Title</span>
						<input
							type="text"
							className="w-full border rounded py-2 px-2"
							placeholder="Mr. Juma Kondo"
							value={guest.name}
							onChange={(e) =>
								updateGuest({ name: e.target.value })
							}
						/>
					</div>

					<div className="flex flex-col gap-1">
						<span className="tex-sm/none">Card type</span>
						<div className="flex items-center gap-4">
							<div className="flex items-center flex-wrap gap-2">
								{["Single", "Double"].map((choice, index) => (
									<button
										key={index}
										className={`h-9 px-4 border rounded-md text-sm/none flex items-center justify-center
											${guest.cardType == choice ? "bg-content text-card" : ""}
										`}
										onClick={() =>
											updateGuest({ cardType: choice })
										}
									>
										{choice}
									</button>
								))}
							</div>
						</div>
					</div>
				</div>
			</BottomSheet>

			<Outlet />
		</>
	);
}
