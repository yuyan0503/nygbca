import type { MetadataRoute } from 'next'
import themes from 'daisyui/src/theming/themes';

//const base100Color = themes.dark['base-100']; // Adjust according to your theme structure

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'nyg bc app',
    short_name: 'nygbca',
    description: "This application allows for registering, and controlling the people's flow at school entry point in a school festival.",
    start_url: '/',
    display: 'standalone',
    background_color: "#1d232a",
    theme_color: "#1d232a",
    display_override: ["window-controls-overlay"],
    icons: [
      {
        src: "/favicon/web-app-manifest-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable"
      },
      {
        src: "/favicon/web-app-manifest-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable"
      },
      {
        src: "/favicon/web-app-manifest-512x512.png",
        sizes: "512x512",
        type: "image/png"
      }
    ],
  }
}