import { ComponentType, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const requireAuth = <P extends object>(WrappedComponent: ComponentType<P>) => {
  const WithAuthComponent = (props: P) => {
    const navigate = useNavigate();
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

    useEffect(() => {
      if (!isLoggedIn) {
        navigate("/", { replace: true });
      }
    }, [isLoggedIn, navigate]);

    return isLoggedIn ? <WrappedComponent {...props} /> : null;
  };

  return WithAuthComponent;
};

export default requireAuth;
