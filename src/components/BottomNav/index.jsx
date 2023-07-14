import MainMenu from "./MainMenu";
import SceneMenu from "./SceneMenu";
import MusicMenu from "./MusicMenu";
import { useAppContext } from "../../AppProvider";

const BottomNav = () => {
	const { currentScreen } = useAppContext();

	const Menu = () => {
		switch (currentScreen) {
			case "scenes":
				return <SceneMenu />;

			case "music":
				return <MusicMenu />;

			default:
				return <MainMenu />;
		}
	};

	return <div className="bottom-nav bg-canvas">{Menu()}</div>;
};

export default BottomNav;
