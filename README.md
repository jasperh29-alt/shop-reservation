# 🛍️ Hidddensee Steinverkauf - Item Reservation System

A beautiful, responsive website for a small shop where customers can reserve items for later pickup and provide their email address for confirmation.

## ✨ Features

- **Item Selection** - Browse and select from available shop items
- **Email Notifications** - Automatic email confirmations for both shop owner and customer
- **Pickup Scheduling** - Customers can choose their preferred pickup date
- **Notes Section** - Customers can add special requests or notes
- **Baby Blue Theme** - Beautiful gradient background with soft colors
- **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- **Form Validation** - Ensures all required information is provided

## 🛠 Tech Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Backend**: Node.js with Express
- **Email Service**: Nodemailer with Gmail
- **Styling**: Modern CSS with gradients and animations

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Gmail account with App Password

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/jasperh29-alt/shop-reservation.git
   cd shop-reservation
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```

   Edit `.env` and add your Gmail credentials:
   ```
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASSWORD=your-app-password
   SHOP_EMAIL=shop-owner@gmail.com
   PORT=3000
   ```

   **How to get Gmail App Password:**
   - Enable 2-Factor Authentication on your Google Account
   - Visit [Google App Passwords](https://myaccount.google.com/apppasswords)
   - Select "Mail" and "Windows Computer"
   - Copy the 16-character password and paste it in `.env`

4. **Start the server**
   ```bash
   npm start
   ```

   For development with auto-reload:
   ```bash
   npm run dev
   ```

5. **Open in browser**
   ```
   http://localhost:3000
   ```

## 📋 How to Use

1. **Browse Items** - View all available items in the shop
2. **Select an Item** - Click on any item to select it
3. **Fill Out Form** - Enter your name, email, and preferred pickup date
4. **Add Notes** (Optional) - Include any special requests
5. **Submit** - Click "Complete Reservation" to submit
6. **Receive Confirmation** - Check your email for reservation details

## 🎨 Customization

### Adding More Items

Edit the `shopItems` array in `script.js`:

```javascript
const shopItems = [
    { id: 1, name: 'Item Name', emoji: '🎉', price: '$9.99' },
    // Add more items...
];
```

### Changing Colors

The baby blue theme is defined in `styles.css`. Main colors:
- Primary: `#ADD8E6` (Light Blue)
- Secondary: `#87CEEB` (Sky Blue)
- Accent: `#5A9FBE` (Darker Blue)

Update these hex codes to change the theme.

## 📁 File Structure

```
shop-reservation/
├── index.html          # Main HTML structure
├── styles.css          # Styling with baby blue theme
├── script.js           # Frontend functionality
├── server.js           # Backend email server
├── package.json        # Dependencies
├── .env.example        # Environment variables template
└── README.md           # This file
```

## 🐛 Troubleshooting

### Emails not sending?
1. Check your Gmail credentials in `.env`
2. Ensure you're using an [App Password](https://myaccount.google.com/apppasswords), not your regular password
3. Enable "Less secure app access" if using a regular password (not recommended)

### Port already in use?
Change the `PORT` in `.env` file to an available port (e.g., 3001, 3002)

### CORS errors?
Ensure the frontend is accessing the correct backend URL

## 🌐 Deployment

### Heroku
1. Create a Heroku account at [heroku.com](https://www.heroku.com)
2. Install Heroku CLI
3. Run:
   ```bash
   heroku create your-app-name
   heroku config:set EMAIL_USER=... EMAIL_PASSWORD=... SHOP_EMAIL=...
   git push heroku main
   ```

### Vercel/Netlify
For frontend-only deployment without email backend, use EmailJS or Formspree.

## 📝 License

MIT License - feel free to use and modify!

## 💬 Support

For issues or questions, please open an issue in the repository.

---

**Made with ❤️ for small shops everywhere**
