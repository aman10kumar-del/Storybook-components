import {
  Button,
  Card,
  List,
  ListItem,
  SectionHeader,
  SegmentedControl,
} from "@paytm-h5-common/paytm_common_ui";
import { DocumentIcon } from "@paytm-h5-common/paytm_common_ui/icons";
import type { AppScreen } from "./screens";
import type { PodsThemeMode } from "./usePodsTheme";
import s from "./AppSidebar.module.scss";

const THEME_TABS = [
  { id: "light" as const, title: "Light" },
  { id: "dark" as const, title: "Dark" },
];

type Props = {
  screens: AppScreen[];
  selectedId: string;
  onSelectScreen: (id: string) => void;
  themeMode: PodsThemeMode;
  onThemeModeChange: (mode: PodsThemeMode) => void;
  storybookUrl: string;
};

export function AppSidebar({
  screens,
  selectedId,
  onSelectScreen,
  themeMode,
  onThemeModeChange,
  storybookUrl,
}: Props) {
  return (
    <aside className={s.sidebar}>
      <div className={s.scroll}>
        <div className={s.brand}>
          <p className={s.brandTitle}>PODS AI WGMI</p>
          <p className={s.brandSub}>
            Playground nav — PL❤️E flows (Figma) + your backlog.
          </p>
        </div>

        <div className={s.sectionHeaderTight}>
          <SectionHeader title="Appearance" size="medium" />
          <Card customClass={s.cardBlock}>
            <SegmentedControl
              controlType="controlled"
              customClass={s.themeSegment}
              tabs={THEME_TABS}
              controlled={{ activeTabID: themeMode }}
              onChange={(tab) => {
                const id = String(tab.id);
                if (id === "light" || id === "dark") {
                  onThemeModeChange(id);
                }
              }}
            />
          </Card>
        </div>

        <div className={s.sectionHeaderTight}>
          <SectionHeader title="Screens" size="medium" />
          <Card customClass={s.cardBlock}>
            <List>
              {screens.map((screen, index) => (
                <ListItem
                  key={screen.id}
                  id={screen.id}
                  primary={screen.title}
                  leading={{
                    type: "icon",
                    Icon: <DocumentIcon role="presentation" />,
                    size: "small",
                  }}
                  trailing={{
                    type: "badge",
                    badge: {
                      context: screen.status === "built" ? "positive" : "notice",
                      label: screen.status === "built" ? "Built" : "Planned",
                      muted: screen.status === "planned",
                    },
                  }}
                  separator={index < screens.length - 1}
                  onClick={() => onSelectScreen(screen.id)}
                  customClass={
                    selectedId === screen.id ? s.listItemSelected : undefined
                  }
                />
              ))}
            </List>
          </Card>
        </div>
      </div>

      <div className={s.footer}>
        <Button
          type="link"
          size="medium"
          label="Open Storybook (PODS)"
          onClick={() => {
            window.open(storybookUrl, "_blank", "noopener,noreferrer");
          }}
        />
      </div>
    </aside>
  );
}
