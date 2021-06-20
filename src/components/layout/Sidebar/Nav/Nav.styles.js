import {AnimationClassNames, getFocusStyle} from '@fluentui/react';

export function getStyles(
  {
    isSelected,
    hasChildren,
    nestingLevel,
    isCollapsed,
    scrollTop,
    isChildLinkSelected,
    hasGroupName,
    theme,
  }
) {
  const {semanticColors, fonts} = theme;

  const navFontSize = fonts.medium.fontSize;
  const navTextColor = semanticColors.menuItemText;
  const navWidth = 280;
  const navCollapsedWidth = 48;
  const shortenedIconWidth = 32;
  const navFloatingWidth = 230;
  const navItemHeight = 48;
  const navChildItemHeight = 32;
  const navBackgroundColor = semanticColors.menuBackground;
  const floatingNavBackgroundColor = semanticColors.menuBackground;
  const navItemHoverColor = semanticColors.menuItemBackgroundHovered;
  const navGroupSeparatorItemHeight = 40;
  const navGroupSeparatorWithGroupNameHeight = 70;
  const navItemWithChildBgColor = semanticColors.menuItemBackgroundPressed;
  const navItemSelectedColor = semanticColors.menuItemBackgroundPressed;
  const navItemIndentSize = 50;
  const navFloatingItemIndentSize = 20;
  const BackDropSelector =
    '@supports (backdrop-filter: blur(20px)) or (-webkit-backdrop-filter: blur(20px))';
  const MouseEnabledDeviceSelector = '@media (hover: hover) and (pointer: fine)';

  return {
    root: {
      width: isCollapsed ? navCollapsedWidth : navWidth,
      height: '100vh',
      backgroundColor: navBackgroundColor,
      color: navTextColor,
      borderRightStyle: 'solid',
      borderRightWidth: '1px',
      borderRightColor: semanticColors.bodyFrameDivider,
      selectors: {
        ul: {
          listStyleType: 'none',
          padding: 0,
          margin: 0,
          fontSize: navFontSize,
          selectors: {
            [MouseEnabledDeviceSelector]: {
              selectors: {
                'li:hover >div': {
                  display: 'block'
                }
              }
            }
          },
        },
        a: {
          color: `${navTextColor} !important`,
          outline: 'none'
        }
      }
    },
    navItemRoot: {
      height:
        !!nestingLevel && nestingLevel > 0 ? navChildItemHeight : navItemHeight,
      cursor: 'pointer',
      paddingLeft:
        !!nestingLevel && nestingLevel > 0
          ? nestingLevel * navItemIndentSize
          : 'inherit',
      selectors: {
        ':hover': {
          backgroundColor: hasChildren
            ? navItemWithChildBgColor
            : navItemHoverColor
        },
        ':active': {
          backgroundColor: navItemSelectedColor
        }
      }
    },
    navItemBarMarker: {
      marginLeft:
        !!nestingLevel && nestingLevel > 0 && !hasChildren ? '-10px' : '6px',
      marginRight:
        !!nestingLevel && nestingLevel > 0 && !hasChildren ? '8px' : '0px',
      marginTop: !!nestingLevel && nestingLevel > 0 ? '7px' : '12px',
      width: '2px',
      height: !!nestingLevel && nestingLevel > 0 ? '18px' : '24px',
      backgroundColor: '#0078D4',
      display: isSelected || isChildLinkSelected ? 'inline-block' : 'none',
      borderWidth: 0
    },
    navItemIconColumn: {
      width:
        isSelected || isChildLinkSelected
          ? shortenedIconWidth
          : navCollapsedWidth,
      fontSize: '16px',
      lineHeight:
        !!nestingLevel && nestingLevel > 0 ? navChildItemHeight : navItemHeight,
      textAlign: 'center',
      color: navTextColor,
      verticalAlign: 'top'
    },
    navItemNameColumn: {
      width: '100%',
      marginLeft:
        isChildLinkSelected ||
        (!hasChildren && isSelected && !(nestingLevel && nestingLevel > 0))
          ? '8px'
          : '0px',
      lineHeight:
        !!nestingLevel && nestingLevel > 0 ? navChildItemHeight : navItemHeight,
      verticalAlign: 'top',
      display: 'inline-block',
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      color: navTextColor
    },
    navSlimItemRoot: {
      selectors: {
        ':hover': {
          backgroundColor: hasChildren
            ? navItemWithChildBgColor
            : navItemHoverColor
        }
      }
    },
    navFloatingRoot: [
      {
        display: 'none',
        zIndex: 1901,
        position: 'absolute',
        marginLeft: navCollapsedWidth,
        marginTop:
          -navItemHeight - (!!scrollTop && scrollTop > 0 ? scrollTop : 0),
        width: navFloatingWidth,
        color: navTextColor,
        boxShadow:
          '0px 1.2px 3.6px rgba(0, 0, 0, 0.18), 0px 6.4px 14.4px rgba(0, 0, 0, 0.22)',
        backgroundColor: floatingNavBackgroundColor,
        opacity: '0.6',
        selectors: {
          [BackDropSelector]: {
            webkitBackdropFilter: 'blur(20px) saturate(125%)',
            backdropFilter: 'blur(20px) saturate(125%)',
            backgroundColor: 'rgba(255,255,255,.6)'
          },
          a: {
            width: '100%',
            backgroundColor: 'inherit'
          }
        }
      },
      AnimationClassNames.slideRightIn20
    ],
    navFloatingItemRoot: {
      height:
        !!nestingLevel && nestingLevel > 0 ? navChildItemHeight : navItemHeight,
      cursor: 'pointer',
      backgroundColor: !(nestingLevel && nestingLevel > 0)
        ? navItemHoverColor
        : floatingNavBackgroundColor,
      paddingLeft: navFloatingItemIndentSize,
      selectors: {
        ':hover': {
          backgroundColor: navItemHoverColor
        },
        ':active': {
          backgroundColor: navItemSelectedColor
        }
      }
    },
    navGroupSeparatorRoot: {
      width: '100%',
      height: hasGroupName
        ? navGroupSeparatorWithGroupNameHeight
        : navGroupSeparatorItemHeight,
      textAlign: 'center'
    },
    navGroupSeparatorHrLine: {
      position: 'relative',
      height: '20px',
      borderBottom: `1px solid ${navItemWithChildBgColor}`
    },
    navGroupSeparatorHeaderGroupName: {
      position: 'absolute',
      marginTop: '40px',
      left: '16px',
      color: navTextColor,
      fontWeight: 'bold'
    },
    navToggler: {
      height: navItemHeight,
      cursor: 'pointer',
      selectors: {
        ':hover': {
          backgroundColor: navItemHoverColor
        }
      },
      textAlign: 'left'
    },
    focusedStyle: [
      getFocusStyle(
        theme,
        undefined,
        undefined,
        undefined,
        'transparent',
        undefined
      ),
      {
        display: 'block',
        position: 'relative',
        height:
          !!nestingLevel && nestingLevel > 0
            ? navChildItemHeight
            : navItemHeight,
        width: '100%',
        lineHeight:
          !!nestingLevel && nestingLevel > 0
            ? navChildItemHeight
            : navItemHeight
      }
    ]
  };
}
