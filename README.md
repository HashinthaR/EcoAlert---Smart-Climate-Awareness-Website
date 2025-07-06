# 🌱 EcoAlert - Smart Climate Awareness Website

A modern, responsive climate awareness platform designed to educate and empower individuals to take action against climate change. Built with HTML5, CSS3, and JavaScript, featuring dark mode, interactive tools, and beautiful animations.

## ✨ Features

### 🎨 **Modern Design & UX**
- **Responsive Design**: Fully responsive across all devices (desktop, tablet, mobile)
- **Dark Mode**: Default dark theme with smooth transitions and user preference saving
- **Smooth Animations**: CSS animations and JavaScript-powered scroll effects
- **Professional UI**: Clean, modern interface with gradient backgrounds and hover effects
- **Accessibility**: WCAG compliant with proper ARIA labels and keyboard navigation

### 🛠️ **Interactive Tools**
- **CO₂ Calculator**: Calculate your carbon footprint based on electricity usage, travel, and diet
- **Daily Eco Tips**: Random eco-friendly tips with animated icon changes
- **Progress Tracker**: Visual progress bars for sustainability goals
- **Emissions Meter**: Real-time visual feedback for carbon calculations

### 📊 **Content Sections**
- **Hero Section**: Eye-catching banner with call-to-action buttons
- **Statistics**: Animated climate statistics with counter effects
- **About Climate Change**: Three informative cards covering global warming, melting ice caps, and extreme weather
- **Mission Statement**: Company mission with achievement statistics
- **Latest News**: Climate news articles with images
- **Testimonials**: User testimonials with profile pictures
- **Newsletter Signup**: Email subscription with PHP backend
- **Social Media**: Links to all social platforms

### 🎯 **Technical Features**
- **Sticky Navigation**: Navigation bar with scroll effects and dropdown menus
- **Image Optimization**: Lazy loading, error handling, and fallback placeholders
- **Performance**: Optimized animations and smooth scrolling
- **SEO Optimized**: Meta tags, Open Graph, and semantic HTML
- **Cross-browser**: Compatible with all modern browsers

## 🚀 Getting Started

### Prerequisites
- A modern web browser
- PHP server (for newsletter functionality)
- Basic understanding of HTML, CSS, and JavaScript

### Installation

1. **Clone or Download**
   ```bash
   # Download the project files
   # Extract to your web server directory
   ```

2. **File Structure**
   ```
   ECO/
   ├── index.html              # Main website file
   ├── style.css              # All styles and animations
   ├── script.js              # JavaScript functionality
   ├── subscribe.php          # Newsletter backend
   ├── test-images.html       # Image testing page
   ├── README.md              # This file
   └── Images/                # All website images
       ├── Logo (2).png       # Main logo
       ├── EcoAlert Logo.ico  # Favicon
       ├── Hero Banner (Homepage Background).png
       ├── Global Warming (About Section – Card 1).png
       ├── Melting Ice Caps (About Section – Card 2).png
       ├── Extreme Weather (About Section – Card 3).png
       ├── CO₂ Calculator Visual.png
       ├── Eco Tips Illustration.png
       ├── Main Post.png
       ├── NewsletterContact Section Visual.png
       ├── Footer Background General Background Image.png
       ├── Sarah Johnson.jpg
       ├── Mike Chen.jpg
       └── Emma Davis.jpg
   ```

3. **Setup**
   - Place all files in your web server directory
   - Ensure PHP is enabled for newsletter functionality
   - Open `index.html` in your browser

## 🎨 Customization

### Colors & Themes
The website uses CSS custom properties for easy theming:

```css
:root {
  --primary-color: #004d40;
  --accent-color: #26c6da;
  --background-color: #f0f9ff;
  /* ... more variables */
}
```

### Dark Mode
Dark mode is enabled by default and automatically saves user preferences:

```javascript
const currentTheme = localStorage.getItem('theme') || 'dark';
```

### Content Updates
- **Text Content**: Edit `index.html` for all text content
- **Images**: Replace images in the Images folder (maintain same filenames)
- **Colors**: Modify CSS custom properties in `style.css`
- **Functionality**: Edit `script.js` for JavaScript features

## 📱 Responsive Design

The website is fully responsive with breakpoints:
- **Desktop**: 1024px and above
- **Tablet**: 768px - 1023px
- **Mobile**: Below 768px

### Mobile Features
- Collapsible navigation menu
- Touch-friendly buttons and interactions
- Optimized layouts for small screens
- Swipe gestures support

## 🔧 Technical Details

### CSS Features
- **CSS Grid & Flexbox**: Modern layout techniques
- **CSS Custom Properties**: Theme variables for easy customization
- **CSS Animations**: Smooth transitions and keyframe animations
- **Backdrop Filters**: Modern blur effects
- **Gradients**: Beautiful gradient backgrounds

### JavaScript Features
- **Intersection Observer**: Scroll-based animations
- **Local Storage**: Theme preference saving
- **Event Delegation**: Efficient event handling
- **Error Handling**: Graceful fallbacks for images and functionality
- **Performance Monitoring**: FPS and scroll event monitoring

### Performance Optimizations
- **Lazy Loading**: Images load as needed
- **Debounced Events**: Optimized scroll and resize handlers
- **CSS Containment**: Improved rendering performance
- **Minimal Dependencies**: Only Font Awesome for icons

## 📧 Newsletter Functionality

The newsletter signup uses PHP to save email addresses:

```php
<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
  // Save to subscribers.txt
}
?>
```

## 🎯 Browser Support

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Mobile browsers

## 📄 License

This project is created by **R.W.G.L. Hashintha Ranasinghe** for educational and environmental awareness purposes.

## 🤝 Contributing

Feel free to contribute to this project by:
- Reporting bugs
- Suggesting new features
- Improving documentation
- Enhancing accessibility

## 📞 Contact

**Creator**: R.W.G.L. Hashintha Ranasinghe
- **Email**: hashintharanasinghe1976@gmail.com
- **Phone**: +94 76 571 3364
- **WhatsApp**: +94 76 571 3364
- **Location**: Sri Lanka

### Social Media
- **Twitter**: [@MihimathaT](https://x.com/MihimathaT)
- **Facebook**: [HashinthaRMT](https://web.facebook.com/HashinthaRMT)
- **Instagram**: [hashintha_ranasinghe_mpc](https://www.instagram.com/hashintha_ranasinghe_mpc/)
- **LinkedIn**: [Hashintha Ranasinghe](https://www.linkedin.com/in/r-w-g-l-hashintha-ranasinghe-162371205/)

## 🌟 Recent Updates

### Version 2.0 (Current)
- ✅ **Dark Mode Default**: Website now opens in dark mode by default
- ✅ **Logo Only**: Removed "EcoAlert" text from navigation and footer
- ✅ **Enhanced Images**: Improved image visibility and loading
- ✅ **Better Accessibility**: Enhanced ARIA labels and keyboard navigation
- ✅ **Performance**: Optimized animations and scroll effects
- ✅ **Mobile Experience**: Improved mobile navigation and responsiveness

### Version 1.0
- ✅ **Initial Release**: Complete climate awareness website
- ✅ **Interactive Tools**: CO₂ calculator and eco tips
- ✅ **Responsive Design**: Mobile-first approach
- ✅ **Modern UI**: Professional design with animations

---

**🌍 Join EcoAlert in making a difference for our planet!** 