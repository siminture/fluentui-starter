import React from "react";
import {
  styled,
  classNamesFunction,
  FocusZone,
  FocusZoneDirection,
} from "@fluentui/react";

import { Nav } from "./Nav";
import { SlimNav } from "./SlimNav";
import { getStyles } from "./Nav.styles";
import { NavLink } from "./NavLink";

const getClassNames = classNamesFunction();

class NavTogglerComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isNavCollapsed:
        localStorage.getItem("NavToggler.isNavCollapsed") === "true" ||
        window.innerWidth < 720,
      showMore: localStorage.getItem("NavToggler.showMore") === "true",
    };
    this._onShowMoreLinkClicked = this._onShowMoreLinkClicked.bind(this);
  }

  render() {
    const { styles, groups, theme } = this.props;
    const { isNavCollapsed, showMore } = this.state;

    if (!groups?.length) {
      return null;
    }

    const classNames = getClassNames(styles, {
      isCollapsed: isNavCollapsed,
      theme: theme,
    });

    const toggleNavGroups = groups.filter(
      (navGroup) => navGroup?.groupType === "ToggleGroup"
    );
    const nonToggleNavGroups = groups.filter(
      (navGroup) => navGroup?.groupType !== "ToggleGroup"
    );

    return (
      <div className={classNames.root}>
        <FocusZone direction={FocusZoneDirection.vertical}>
          <nav role="navigation">
            {this._renderExpandCollapseNavItem(toggleNavGroups)}
            {isNavCollapsed ? (
              <SlimNav
                groups={nonToggleNavGroups}
                selectedKey={this.props.selectedKey}
                showMore={showMore}
                onShowMoreLinkClicked={this._onShowMoreLinkClicked}
              />
            ) : (
              <Nav
                groups={nonToggleNavGroups}
                selectedKey={this.props.selectedKey}
                showMore={showMore}
                onShowMoreLinkClicked={this._onShowMoreLinkClicked}
              />
            )}
          </nav>
        </FocusZone>
      </div>
    );
  }

  _onNavCollapseClicked(ev) {
    ev.preventDefault();
    ev.stopPropagation();
    this.setState((prevState) => {
      localStorage.setItem(
        "NavToggler.isNavCollapsed",
        prevState.isNavCollapsed ? "false" : "true"
      );
      return { isNavCollapsed: !prevState.isNavCollapsed };
    });
  }

  _renderExpandCollapseNavItem(toggleNavGroups) {
    const { styles, theme } = this.props;
    const { isNavCollapsed } = this.state;

    const link = toggleNavGroups?.[0]?.links?.[0];

    if (!link) {
      // There is no toggle group with links defined
      return null;
    }

    const classNames = getClassNames(styles, { theme: theme });
    const ariaLabel = isNavCollapsed ? link.name : link.alternateText;

    return (
      <NavLink
        id={link.key}
        href={link.url}
        onClick={this._onNavCollapseClicked.bind(this)}
        ariaExpanded={!isNavCollapsed}
        dataValue={link.key}
        ariaLabel={ariaLabel}
        rootClassName={classNames.navToggler}
        leftIconName={link.icon}
        iconClassName={classNames.navItemIconColumn}
        barClassName={classNames.navItemBarMarker}
        focusedStyle={classNames.focusedStyle}
        role="menu"
        title={link.title}
      />
    );
  }

  _onShowMoreLinkClicked(ev) {
    ev.preventDefault();
    ev.stopPropagation();
    this.setState((prevState) => {
      localStorage.setItem(
        "NavToggler.showMore",
        prevState.showMore ? "false" : "true"
      );
      return { showMore: !prevState.showMore };
    });
  }
}

export const NavToggler = styled(NavTogglerComponent, getStyles);
