# Ride Your Dragon — Free PWA Prototype

This is a static Progressive Web App (PWA). It uses no database and no paid service. Daily Rides, Council entries, and Cave inventory answers are stored in the browser's `localStorage` on the device being used.

## What is included
- Daily Ride / Dragon Scale check-in
- Two Trees check-in
- Rider vs. Dragon check-in
- Nine Dragon cards
- Enter the Cave deep inventory
- Council support list
- Journey / pattern dashboard
- JSON export and local data erase
- Offline-capable service worker
- Installable PWA manifest

## Easiest free way to test locally
A service worker requires HTTP/HTTPS, so do not just double-click `index.html` if you want install/offline features.

If Python is installed, open a terminal in this folder and run:

    python -m http.server 8000

Then open:

    http://localhost:8000

The ordinary app UI will often work when `index.html` is opened directly, but PWA installation/offline caching requires a web server.

## Completely free public hosting with GitHub Pages
1. Create a free GitHub account if needed.
2. Create a new public repository, for example `ride-your-dragon`.
3. Upload every file and the `assets` folder from this package.
4. In the repository, open **Settings → Pages**.
5. Under **Build and deployment**, choose **Deploy from a branch**.
6. Select your main branch and `/ (root)`, then save.
7. GitHub will give you an HTTPS address. Open it on your phone.
8. On supported browsers choose **Install** or **Add to Home Screen**.

No paid hosting is required.

## Privacy notes
- Data is stored only in that browser/device by default.
- Clearing browser/site data will erase entries unless the user exported a JSON backup.
- Anyone who can access that browser profile may potentially access local entries.
- Do not market this prototype as medical treatment or emergency care.
- Before collecting highly sensitive recovery data on a server, obtain appropriate privacy/security/legal guidance.

## Next useful upgrades
- PIN/device lock gate
- Encrypted local backup
- Guided 9-week course mode
- Facilitator mode without exposing participant journals
- Audio grounding practices
- Printable inventory export
- Optional cloud sync designed with appropriate privacy controls
