import React, { useMemo, useState } from "react";

// Airline tail logos (IATA) — bundled for offline Storybook (Kiwi images CDN).
import logo6E from "./story-assets/airlines/6E.png";
import logoAI from "./story-assets/airlines/AI.png";
import logoSG from "./story-assets/airlines/SG.png";
import logoUK from "./story-assets/airlines/UK.png";

import s from "./AirlineLogo.module.scss";

const LOGO_BY_IATA: Record<string, string> = {
  "6E": logo6E,
  AI: logoAI,
  SG: logoSG,
  UK: logoUK,
};

function initialsFromName(name: string) {
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) {
    return `${parts[0][0] ?? ""}${parts[1][0] ?? ""}`.toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
}

export interface AirlineLogoProps {
  iata: string;
  airlineName: string;
}

const AirlineLogo: React.FC<AirlineLogoProps> = ({ iata, airlineName }) => {
  const [broken, setBroken] = useState(false);
  const src = LOGO_BY_IATA[iata];
  const initials = useMemo(() => initialsFromName(airlineName), [airlineName]);

  if (!src || broken) {
    return (
      <div className={s.fallback} aria-hidden title={airlineName}>
        {initials}
      </div>
    );
  }

  return (
    <img
      className={s.img}
      src={src}
      alt=""
      width={36}
      height={36}
      loading="lazy"
      decoding="async"
      onError={() => setBroken(true)}
    />
  );
};

export default React.memo(AirlineLogo);
