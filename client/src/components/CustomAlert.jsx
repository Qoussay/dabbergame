import { Alert } from "@mui/material";
import { useState, useEffect } from "react";
export default function CustomAlert({ type, message, fixed, timed }) {
  const [canShow, setCanShow] = useState(false);

  // Set Time out
  useEffect(() => {
    if (message) {
      setCanShow(true);
      if (timed) {
        const timer = setTimeout(() => setCanShow(false), 3000);
        return () => clearTimeout(timer);
      }
    }
  }, [message]);

  const renderedItem = canShow ? (
    <Alert
      className={fixed ? "fixed bottom-10 w-fit left-10" : "w-full"}
      severity={type}
    >
      {message}
    </Alert>
  ) : null;
  return renderedItem;
}
