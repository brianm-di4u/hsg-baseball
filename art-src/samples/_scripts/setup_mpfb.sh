#!/usr/bin/env bash
# Recreate the isolated headless Blender profile with MPFB 2.0.18 and the CC0 MakeHuman system assets.
# Nothing touches the user's own Blender profile: everything lives in art-src/samples/_blender-user (git-ignored).
# Usage (Git Bash, from the repo root):  bash art-src/samples/_scripts/setup_mpfb.sh
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/../../.." && pwd)"
S="$ROOT/art-src/samples"
B="${BLENDER:-/c/Program Files/Blender Foundation/Blender 5.2/blender.exe}"
export BLENDER_USER_RESOURCES="$S/_blender-user"

MPFB_ZIP="$S/mpfb2-extension/add-on-mpfb-v2.0.18.zip"
MPFB_SHA=c075b3e9b94b8e5556a5f03f4653602d02ea306de08126e8f55ed6dee28a2dad
ASSETS_ZIP="$S/makehuman-system-assets/makehuman_system_assets_cc0.zip"

mkdir -p "$S/mpfb2-extension" "$S/makehuman-system-assets" "$BLENDER_USER_RESOURCES"
[ -f "$MPFB_ZIP" ] || curl -sSfL -o "$MPFB_ZIP" \
  "https://extensions.blender.org/download/sha256:$MPFB_SHA/add-on-mpfb-v2.0.18.zip?repository=%2Fapi%2Fv1%2Fextensions%2F&blender_version_min=4.2.0"
echo "$MPFB_SHA *$MPFB_ZIP" | sha256sum -c -
[ -f "$ASSETS_ZIP" ] || curl -sSfL -o "$ASSETS_ZIP" \
  https://files2.makehumancommunity.org/asset_packs/makehuman_system_assets/makehuman_system_assets_cc0.zip

"$B" --factory-startup --command extension install-file -r user_default -e "$MPFB_ZIP"

# The asset pack is untrusted data: refuse absolute or parent-relative member names before extracting.
if unzip -Z1 "$ASSETS_ZIP" | grep -q '^/\|\.\.'; then echo "unsafe paths in asset zip" >&2; exit 1; fi
unzip -q -o "$ASSETS_ZIP" -d "$BLENDER_USER_RESOURCES/extensions/.user/user_default/mpfb/data"
echo "MPFB ready in $BLENDER_USER_RESOURCES"
