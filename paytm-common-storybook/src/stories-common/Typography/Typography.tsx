import React from "react";

import tokens from "../../../configs/design-tokens.json";
import { capitalizeFirstLetter } from "../../utils/utils";
import { TEXT_STYLES } from "./styleConfigs";
import cx from "../../utils/classNames";
import s from "./Typography.module.scss";

const Typography: React.FC<{}> = () => {
  const getTypeDisplayName = (name: string) => {
    return TEXT_STYLES[name]?.displayName || capitalizeFirstLetter(name);
  };

  const getStyleObject = (input: { [x: string]: { [x: string]: string } }) => {
    let styles = Object.entries(input).map(([property, valueObj = {}]) => {
      let propName = property
        ?.split("-")
        ?.map((namePart, idx) =>
          idx > 0 ? capitalizeFirstLetter(namePart) : namePart
        )
        ?.join("");
      return [propName, valueObj.value];
    });
    return Object.fromEntries(styles);
  };

  return (
    <div className={s.typeContainer}>
      <section className={cx(s.section, s.scaleSection)}>
        <label className={s.sectionHeading}>Type Scale</label>
        <div className={s.sectionBody}>
          <table className={s.scaleTable}>
            <thead>
              <tr>
                <th>Scale Category</th>
                <th>Size</th>
                <th>Line Height</th>
                <th>Tracking</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(tokens?.typography?.scale).map(([name, meta]) => (
                <tr>
                  <td
                    style={{
                      ...getStyleObject(meta),
                      fontWeight: 700
                    }}
                  >
                    {getTypeDisplayName(name)}
                  </td>
                  <td>{meta["font-size"].value.replace("px", "")}</td>
                  <td>{meta["line-height"].value.replace("px", "")}</td>
                  <td>{parseFloat(meta["letter-spacing"].value.replace("px", ""))/1.0}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <section className={cx(s.section, s.weightSection)}>
        <label className={s.sectionHeading}>Type Weight</label>
        <div className={s.sectionBody}>
          {Object.entries(tokens?.typography?.weight).map(([weight, meta]) => (
            <div className={s.weightContainer}>
              <label className={s.weightName}>{capitalizeFirstLetter(weight)}</label>
              <div className={s.weightDemoContainer}>
                {Object.entries(tokens?.typography?.scale).map(
                  ([name, scalesMeta]) => (
                    <label
                      style={{
                        ...getStyleObject(scalesMeta),
                        fontWeight: meta.value
                      }}
                    >
                      {`${getTypeDisplayName(name)} - ${scalesMeta[
                        "font-size"
                      ].value.replace("px", "")}/${scalesMeta[
                        "line-height"
                      ].value.replace("px", "")}`}
                    </label>
                  )
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Typography;
