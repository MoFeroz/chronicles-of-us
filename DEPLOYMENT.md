# Deployment Guide: The Chronicles of Us

This guide helps you deploy the game so your wife can play it on her phone.

## 1. Hosting Media (Critical for Performance)

Since this game relies on videos, **do not** store the large video files directly in the GitHub repository. It will make the game slow.

1.  **Create a Cloudinary Account** (Free tier is sufficient): [https://cloudinary.com/](https://cloudinary.com/)
2.  Upload all your videos (Cat making biscuits, Zoomies, Dancing, etc.) and photos (Beach photo, etc.) to Cloudinary.
3.  Cloudinary will give you a **URL** for each file.
4.  Open `constants.ts` in this project.
5.  Replace the placeholder URLs in `export const ASSETS = { ... }` with your new Cloudinary URLs.
    *   *Tip:* Cloudinary automatically optimizes videos for phones.

## 2. Deploying the Code (Vercel)

Vercel is the easiest way to host React apps for free.

1.  **Push to GitHub**:
    *   Create a new repository on GitHub (e.g., `valentines-quest`).
    *   Push this code to that repository.
2.  **Connect to Vercel**:
    *   Go to [https://vercel.com/](https://vercel.com/) and sign up/login.
    *   Click "Add New..." -> "Project".
    *   Select your GitHub repository (`valentines-quest`).
    *   Click **Deploy**.
3.  **Wait**: Vercel will build the site (takes about 1 minute).
4.  **Get the Link**: Once done, it will give you a link like `https://valentines-quest.vercel.app`. Send this to your wife!

## 3. (Optional) Custom Domain

If you want the link to be special (e.g., `www.our-adventure.com`):
1.  Buy a domain on Namecheap or GoDaddy (~$10).
2.  In Vercel, go to **Settings > Domains**.
3.  Add your domain and follow the instructions to point the DNS records.

## 4. Tips for Mobile
*   Ensure the videos are vertical (9:16 aspect ratio) if possible, as they look best on mobile.
*   The app handles "Add to Home Screen" gracefully if she opens it in Safari/Chrome.
