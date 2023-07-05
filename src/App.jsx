import { Outlet } from "react-router-dom";

function App() {
	return (
		<div id="appWrapper" className="flex flex-col">
			<Outlet />
		</div>
	);
}

export default App;
