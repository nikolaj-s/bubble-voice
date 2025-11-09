import { useEffect, useMemo } from "react";
import { createPortal } from "react-dom";

export default function Portal({ id = "bubble-portal", children }) {
  const el = useMemo(() => {

    const app = document.getElementsByClassName('fullScreenWrapper')[0];

    if (typeof document === "undefined") return null; // SSR guard
    const existing = document.getElementById(id);
    if (existing) return existing;
    const node = document.createElement("div");
    node.id = id;
    node.style.position = "relative";
    node.style.zIndex = "100"; // top-most layer
    app.appendChild(node);
    
    return node;
  }, [id]);

  useEffect(() => {
    // if SSR or no document, bail
    if (!el || el.parentNode === document.body) return;
  }, [el]);

  if (!el) return null;
  return createPortal(children, el);
}
