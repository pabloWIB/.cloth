![image](https://github.com/pabloDYEL/ESTATICA-42/assets/116923433/c5130fe6-861f-4209-af8f-0eeb7737c0a7)

# Client Opinion

A modern, responsive static website built with pure HTML, CSS, and vanilla JavaScript. This project showcases a clean, professional clothing brand interface with product galleries and seamless user experience.

## Overview

Client Opinion is a static website designed to present clothing products with an elegant, minimalist design. The site features product showcases, interactive galleries, and responsive layouts optimized for all devices.

## Tech Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **No Dependencies**: Pure static implementation
- **No Server Required**: Client-side only
- **Responsive Design**: Mobile-first approach
- **Modern CSS**: Flexbox, Grid, CSS Variables

## Features

- Responsive product gallery with image thumbnails
- Clean, modern UI with professional typography
- Interactive navigation between product views
- Mobile-optimized layouts
- Fast loading times with optimized assets
- Cross-browser compatibility
- SEO-friendly semantic HTML structure

## Project Structure

```
client-opinion/
├── index.html              # Main landing page
├── css/
│   ├── main.css           # Main stylesheet
│   ├── components.css     # Component styles
│   └── responsive.css     # Media queries
├── js/
│   ├── main.js           # Main JavaScript functionality
│   ├── gallery.js        # Image gallery interactions
│   └── navigation.js     # Navigation logic
├── images/
│   ├── products/         # Product images
│   ├── thumbnails/       # Thumbnail images
│   └── assets/          # Site assets and icons
├── pages/
│   ├── products.html     # Product listing page
│   └── about.html       # About page
└── README.md
```

## Quick Start

### Prerequisites

- Modern web browser
- Text editor or IDE
- Basic knowledge of HTML, CSS, and JavaScript

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/pabloWIB/Client-Opinion.git
   cd Client-Opinion
   ```

2. **Open in browser**
   ```bash
   # Simply open index.html in your preferred browser
   # Or use a local development server
   
   # Using Node.js live-server (if available)
   npx live-server
   
   # Using PHP built-in server (if available)
   php -S localhost:8000
   
   # Or just double-click index.html
   ```

3. **Start developing**
   - Edit HTML files for content
   - Modify CSS files for styling
   - Update JavaScript files for functionality
   - Add images to the images/ directory

## Deployment

### Static Hosting Options

**GitHub Pages**
1. Push code to GitHub repository
2. Go to repository Settings > Pages
3. Select source branch (usually `main`)
4. Site will be available at `https://username.github.io/repository-name`

**Netlify**
1. Drag and drop project folder to Netlify
2. Or connect GitHub repository for automatic deployments
3. Site deployed instantly with custom domain options

**Vercel**
1. Import project from GitHub
2. Zero-configuration deployment
3. Automatic HTTPS and global CDN

**Other Options**
- Surge.sh: Simple command-line deployment
- Firebase Hosting: Google's static hosting
- AWS S3: Amazon's static website hosting

## Customization

### Styling
- Edit `css/main.css` for global styles
- Modify `css/components.css` for specific components
- Update `css/responsive.css` for mobile optimizations
- Use CSS variables in `:root` for consistent theming

### Content
- Update `index.html` and other HTML files for content
- Replace images in `images/` directory
- Modify navigation in `js/navigation.js`
- Customize gallery behavior in `js/gallery.js`

### Adding New Pages
1. Create new HTML file in root or `pages/` directory
2. Link to new page in navigation
3. Add corresponding CSS if needed
4. Update sitemap for SEO

### Performance Optimization
- Compress images before adding to `images/` directory
- Minify CSS and JavaScript for production
- Use WebP format for better image compression
- Implement lazy loading for images if needed

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit changes (`git commit -am 'Add new feature'`)
4. Push to branch (`git push origin feature/new-feature`)
5. Create Pull Request

### Development Guidelines
- Follow semantic HTML structure
- Use consistent CSS naming conventions
- Write clean, commented JavaScript
- Test across different browsers and devices
- Optimize images and assets

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---

**Repository**: https://github.com/pabloWIB/Client-Opinion.git

For questions or support, please open an issue on GitHub.
