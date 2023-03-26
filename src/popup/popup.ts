import browser from "webextension-polyfill";

const button = document.querySelector("#toggle") as HTMLButtonElement;

browser.storage.sync.get("enabled").then((data) => {
  const enabled = data.enabled as boolean;

  if (enabled) {
    button.textContent = "Disable Styles";
  } else {
    button.textContent = "Enable Styles";
  }
});

button.addEventListener("click", () => {
  browser.storage.sync.get("enabled").then((data) => {
    const enabled = data.enabled;
    browser.storage.sync.set({ enabled: !enabled });

    if (enabled) {
      button.textContent = "Enable Styles";
    } else {
      button.textContent = "Disable Styles";
    }

    browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
      if (!tabs[0].id) return;
      browser.tabs.sendMessage(tabs[0].id, { action: "toggleStyles" });
    });
  });
});
