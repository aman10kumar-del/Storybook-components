import React from "react";

import { TEXT_STYLES } from "./styleConfigs";
import tokens from  "../../../configs/design-tokens.json"
import { capitalizeFirstLetter, rgbToHex } from "../../utils/utils";
import cx from "../../utils/classNames";
import s from "./Colors.module.scss"

interface ColorToken {
  type: string;
  value: string;
}

interface TokenObject {
  [key: string]: ColorToken | TokenObject;
}

interface ColorPrimitives {
  [colorName: string]: {
    [shade: string]: ColorToken;
  };
}

const isColorToken = (value: any): value is ColorToken => {
  return value && typeof value === "object" && "type" in value && "value" in value;
};

const Colors : React.FC<{}> = () => {

  const styles = getComputedStyle(document.documentElement)

  const getColorDisplayName = (type: string,  name: string) => {
    return TEXT_STYLES[`${type}-${name}`]?.displayName || capitalizeFirstLetter(name)
  }

  const getColorValue = (type: string, semanticLabel:string, theme: "light" | "dark") => {
    try {
      let colorValue: string;
      const semantics = tokens["color-semantics"][theme] as TokenObject;
      
      // Handle component-specific nested tokens
      if (type === "button" || type === "badge" || type === "switch" || type === "segmented-control" || type === "chips") {
        const path = semanticLabel.split("-");
        let current = semantics[type] as TokenObject;
        for (let i = 0; i < path.length - 1; i++) {
          current = current[path[i]] as TokenObject;
        }
        colorValue = (current[path[path.length - 1]] as ColorToken).value;
      } else {
        // Handle regular tokens
        colorValue = ((semantics[type] as TokenObject)[semanticLabel] as ColorToken).value;
      }

      if (colorValue.startsWith("#")) {
        return colorValue;
      }
      const [,colorName, shade] = colorValue.split(".")
      const primitives = tokens["color-primitives"] as ColorPrimitives;
      return primitives[colorName][shade.replace("}", "")].value;
    } catch (error) {
      console.error(`Error getting color value for ${type} ${semanticLabel} ${theme}:`, error);
      return "#000000"; // fallback color
    }
  }

  const renderColorBox = (type: string, semanticLabel:string, theme: "light" | "dark") => {
    const colorValue = getColorValue(type, semanticLabel, theme)
    return (
      <div
        style={{
          background: colorValue
        }}
        className={cx(s.colorCard, {
          [s.whiteText]: TEXT_STYLES[theme][`${type}-${semanticLabel}`]?.color === "white",
          [s.border]: TEXT_STYLES[theme][`${type}-${semanticLabel}`]?.border
        })}
      >
        <label className={s.colorName}>{semanticLabel}</label>
        <label className={s.colorCode}>{colorValue}</label>
      </div>
    )
  }

  const flattenTokens = (obj: TokenObject): [string, string][] => {
    const result: [string, string][] = [];
    
    const traverse = (current: TokenObject | ColorToken, path: string[] = []) => {
      if (isColorToken(current)) {
        // If it's a ColorToken
        result.push([path.join("-"), current.value]);
      } else {
        // If it's a TokenObject
        Object.entries(current).forEach(([key, value]) => {
          traverse(value as (TokenObject | ColorToken), [...path, key]);
        });
      }
    };
    
    traverse(obj);
    return result;
  }

  return (
    <div className={s.colorsContainer}>
      {Object.entries(tokens["color-semantics"].light).map(([type, properties], idx) => {
        // Skip non-color sections
        if (type === "number-primitives" || type === "number-semantics") {
          return null;
        }

        const flatTokens = flattenTokens(properties as TokenObject);
        
        return(
          <section key={type}>
            <label className={s.sectionHeading}>{capitalizeFirstLetter(type)}</label>
            <div className={s.themeHeader}>
              <label>Light</label>
              <label>Dark</label>
            </div>
            {
              flatTokens.map(([semanticLabel], tokenIdx) => {
                return (
                  <div key={`${idx}-${tokenIdx}`} className={s.colorsRow}> 
                   {renderColorBox(type, semanticLabel, "light")}
                   {renderColorBox(type, semanticLabel, "dark")}
                </div>
                )
              })
            }
          </section>
        )
      })} 
    </div>
  )
}

export default Colors