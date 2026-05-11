import React, { useEffect, useRef, useState } from "react";

import iconsList from "../../../configs/icons-list.esm.js";
import Search from "../../pods-components/Search/Search";
import Separator from "../../pods-components/Separator/Separator";
import { ReactComponent as CrossIcon } from "../../assets/ultra-icons/system/nav/dismiss.svg";
import { ReactComponent as CopyIcon} from "../../assets/ultra-icons/system/action/copy.svg";
import cx from "../../utils/classNames";
import s from "./Icons.module.scss";

/** Same logic as `scripts/get-icon-path.js` (CJS); inlined for Vite/ESM Storybook. */
function getIconPath(iconPath: string) {
  const splitByPath = iconPath.split("/");
  const iconName = splitByPath[splitByPath.length - 1];
  const delimiters = ["_"];
  const delimiterPattern = new RegExp(`[${delimiters.join("")}]`, "g");
  const finalName = iconName
    .toLowerCase()
    .split(delimiterPattern)
    .filter((word) => word.length > 0)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");
  const finalPath =
    splitByPath.slice(0, splitByPath.length - 1).join("/") + "/" + finalName;
  return { finalName, finalPath };
}

const Icons: React.FC<{}> = () => {
  const [currentIcon, setCurrentIcon] = useState("");
  const [searchVal, setSearchVal] = useState("");

	const getImportPath = (type: "mf" | "npm-default" | "npm-named") => {
    const {finalName, finalPath} = getIconPath(currentIcon)
    switch (type) {
      case "mf":
        return ``
      case "npm-default":
        return `import ${finalName}Icon from "@paytm-h5-common/paytm_common_ui/icons/${finalPath}"`
      case "npm-named":
        return `import { ${iconsList[currentIcon + ".svg" as keyof typeof iconsList]} } from "@paytm-h5-common/paytm_common_ui/icons"`
    }
	}

	const copyToClipboard = async (type: "mf" | "npm-default" | "npm-named") => {
		try {
			await navigator?.clipboard?.writeText(getImportPath(type))
		} catch (e) {
			console.log("Failed to copy: ", e)
		}
	}

  const renderIconSection = (size: string, icons: string[]) => {
    return (
      <section className={cx(s.iconSection, `${s[size]}`)}>
        <label className={s.sectionName}>{size}</label>
        <div className={s.icons}>
          {icons
            .filter((icon) =>
              icon?.toLowerCase()?.includes(searchVal.toLowerCase())
            )
            ?.map((icon) => (
              <div
                className={s.iconBox}
                key={icon}
                onClick={() => {
                  setCurrentIcon(icon.replace(".svg", ""));
                }}
              >
								<Icon name={icon} />
              </div>
            ))}
        </div>
      </section>
    );
  };

  return (
    <div className={s.iconsListContainer}>
      <div className={s.search}>
        <Search
          onChange={(val) => {
            setSearchVal(val);
          }}
          onClear={() => {
            setSearchVal("");
          }}
          label="Search Icons"
          stroke
          customClass="zero-margin full-width"
        />
      </div>
      {renderIconSection(
        "system",
        Object.keys(iconsList).filter((icon) => icon.includes("system"))?.sort()
      )}
      {renderIconSection(
        "standard",
        Object.keys(iconsList).filter((icon) => icon.includes("standard"))?.sort()
      )}
      {currentIcon && (
        <div className={s.modal}>
          <div
            className={s.backdrop}
            onClick={() => {
              setCurrentIcon("");
            }}
          />
          <div className={s.content}>
            <section className={s.titleSection}>
              <label className={s.iconName}>{currentIcon}</label>
              <span
                className={s.dismissIcon}
                onClick={() => {
                  setCurrentIcon("");
                }}
              >
                <CrossIcon />
              </span>
            </section>
            <section className={s.separator}>
              <Separator hairline />
            </section>
            <section className={s.codeSection}>
              <label className={s.codeSectionName}>NPM Default Import</label>
              <code className={s.code}>{getImportPath("npm-default")}</code>
							<span 
								className={s.copyIcon}
								onClick={() => {copyToClipboard("npm-default")}}
							>
								<CopyIcon color="var(--icon-neutral-inverse)" />
							</span>
            </section>
						<section className={s.codeSection}>
							<label className={s.codeSectionName}>NPM Named Import</label>
							<code className={s.code}>{getImportPath("npm-named")}</code>
							<span 
								className={s.copyIcon}
								onClick={() => {copyToClipboard("npm-named")}}
							>
								<CopyIcon color="var(--icon-neutral-inverse)"/>
							</span>
            </section>
          </div>
        </div>
      )}
    </div>
  );
};

const Icon = (props: { name: string }) => {
  const { name } = props;
  const ImportedIconRef = useRef<React.FC<React.SVGProps<SVGSVGElement>>>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    import(`../../assets/ultra-icons/${props.name}`)
      .then((comp) => {
        ImportedIconRef.current = comp.ReactComponent;
        setLoading(false);
      })
      .catch((e) => {
        console.error("Failed to fetch icon: ", e);
      });
  }, []);

  if (!name || loading || !ImportedIconRef.current) return null;
  return <ImportedIconRef.current />;
};

export default React.memo(Icons);
