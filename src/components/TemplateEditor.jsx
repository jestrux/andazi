import { Outlet } from "react-router-dom";
import { useAppContext } from "../AppProvider";
import BottomSheet from "./BottomSheet";

export default function TemplateEditor() {
	const { template, updateTemplate } = useAppContext();

	return (
		<>
			<BottomSheet title="Card content">
				<div className="flex flex-col gap-4">
					<div className="grid grid-cols-2 gap-4">
						<div className="flex flex-col items-start gap-1">
							<span className="tex-sm/none">Groom</span>
							<input
								type="text"
								className="w-full border rounded py-2 px-2"
								placeholder="E.g. Samwel"
								value={template.groom}
								onChange={(e) =>
									updateTemplate({ groom: e.target.value })
								}
							/>
						</div>

						<div className="flex flex-col items-start gap-1">
							<span className="tex-sm/none">Bride</span>
							<input
								type="text"
								className="w-full border rounded py-2 px-2"
								placeholder="E.g. Esther"
								value={template.bride}
								onChange={(e) =>
									updateTemplate({ bride: e.target.value })
								}
							/>
						</div>
					</div>

					<div className="flex flex-col items-start gap-1">
						<span className="tex-sm/none">Parents</span>
						<input
							type="text"
							className="w-full border rounded py-2 px-2"
							placeholder="E.g. Mr. and Mrs. Hans Mungira"
							value={template.parents}
							onChange={(e) =>
								updateTemplate({ parents: e.target.value })
							}
						/>
					</div>

					<div className="grid grid-cols-2 gap-4">
						<div className="flex flex-col items-start gap-1">
							<span className="tex-sm/none">Church Time</span>
							<input
								type="text"
								className="w-full border rounded py-2 px-2"
								placeholder="E.g. 12 Noon"
								value={template.churchTime}
								onChange={(e) =>
									updateTemplate({
										churchTime: e.target.value,
									})
								}
							/>
						</div>

						<div className="flex flex-col items-start gap-1">
							<span className="tex-sm/none">Church Location</span>
							<input
								type="text"
								className="w-full border rounded py-2 px-2"
								placeholder="E.g. KKKT Kijitonyama"
								value={template.churchLocation}
								onChange={(e) =>
									updateTemplate({
										churchLocation: e.target.value,
									})
								}
							/>
						</div>
					</div>

					<div className="grid grid-cols-2 gap-4">
						<div className="flex flex-col items-start gap-1">
							<span className="tex-sm/none">Reception Time</span>
							<input
								type="text"
								className="w-full border rounded py-2 px-2"
								placeholder="E.g. 12 Noon"
								value={template.receptionTime}
								onChange={(e) =>
									updateTemplate({
										receptionTime: e.target.value,
									})
								}
							/>
						</div>

						<div className="flex flex-col items-start gap-1">
							<span className="tex-sm/none">
								Reception Location
							</span>
							<input
								type="text"
								className="w-full border rounded py-2 px-2"
								placeholder="E.g. Police Mess Hall Tabata"
								value={template.receptionLocation}
								onChange={(e) =>
									updateTemplate({
										receptionLocation: e.target.value,
									})
								}
							/>
						</div>
					</div>

					<div className="grid grid-cols-2 gap-4">
						<div className="flex flex-col items-start gap-1">
							<span className="tex-sm/none">Dress Code</span>
							<input
								type="text"
								className="w-full border rounded py-2 px-2"
								placeholder="E.g. party decent wear"
								value={template.dressCode}
								onChange={(e) =>
									updateTemplate({
										dressCode: e.target.value,
									})
								}
							/>
						</div>

						<div className="flex flex-col items-start gap-1">
							<span className="tex-sm/none">Theme Color</span>
							<input
								type="text"
								className="w-full border rounded py-2 px-2"
								placeholder="E.g. party decent wear"
								value={template.themeColor}
								onChange={(e) =>
									updateTemplate({
										themeColor: e.target.value,
									})
								}
							/>
						</div>
					</div>
				</div>
			</BottomSheet>

			<Outlet />
		</>
	);
}
