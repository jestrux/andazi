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

import AppProvider from "./AppProvider";
import SceneEditor from "./SceneEditor";
import ImageEditor from "./SceneEditor/ImageEditor";
import BackgroundEditor from "./SceneEditor/BackgroundEditor";
import TextEditor from "./SceneEditor/TextEditor";

const router = createHashRouter(
	createRoutesFromElements(
		<Route path="/" element={<App />}>
			<Route path=":sceneId" element={<SceneEditor />}>
				<Route path="edit-background" element={<BackgroundEditor />} />
				<Route path="edit-image" element={<ImageEditor />} />
				<Route path="edit-text" element={<TextEditor />} />
			</Route>
		</Route>
	)
);

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<AppProvider>
			<RouterProvider router={router} />
		</AppProvider>
	</React.StrictMode>
);
