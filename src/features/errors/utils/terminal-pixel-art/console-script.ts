import type { ErrorStatus } from "./config.js";

/** Inline script: fetches a single static frame and logs it once to DevTools. */
export function browserConsoleStreamScript(status: ErrorStatus): string {
  return `<script>
(function () {
  if (!window.console) return;
  var strip = function (s) {
    return s.replace(/\\x1b\\[[?=0-9;]*[A-Za-z]/g, function (seq) {
      return /^\\x1b\\[[0-9;]*m$/.test(seq) ? seq : "";
    });
  };
  fetch(location.pathname + location.search, {
    headers: {
      Accept: "text/plain",
      "X-Terminal": "true",
      "X-Terminal-Static": "true",
    },
  })
    .then(function (res) {
      if (res.status !== ${status}) {
        console.warn("[${status}] Pixel art unavailable (HTTP " + res.status + ")");
        return "";
      }
      return res.text();
    })
    .then(function (text) {
      if (!text) return;
      console.log(strip(text));
    })
    .catch(function () {});
})();
</script>`;
}
