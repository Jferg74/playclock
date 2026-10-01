# Ref Clock — Meta Ray-Ban Display prototype

V1 presets:
- 40-second play clock
- 25-second play clock
- 60-second timeout
- 30-second timeout

Controls:
- Arrow keys: choose timer (Meta Web Apps maps navigation to familiar arrow-key events)
- Enter: start selected timer; while running, pause/resume
- Left while clock is open: reset
- Down while clock is open: return to timer selection

Alerts:
- Play clocks: audio cue at 10, 5, and 0
- Timeouts: audio cue at 15, 5, and 0
- Final five seconds pulse visually; zero flashes and shows EXPIRED

Run locally:
1. Open index.html in Chrome, or serve this folder with a local web server.
2. Test keyboard controls.
3. Use Meta's Ray-Ban Display Web App Simulator for the 600x600 display and D-pad input.
4. Deploy the folder to an HTTPS URL.
5. In Meta AI app with Developer Mode enabled, add the Web App URL.

This prototype intentionally uses plain HTML/CSS/JavaScript and standard keyboard events so it is easy to inspect and modify.
