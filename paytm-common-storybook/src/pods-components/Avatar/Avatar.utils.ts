import { InitialsColorType } from "./Avatar.types";

const COLOR_PAIRS: Record<number, { background: string; text: string }> = {
  1: { background: "#E6E5FF", text: "#4D49B8" }, // lavender
  2: { background: "#D5E7F6", text: "#326691" }, // water
  3: { background: "#BAF3E9", text: "#147361" }, // pepperMint
  4: { background: "#C0FFBE", text: "#009954" }, // frostedMint
  5: { background: "#CEDCB4", text: "#3E5513" }, // sprout
  6: { background: "#FEEBAC", text: "#97770C" }, // earlyDawn
  7: { background: "#FFE0BC", text: "#6F503C" }, // wheatField
  8: { background: "#FFDDDD", text: "#A52B2B" }, // mistyRose
  9: { background: "#FFCEEA", text: "#B83380" }, // softPeach
  10: { background: "#F9C9CC", text: "#84161D" }, // lightRose
  11: { background: "#F0E6FF", text: "#7649B8" }, // purpleChalk
  12: { background: "#F1D5F6", text: "#A749B8" }  // plum
};

export const VALID_COLORS: InitialsColorType[] = [
  "lavender",
  "water",
  "pepperMint",
  "frostedMint",
  "sprout",
  "earlyDawn",
  "wheatField",
  "mistyRose",
  "softPeach",
  "lightRose",
  "purpleChalk",
  "plum"
];

function getRandomColor(): InitialsColorType {
  const randomIndex = Math.floor(Math.random() * VALID_COLORS.length);
  return VALID_COLORS[randomIndex];
}

export function getInitialsColorClass(color: InitialsColorType, key: string): string {
  let finalColor = color;
  if (color === "deterministic") {
    finalColor = getColorsIntByKey(key);
  }
  if (color === "random") {
    finalColor = getRandomColor();
  }

  return finalColor;
}

export function getAvatarColorPair(key: string): { background: string; text: string; colorName: string } {
  const semanticColor = getColorsIntByKey(key);
  const colorIndex = VALID_COLORS.indexOf(semanticColor) + 1;
  return { ...COLOR_PAIRS[colorIndex], colorName: semanticColor };
}

// functions to mimic native behavior of finding the deterministic color
function getColorsIntByKey(key: string) {
  const keyHash = consistentHash(key);
  const colorName = VALID_COLORS[Math.abs(keyHash) % VALID_COLORS.length];
  return colorName;
}

function consistentHash(str: string) {
  if (!str || str.length === 0) {
      return 0;
  }
  
  let hash = 5381;
  const MODULO = VALID_COLORS.length;
  
  const encoder = new TextEncoder();
  const bytes = encoder.encode(str);
  
  for (let i = 0; i < bytes.length; i++) {
      const charValue = bytes[i];
      const position = i + 1;
      const weight = ((position * 17) + (charValue % 7)) % MODULO;
      const combined = ((charValue * weight * position) + (position * 13)) % MODULO;
      hash = ((hash * 31) + (combined * 23)) % MODULO;
  }
  
  return hash;
}