import { useParams } from "react-router";

export const withRouter = (WrappedComponent: any) => (props: JSX.IntrinsicAttributes) => {
    const params = useParams();
    // etc... other react-router-dom v6 hooks
  
    return (
      <WrappedComponent
        {...props}
        params={params}
        // etc...
      />
    );
};