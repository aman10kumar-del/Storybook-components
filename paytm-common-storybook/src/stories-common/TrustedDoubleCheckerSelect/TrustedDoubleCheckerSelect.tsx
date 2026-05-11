import React, { useCallback, useMemo, useState } from "react";

import type { InitialsColorType } from "../../pods-components/Avatar/Avatar.types";
import Avatar from "../../pods-components/Avatar/Avatar";
import Button from "../../pods-components/Button/Button";
import Card from "../../pods-components/Card/Card";
import { HeaderDefault } from "../../pods-components/Header/Header";
import PaymentsContactGrid, {
  type PaymentsContactGridItem,
} from "../../pods-components/PaymentsContactGrid/PaymentsContactGrid";
import Search from "../../pods-components/Search/Search";
import SectionHeader from "../../pods-components/SectionHeader/SectionHeader";
import { triggerCallback } from "../../utils/utils";

import avatarA from "./story-assets/avatar-a.png";
import avatarB from "./story-assets/avatar-b.png";
import avatarC from "./story-assets/avatar-c.png";

import s from "./TrustedDoubleCheckerSelect.module.scss";

export interface TrustedDoubleCheckerContact {
  id: string;
  name: string;
  phone: string;
}

type SuggestionDef = {
  id: string;
  label: string;
} & (
  | { variant: "profile"; imageURL: string }
  | { variant: "initials"; initials: string; initialsColor: InitialsColorType }
);

const SUGGESTION_DEFS: SuggestionDef[] = [
  { id: "sg1", label: "Aastha Bhat", variant: "profile", imageURL: avatarA },
  { id: "sg2", label: "Deepa", variant: "initials", initials: "DE", initialsColor: "lightRose" },
  { id: "sg3", label: "Amit Beta", variant: "profile", imageURL: avatarB },
  { id: "sg4", label: "Devika", variant: "profile", imageURL: avatarC },
  { id: "sg5", label: "Rahul", variant: "profile", imageURL: avatarC },
  { id: "sg6", label: "Devika", variant: "profile", imageURL: avatarB },
  { id: "sg7", label: "Sukhi Maid", variant: "profile", imageURL: avatarA },
  {
    id: "sg8",
    label: "Aastha Bhat",
    variant: "initials",
    initials: "AB",
    initialsColor: "water",
  },
];

const DEFAULT_CONTACTS: TrustedDoubleCheckerContact[] = [
  { id: "c1", name: "Aastha Bhat", phone: "9727344555" },
  { id: "c2", name: "Rahul", phone: "9727344555" },
  { id: "c3", name: "Sonia Patel", phone: "9727344556" },
  { id: "c4", name: "Anil Kumar", phone: "9727344557" },
  { id: "c5", name: "Meera Singh", phone: "9727344558" },
  { id: "c6", name: "Ravi Sharma", phone: "9727344559" },
  { id: "c7", name: "Nisha Rani", phone: "9727344560" },
  { id: "c8", name: "Deepak Joshi", phone: "9727344561" },
];

function matchesQuery(q: string, name: string, phone: string) {
  const n = q.trim().toLowerCase();
  if (!n) {
    return true;
  }
  return (
    name.toLowerCase().includes(n) ||
    phone.replace(/\s+/g, "").includes(n.replace(/\s+/g, ""))
  );
}

function listAvatarFor(contact: TrustedDoubleCheckerContact) {
  const parts = contact.name.trim().split(/\s+/);
  const initials =
    parts.length >= 2
      ? `${parts[0][0] ?? ""}${parts[1][0] ?? ""}`.toUpperCase()
      : contact.name.slice(0, 2).toUpperCase();
  return (
    <Avatar
      type="initials"
      size="regular"
      avatarInitials={{ initials, initialsColor: "deterministic" }}
    />
  );
}

export interface TrustedDoubleCheckerSelectProps {
  contacts?: TrustedDoubleCheckerContact[];
  onBack?: () => void;
  onSelectSuggestion?: (id: string) => void;
  onSelectContact?: (id: string) => void;
  onChangeContact?: (id: string) => void;
}

const TrustedDoubleCheckerSelect: React.FC<TrustedDoubleCheckerSelectProps> = ({
  contacts = DEFAULT_CONTACTS,
  onBack,
  onSelectSuggestion,
  onSelectContact,
  onChangeContact,
}) => {
  const [query, setQuery] = useState("");

  const handleSearchChange = useCallback((value: string) => {
    setQuery(value);
  }, []);

  const suggestionItems: PaymentsContactGridItem[] = useMemo(() => {
    return SUGGESTION_DEFS.filter((d) => matchesQuery(query, d.label, "")).map(
      (d): PaymentsContactGridItem => {
        if (d.variant === "profile") {
          return {
            id: d.id,
            variant: "profile",
            label: d.label,
            imageURL: d.imageURL,
            onClick: () => triggerCallback(onSelectSuggestion, d.id),
          };
        }
        return {
          id: d.id,
          variant: "initials",
          label: d.label,
          initials: d.initials,
          initialsColor: d.initialsColor,
          onClick: () => triggerCallback(onSelectSuggestion, d.id),
        };
      },
    );
  }, [onSelectSuggestion, query]);

  const filteredContacts = useMemo(
    () => contacts.filter((c) => matchesQuery(query, c.name, c.phone)),
    [contacts, query],
  );

  return (
    <div className={s.root} data-testid="trusted-double-checker-select">
      <div className={s.scroll}>
        <HeaderDefault
          size="large"
          showBack
          onBackClick={onBack}
          title="Select a Trusted DoubleChecker"
          subTitle="Double check your risky payments & save yourself from scams"
        />

        <div className={s.searchWrap}>
          <Search
            label="Search For Name or Mobile no."
            showDismissIcon={false}
            onChange={handleSearchChange}
            onClear={() => setQuery("")}
          />
        </div>

        <div className={s.suggestionsBlock}>
          <SectionHeader size="medium" title="Suggestions" customClass={s.sectionHeaderSpacing} />
          {suggestionItems.length > 0 ? (
            <PaymentsContactGrid items={suggestionItems} columnsPerRow={4} />
          ) : null}
        </div>

        <SectionHeader size="medium" title="All Contacts" customClass={s.sectionHeaderSpacing} />

        <Card customClass={s.contactListCard}>
          {filteredContacts.map((c, index) => (
            <React.Fragment key={c.id}>
              <div className={s.listRow}>
                <div className={s.listRowLeading}>{listAvatarFor(c)}</div>
                <button
                  type="button"
                  className={s.listMain}
                  data-testid={`trusted-dc-row-${c.id}`}
                  aria-label={`Select ${c.name}`}
                  onClick={() => triggerCallback(onSelectContact, c.id)}
                >
                  <span className={s.listName}>{c.name}</span>
                  <span className={s.listPhone}>{c.phone}</span>
                </button>
                <div className={s.listTrailing}>
                  <Button
                    type="link"
                    size="small"
                    label="Change"
                    onClick={() => triggerCallback(onChangeContact, c.id)}
                  />
                </div>
              </div>
              {index < filteredContacts.length - 1 ? <div className={s.rowSeparator} aria-hidden /> : null}
            </React.Fragment>
          ))}
        </Card>

        <footer className={s.footer}>
          <span className={s.footerBrand}>Paytm</span>
          <span className={s.footerDivider} aria-hidden />
          <p className={s.footerSub}>Powered by Circle</p>
        </footer>
      </div>
    </div>
  );
};

export default React.memo(TrustedDoubleCheckerSelect);
