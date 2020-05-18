import React from "react";

export class NavBase extends React.Component {
  _hasAtleastOneHiddenLink = false;

  getPreferredSelectedKey() {
    let selectedKey = "";
    // if caller passes in selectedKey, use it as first choice or use current state.selectedKey
    if (this.props.selectedKey) {
      selectedKey = this.props.selectedKey;
    } else if (this.state.selectedKey) {
      selectedKey = this.state.selectedKey;
    }
    return selectedKey;
  }

  /* given a link, find if one of the child is selected */
  isChildLinkSelected(link) {
    const selectedKey = this.getPreferredSelectedKey();
    if (!selectedKey || !link?.links?.length) {
      return false;
    }
    return link.links.some(childLink => {
      return !!childLink && childLink.key === selectedKey;
    });
  }

  // given a link and an optional includeChildren parameter, find if the link or any of the children is selected
  isLinkSelected(link, includeChildren) {
    const selectedKey = this.getPreferredSelectedKey();
    if (!selectedKey || !link) {
      return false;
    }
    // check if the link or any of the child link is selected
    return (
      link.key === selectedKey ||
      (includeChildren && this.isChildLinkSelected(link))
    );
  }

  getLinkText(link, showMore) {
    if (!link) {
      return undefined;
    }
    if (link.isShowMoreLink && !showMore && link.alternateText) {
      // if the link is show more/less link, based on the showMore state; return "Show more" localized text
      return link.alternateText;
    }
    return link.name;
  }

  // find if atleast one child link is visible using isHidden property
  // showMore flag will overwrite isHidden property
  hasAtleastOneVisibleLink(links, showMore) {
    return links?.length && (
      links.some(link => {
        return !link.isHidden;
      }) || !!showMore
    );
  }
}