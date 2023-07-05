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
import Projects from "./Projects";
import ProjectDetail from "./ProjectDetail";

const router = createHashRouter(
	createRoutesFromElements(
		<Route path="/" element={<App />}>
			<Route index element={<Projects />} />
			<Route path=":projectId" element={<ProjectDetail />} />
		</Route>
	)
);

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
