import { Outlet } from "react-router-dom";
import { useAppContext } from "../AppProvider";
import BottomSheet from "./BottomSheet";

export default function ContactEditor() {
	const { template, updateTemplate } = useAppContext();

	return (
		<>
			<BottomSheet title="RSVP Contacts">
				<div className="flex flex-col gap-4">
					{template.contacts.map((contact, index) => (
						<div key={index} className="pb-2s border-b">
							<h2 className="mb-1 font-bold">
								Contact {index + 1}
							</h2>

							<div className="grid grid-cols-2 gap-4">
								<div className="flex flex-col items-start gap-1">
									<span className="tex-sm/none">Name</span>
									<input
										type="text"
										className="w-full border rounded py-2 px-2"
										placeholder="E.g. Samwel"
										value={contact.name}
										onChange={(e) =>
											updateTemplate({
												groom: e.target.value,
											})
										}
									/>
								</div>

								<div className="flex flex-col items-start gap-1">
									<span className="tex-sm/none">
										Phone Number
									</span>
									<input
										type="text"
										className="w-full border rounded py-2 px-2"
										placeholder="E.g. 0711 011 990"
										value={contact.phoneNumber}
										onChange={(e) =>
											updateTemplate({
												bride: e.target.value,
											})
										}
									/>
								</div>
							</div>
						</div>
					))}
				</div>
			</BottomSheet>

			<Outlet />
		</>
	);
}
