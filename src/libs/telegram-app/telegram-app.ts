import { mockTelegramEnv, closingBehavior, swipeBehavior, miniApp, isTMA, init } from "@telegram-apps/sdk-react";

function enableConfirmationOnClose() {
  if (closingBehavior.mount.isAvailable()) {
    closingBehavior.mount();

    if (closingBehavior.enableConfirmation.isAvailable()) {
      closingBehavior.enableConfirmation();
    }
  }
}

export function disableVerticalSwipe() {
  if (swipeBehavior.mount.isAvailable()) {
    swipeBehavior.mount();

    if (swipeBehavior.disableVertical.isAvailable()) {
      swipeBehavior.disableVertical();
    }
  }
}

function enableMiniApp() {
  if (miniApp.mount.isAvailable()) {
    miniApp.mount();

    if (miniApp.setHeaderColor.supports.rgb()) {
      miniApp.setHeaderColor("#000000");
    }

    if (miniApp.setBackgroundColor.isAvailable()) {
      miniApp.setBackgroundColor("#000000");
    }
  }
}

export async function initTelegramApp() {
  const isTma = await isTMA();

  if (!isTma) {
    mockTelegramEnv({
      platform: "tdesktop",
      themeParams: {},
      version: "7.2",
    });
  }

  init();

  enableConfirmationOnClose();
  disableVerticalSwipe();
  enableMiniApp();
}
