/// <reference types="chrome"/>

import { TWITTER_HOME_PATH } from "../constants";
import { handleTDetail, handleTL } from "./handler";

(function () {
  if (globalThis.hasRun === true) return true;

  const observer = new MutationObserver((e) => {
    const path = window.location.pathname;

    if (path === TWITTER_HOME_PATH) {
      return handleTL();
    }

    if (path.includes("/status")) {
      return handleTDetail();
    }

    observer.disconnect();
  });

  observer.observe(document.body, { attributes: true, subtree: true });

  globalThis.hasRun = true;
})();
