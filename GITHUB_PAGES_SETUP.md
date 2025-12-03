# GitHub Pages Setup Guide

Your portfolio is now ready to be deployed! Follow these steps to complete the setup.

## Step 1: Enable GitHub Pages (Web UI)

1. Go to your repository: **https://github.com/Samir-Guenchi/portfolio**
2. Click **Settings** (⚙️ icon)
3. Scroll down to **Pages** section (on the left sidebar under "Code and automation")
4. Under **Build and deployment**:
   - **Source**: Select `GitHub Actions`
   - Leave everything else as default
5. Click **Save** (if visible)

## Step 2: Verify the Workflow

1. Go to **Actions** tab in your repository
2. Look for "Deploy to GitHub Pages" workflow
3. Wait for it to complete (should show ✅ green checkmark)

## Step 3: Choose Your Deployment Option

### Option A: Use GitHub Pages URL
Your site will be live at: **https://samir-guenchi.github.io/portfolio**

### Option B: Use Custom Domain (Recommended)
You already have `CNAME` file configured for `samir-guenchi.com`

To enable the custom domain:
1. In GitHub Settings > Pages
2. Under "Custom domain", enter: `samir-guenchi.com`
3. Click **Save**
4. Configure your domain DNS settings with your domain registrar:
   - Add GitHub's nameservers or create CNAME record
   - Point to: `samir-guenchi.github.io`

## Step 4: Verify Deployment

After completing steps 1-3:
- Check Actions tab for workflow status
- Visit your site URL (either GitHub Pages or custom domain)
- Portfolio should load successfully

## Troubleshooting

### If deployment fails:
1. Check **Actions** tab for error messages
2. Ensure `index.html` exists in root directory
3. Check `.nojekyll` file is present (it is ✓)

### If custom domain not working:
1. Verify CNAME file content: `cat CNAME` → should show `samir-guenchi.com`
2. Check DNS settings are propagated (can take 24-48 hours)
3. Verify domain registrar settings

### If GitHub Pages URL works but custom domain doesn't:
1. Wait for DNS propagation (24-48 hours)
2. Clear browser cache
3. Use incognito window to test

## Current Status

✅ Repository configured
✅ Workflow files optimized
✅ CNAME file present
✅ index.html in root
✅ .nojekyll file present
⏳ Waiting for GitHub Pages setup in web UI

## Next Action Required

Go to GitHub Settings > Pages and enable GitHub Actions as the source!
