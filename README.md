# Webora 2026

A responsive, single-page event website for Webora 2026, a community-led tech and design meetup. The page presents the event, speakers, activities, FAQs, and event imagery with an expressive festival-style visual direction.

## Features

- Responsive event landing page for desktop and mobile screens
- Speaker and event content sections
- Interactive card-stack shuffle and drag behavior
- Animated sun, rainbow, marquee, and scroll effects
- Social sharing metadata and local favicon assets
- No build step or package installation required

## Project Structure

```text
.
├── index.html           # Main page
├── robots.txt           # Crawler instructions
└── assets/
    ├── css/style.css    # Site styles
    ├── fonts/           # Local display font files
    ├── imges/           # Images and event artwork
    └── js/main.js       # Page interactions and animations
```

## Run Locally

Open `index.html` directly in a browser, or serve the folder with a local HTTP server:

## Deployment

This is a static site and can be deployed to Netlify, GitHub Pages, or any static hosting provider. Publish the project root, keeping the `assets/` directory alongside `index.html`.

The page metadata currently references `https://weboraportfolio.netlify.app//`. Update the canonical social URLs and image metadata in `index.html` when deploying to a different domain.

## Browser Support

Use a current version of Chrome, Edge, Firefox, or Safari for the best experience. Some interactions use modern browser APIs such as `DOMMatrixReadOnly`, `IntersectionObserver`, and `requestAnimationFrame`.