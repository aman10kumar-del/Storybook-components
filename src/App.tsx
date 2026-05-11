import { useMemo, useState } from "react";
import { AppScreenSelectionContext } from "./AppScreenSelectionContext";
import { AppSidebar } from "./AppSidebar";
import appStyles from "./App.module.css";
import {
  SelectedCategoryContextProvider,
  type SelectedCategoryBrowse,
} from "./SelectedCategoryContext";
import {
  SelectedStoreContextProvider,
  type SelectedStoreHome,
} from "./SelectedStoreContext";
import {
  SelectedEmiProductContextProvider,
  type SelectedEmiProductPayload,
} from "./SelectedEmiProductContext";
import {
  APP_SCREENS,
  CATEGORY_BROWSE_SCREEN_ID,
  HOME_PAGE_SCREEN_ID,
} from "./screens";
import { ScreenRouter } from "./screens/ScreenRouter";
import { usePodsTheme } from "./usePodsTheme";

const STORYBOOK_URL =
  import.meta.env.VITE_STORYBOOK_URL ?? "http://localhost:6010";

export default function App() {
  const { mode, setMode } = usePodsTheme();
  const [selectedId, setSelectedId] = useState(APP_SCREENS[0]?.id ?? "");
  const [selectedStoreHome, setSelectedStoreHome] = useState<SelectedStoreHome | null>(
    null,
  );
  const [selectedCategoryBrowse, setSelectedCategoryBrowse] =
    useState<SelectedCategoryBrowse | null>(null);
  const [selectedEmiProduct, setSelectedEmiProduct] = useState<SelectedEmiProductPayload | null>(
    null,
  );

  const handleSelectScreen = (id: string) => {
    if (id === HOME_PAGE_SCREEN_ID) {
      setSelectedStoreHome(null);
      setSelectedCategoryBrowse(null);
      setSelectedEmiProduct(null);
    }
    if (id === CATEGORY_BROWSE_SCREEN_ID) {
      setSelectedCategoryBrowse((prev) => prev ?? { id: "iphones", label: "iPhones" });
    }
    setSelectedId(id);
  };

  const storeHomeValue = useMemo(
    () => ({ selectedStoreHome, setSelectedStoreHome }),
    [selectedStoreHome],
  );

  const categoryValue = useMemo(
    () => ({ selectedCategoryBrowse, setSelectedCategoryBrowse }),
    [selectedCategoryBrowse],
  );

  const emiProductValue = useMemo(
    () => ({ selectedEmiProduct, setSelectedEmiProduct }),
    [selectedEmiProduct],
  );

  return (
    <SelectedStoreContextProvider value={storeHomeValue}>
      <SelectedCategoryContextProvider value={categoryValue}>
      <SelectedEmiProductContextProvider value={emiProductValue}>
      <AppScreenSelectionContext.Provider value={setSelectedId}>
        <div className={appStyles.shell}>
          <AppSidebar
            screens={APP_SCREENS}
            selectedId={selectedId}
            onSelectScreen={handleSelectScreen}
            themeMode={mode}
            onThemeModeChange={setMode}
            storybookUrl={STORYBOOK_URL}
          />
          <main className={appStyles.main}>
            <div className={appStyles.mainStage}>
              <ScreenRouter screenId={selectedId} />
            </div>
          </main>
        </div>
      </AppScreenSelectionContext.Provider>
      </SelectedEmiProductContextProvider>
    </SelectedCategoryContextProvider>
    </SelectedStoreContextProvider>
  );
}
