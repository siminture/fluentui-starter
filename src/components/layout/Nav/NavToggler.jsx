import * as React from "react";
import { Nav } from "./Nav";
import { SlimNav } from "./SlimNav";
import { getStyles } from "./Nav.styles";
import {
  styled,
  classNamesFunction
} from "office-ui-fabric-react/lib/Utilities";
import { NavLink } from "./NavLink";
import {
  FocusZone,
  FocusZoneDirection
} from "office-ui-fabric-react/lib/FocusZone";

const getClassNames = classNamesFunction();

class NavTogglerComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isNavCollapsed: props.isNavCollapsed ? props.isNavCollapsed : false,
      showMore: props.showMore ? props.showMore : false
    };

    this._onShowMoreLinkClicked = this._onShowMoreLinkClicked.bind(this);
  }

  render() {
    if (!this.props.groups || this.props.groups.length === 0) {
      return null;
    }

    const { isNavCollapsed, showMore } = this.state;

    const { styles, groups, theme } = this.props;
    const classNames = getClassNames(styles, {
      isCollapsed: isNavCollapsed,
      theme: theme
    });

    const toggleNavGroups = groups.filter(navGroup => {
      return !!navGroup && navGroup.groupType === "ToggleGroup";
    });

    const nonToggleNavGroups = groups.filter(navGroup => {
      return !!navGroup && navGroup.groupType !== "ToggleGroup";
    });

    return (
      <div className={classNames.root}>
        <FocusZone direction={FocusZoneDirection.vertical}>
          <nav role="navigation">
            {this._renderExpandCollapseNavItem(toggleNavGroups)}
            {isNavCollapsed ? (
              <SlimNav
                groups={nonToggleNavGroups}
                selectedKey={this.props.selectedKey}
                navScrollerId={this.props.navScrollerId}
                dataHint={this.props.dataHint}
                enableCustomization={this.props.enableCustomization}
                showMore={showMore}
                onShowMoreLinkClicked={this._onShowMoreLinkClicked}
                onEditLeftNavClickedCallback={
                  this.props.onEditLeftNavClickedCallback
                }
              />
            ) : (
              <Nav
                groups={nonToggleNavGroups}
                selectedKey={this.props.selectedKey}
                dataHint={this.props.dataHint}
                enableCustomization={this.props.enableCustomization}
                showMore={showMore}
                onShowMoreLinkClicked={this._onShowMoreLinkClicked}
                onNavNodeExpandedCallback={this.props.onNavNodeExpandedCallback}
                onEditLeftNavClickedCallback={
                  this.props.onEditLeftNavClickedCallback
                }
              />
            )}
          </nav>
        </FocusZone>
      </div>
    );
  }

  _onNavCollapseClicked(ev) {
    this.setState(prevState => {
      const isNavCollapsed = !prevState.isNavCollapsed;

      // inform the caller about the collapse event
      if (!!this.props.onNavCollapsedCallback) {
        this.props.onNavCollapsedCallback(isNavCollapsed);
      }

      return {
        isNavCollapsed: isNavCollapsed
      };
    });

    ev.preventDefault();
    ev.stopPropagation();
  }

  _renderExpandCollapseNavItem(toggleNavGroups) {
    if (
      (!!toggleNavGroups && toggleNavGroups.length === 0) ||
      !toggleNavGroups[0].links ||
      toggleNavGroups[0].links.length === 0
    ) {
      // There is no toggle group with links defined
      return null;
    }

    const isNavCollapsed = this.state.isNavCollapsed;
    const { styles, dataHint, theme } = this.props;
    const classNames = getClassNames(styles, { theme: theme });
    const link = toggleNavGroups[0].links[0];
    const ariaLabel = isNavCollapsed ? link.name : link.alternateText;

    return (
      <NavLink
        id={link.key}
        href={link.url}
        onClick={this._onNavCollapseClicked.bind(this)}
        ariaExpanded={!isNavCollapsed}
        dataHint={dataHint}
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

    this.setState(prevState => {
      // let the consumer know about the "show more" or "show less" event
      if (this.props.onShowMoreLinkClicked) {
        this.props.onShowMoreLinkClicked(ev, !prevState.showMore);
      }

      return {
        showMore: !prevState.showMore
      };
    });
  }
}

export const NavToggler = styled(NavTogglerComponent, getStyles);
/* tslint:enable */
