import { useLocation, useNavigate } from "react-router-dom";

export const useGoBack = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const thereIsAPrevPage = location.key !== "default";
    if (thereIsAPrevPage) {
      return (_arg) => navigate(-1);
    } else {
      return ({ fallback }) => navigate(fallback || "/");
    }
};