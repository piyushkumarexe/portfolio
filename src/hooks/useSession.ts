import { useState } from "react";

const SESSION_KEY = "piyush_exe_session";

export function useSessionId() {
  const [sessionId] = useState(() => {
    let id = localStorage.getItem(SESSION_KEY);
    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem(SESSION_KEY, id);
    }
    return id;
  });

  return sessionId;
}
