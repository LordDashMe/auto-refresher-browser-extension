# Auto Refresher – Browser Extension

A lightweight browser extension that automatically refreshes your current browser tab at a user-defined interval. Ideal for monitoring dashboards, live data pages, or websites that require regular refreshing.

## Features

- Set a custom refresh interval (in seconds)
- Start/stop auto-refresh per tab
- Visual countdown timer in the popup UI
- Remembers your selected interval even if you close or reopen the popup

## Support Browser

- Chrome

## How to Install (Local Development)

1. Clone or download this repository.

2. Open Chrome and go to `chrome://extensions/`.

3. Enable **Developer Mode** in the top-right corner.

4. Click **Load unpacked** and select the project directory.

5. The extension should now appear in your extensions bar.

## Screenshot

<img width="331" alt="Screenshot 2025-06-03 at 1 19 35 AM" src="https://github.com/user-attachments/assets/bc2aa9c6-2edb-4275-ac5e-fff0c952d850" />

## File Structure

- `manifest.json` – Extension metadata and permissions
- `popup.html` – User interface
- `popup.js` – UI logic and communication with background script
- `background.js` – Handles refresh timers per tab
- `style.css` – Basic styles for the popup UI

---

Feel free to customize the interval anytime via the popup — it will persist until you stop it or close the tab.
