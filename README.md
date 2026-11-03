# Kitsune Studio - public OAuth information website

This folder contains a small, static information site with no credentials, no OAuth token and no private application code.

## Publish with GitHub Pages

1. On GitHub, create a **PUBLIC** repository owned by `SamKhosravi` and named exactly `SamKhosravi.github.io` (GitHub may lowercase the site URL).
2. Upload **the files contained in this folder**, not the ZIP itself, to the root of the repository's `main` branch and commit.
3. In repository `Settings > Pages`, set `Build and deployment > Source: Deploy from a branch > main > /(root)`, then Save.
4. Verify the live links in an incognito browser:
   - https://samkhosravi.github.io/
   - https://samkhosravi.github.io/privacy.html
   - https://samkhosravi.github.io/terms.html
5. For Google Search Console use the URL-prefix property `https://samkhosravi.github.io/` and verify ownership using Google's supplied HTML tag or HTML file. This property must use the same Google account (or an authorized account) as the Google Cloud project.
6. In Google Cloud > Google Auth Platform > Branding, paste those addresses. For Authorized domains try `samkhosravi.github.io`, only if Google accepts and the property is verified.

## Branding fields

- Application name: Kitsune Studio
- Support email: veluna.music.contact@gmail.com
- App homepage: https://samkhosravi.github.io/
- Privacy policy: https://samkhosravi.github.io/privacy.html
- Terms of service: https://samkhosravi.github.io/terms.html
- Authorized domain: samkhosravi.github.io (subject to Google accepting and verifying)
- Developer contact: veluna.music.contact@gmail.com

## Important before making the policy live

The privacy policy is based on the current screenshots indicating local authorization and the YouTube `youtube.upload` permission. Confirm against the actual Kitsune Studio implementation: how credentials and video files are handled, where access/refresh tokens are saved, how they are deleted after disconnection or revocation, whether any additional services receive data, and which privacy status the uploader submits. The website alone does not make the desktop application compliant.

Google and YouTube can require additional validation of OAuth branding, scopes or API use.

## Security

Never put `client_secret*.json`, OAuth refresh tokens, API keys, or local video content in this repository. Public repository contents are visible to everyone.
