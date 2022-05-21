import React from "react";
import { useLocation } from "react-router";

interface StringParamHandlerRouteProps {
  children: any,
  param: string
}

export function StringParamHandlerRoute(props: StringParamHandlerRouteProps) {
  const { search } = useLocation();
  const query = new URLSearchParams(search);

  let params: any = {};
  params[props.param] = query.get(props.param);

  const childrenWithProps = React.Children.map(props.children, child => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { ...params });
    }
    return child;
  });

  return <>{childrenWithProps}</>
}