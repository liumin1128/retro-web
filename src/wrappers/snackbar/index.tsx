import { useEffect } from "react";
import { useSnackbar } from "notistack";
import { Outlet } from "umi";

export default () => {
  
  const snackbar = useSnackbar();
  
  useEffect(() => {
    window.snackbar = snackbar;
  }, [snackbar]);

  return <Outlet />
};
