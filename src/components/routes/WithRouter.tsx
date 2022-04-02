import React from "react";
import { useParams, useLocation } from "react-router";

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

export const withRouter = (WrappedComponent: any) => (props: JSX.IntrinsicAttributes) => {
    const params = useParams();
    const query = useQuery();
    // etc... other react-router-dom v6 hooks
  
    return (
      <WrappedComponent
        {...props}
        params={params}
        query={query}
        // etc...
      />
    );
};