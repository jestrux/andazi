import React from "react";
import ReactDOM from "react-dom/client";
import {
	Route,
	createRoutesFromElements,
	RouterProvider,
	createHashRouter,
} from "react-router-dom";

import App from "./App";
import "./index.css";

import SceneEditor from "./SceneEditor";
import ImageEditor from "./SceneEditor/ImageEditor";
import BackgroundEditor from "./SceneEditor/BackgroundEditor";
import TextEditor from "./SceneEditor/TextEditor";
import SceneMenu from "./components/SceneMenu";
import MainMenu from "./components/MainMenu";
import SearchImages from "./SceneEditor/SearchImages";
import DesignEditor from "./components/DesignEditor";
import GuestEditor from "./components/GuestEditor";
import TemplateEditor from "./components/TemplateEditor";
import ContactEditor from "./components/ContactEditor";

const router = createHashRouter(
	createRoutesFromElements(
		<Route path="/" element={<App />}>
			<Route index element={<MainMenu />} />
			<Route path="design" element={<DesignEditor />} />
			<Route path="template" element={<TemplateEditor />} />
			<Route path="contacts" element={<ContactEditor />} />
			<Route path="guest" element={<GuestEditor />} />
			<Route path="scenes" element={<SceneMenu />}>
				<Route path=":sceneId" element={<SceneEditor />}>
					<Route
						path="edit-background"
						element={<BackgroundEditor />}
					/>
					<Route path="edit-image" element={<ImageEditor />}>
						<Route path="search" element={<SearchImages />} />
					</Route>
					<Route path="edit-text" element={<TextEditor />} />
				</Route>
			</Route>
		</Route>
	)
);

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
