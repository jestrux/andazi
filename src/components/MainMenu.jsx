import {
	AdjustmentsHorizontalIcon,
	AtSymbolIcon,
	PhoneIcon,
	UserCircleIcon,
} from "@heroicons/react/24/outline";
import {} from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

export default function MainMenu() {
	return (
		<div className="bottom-nav pt-3 pb-1 bg-card border-t flex items-center justify-between gap-3">
			<Link
				className="flex flex-col gap-1.5 items-center justify-center flex-1 flex-shrink-0"
				to="design"
			>
				<AdjustmentsHorizontalIcon width={24} />
				<span className="text-xs/none font-light opacity-70">
					Card Design
				</span>
			</Link>

			<Link
				className="flex flex-col gap-1.5 items-center justify-center flex-1 flex-shrink-0"
				to="template"
			>
				<AtSymbolIcon width={24} />
				<span className="text-xs/none font-light opacity-70">
					Card Content
				</span>
			</Link>

			<Link
				className="flex flex-col gap-1.5 items-center justify-center flex-1 flex-shrink-0"
				to="contacts"
			>
				<PhoneIcon width={22} />
				<span className="text-xs/none font-light opacity-70">
					Contacts
				</span>
			</Link>

			<Link
				className="flex flex-col gap-1.5 items-center justify-center flex-1 flex-shrink-0"
				to="guest"
			>
				<UserCircleIcon width={24} />
				<span className="text-xs/none font-light opacity-70">
					Guest Info
				</span>
			</Link>
		</div>
	);
}
