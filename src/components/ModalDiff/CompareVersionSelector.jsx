import React, { useMemo } from "react";
import {
  DEFAULT_DARK_THEME_NAME,
  Dropdown,
  DropdownItem,
  getThemeProperty,
  useTheme
} from "pi-ui";
import styles from "./ModalDiff.module.css";
import IconButton from "../IconButton";
import PropTypes from "prop-types";
import { COMPARE, BASE } from "./const";

const CompareVersionSelector = ({
  onChange,
  className,
  latest,
  base,
  compare
}) => {
  const { theme, themeName } = useTheme();
  const isDarkTheme = themeName === DEFAULT_DARK_THEME_NAME;
  const darkIconColor = getThemeProperty(theme, "text-color");
  const iconColor = isDarkTheme ? darkIconColor : undefined;
  const versionsOptions = useMemo(() => {
    const versions = [];
    for (let index = latest; index >= 0; index--) {
      versions.push(index);
    }
    return versions;
  }, [latest]);
  const ZERO_VERSION_ALIAS = "----------";
  return (
    <div className={styles.versionSelectorContainer}>
      <Dropdown
        title={base ? `version ${base}` : ZERO_VERSION_ALIAS}
        className={styles.versionSelectorWrapper}
        itemsListClassName={className}>
        {versionsOptions.map((v) => {
          return (
            compare > v && (
              <DropdownItem
                key={v}
                onClick={() => {
                  onChange(BASE, v);
                }}>
                {v ? `version ${v}` : ZERO_VERSION_ALIAS}
              </DropdownItem>
            )
          );
        })}
      </Dropdown>
      <IconButton
        className={styles.versionCompareIcon}
        iconColor={iconColor}
        type="compare"
      />
      <Dropdown
        title={`version ${compare}`}
        className={styles.versionSelectorWrapper}
        itemsListClassName={className}>
        {versionsOptions.map((v) => {
          return (
            base < v && (
              <DropdownItem
                key={v}
                onClick={() => {
                  onChange(COMPARE, v);
                }}>
                version {v}
              </DropdownItem>
            )
          );
        })}
      </Dropdown>
    </div>
  );
};
CompareVersionSelector.propTypes = {
  onChange: PropTypes.func.isRequired,
  latest: PropTypes.number.isRequired,
  base: PropTypes.number.isRequired,
  compare: PropTypes.number.isRequired,
  baseLoading: PropTypes.bool,
  compareLoading: PropTypes.bool
};

export default CompareVersionSelector;
