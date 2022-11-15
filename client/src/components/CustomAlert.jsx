import { Alert } from "@mui/material";
import { useState, useEffect } from "react";
export default function CustomAlert({ type, message }) {
  const [canShow, setCanShow] = useState(false);

  // Set Time out
  useEffect(() => {
    if (message) {
      setCanShow(true);
      const timer = setTimeout(() => setCanShow(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const renderedItem = canShow ? (
    <Alert className=" fixed w-fit left-10 bottom-10" severity={type}>
      {message}
    </Alert>
  ) : null;
  return renderedItem;
}
