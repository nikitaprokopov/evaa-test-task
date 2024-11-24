import { mockTelegramEnv, isTMA, init } from "@telegram-apps/sdk-react";

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
}
