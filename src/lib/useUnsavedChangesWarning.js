import { useEffect } from "react";
import { useBlocker } from "react-router-dom";

export function useUnsavedChangesWarning(hasUnsavedChanges, allowedPath) {
  const blocker = useBlocker(
    ({ nextLocation }) => hasUnsavedChanges && nextLocation.pathname !== allowedPath
  );

  useEffect(() => {
    if (blocker.state !== "blocked") return;
    if (window.confirm("You have unsaved changes. Leave this page and lose them?")) {
      blocker.proceed();
    } else {
      blocker.reset();
    }
  }, [blocker]);

  useEffect(() => {
    if (!hasUnsavedChanges) return;
    function warnBeforeUnload(e) {
      e.preventDefault();
    }
    window.addEventListener("beforeunload", warnBeforeUnload);
    return () => window.removeEventListener("beforeunload", warnBeforeUnload);
  }, [hasUnsavedChanges]);
}
