import React from "react";
import { Link } from "@fluentui/react";
import { useHistory } from "react-router-dom";

export function RouteLink(props) {
  const history = useHistory();
  const handleClick = (e) => {
    e.preventDefault();
    props.href && history.push(props.href);
  };

  return <Link {...props} onClick={handleClick} />;
}

