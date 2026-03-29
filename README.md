# Organ Hospital - Donation Platform

A full-stack web application for managing organ donation requests and donor registration. Built with React, Node.js, Express, and MongoDB.

## 🎯 Features

- **Donor Registration**: Users can register as organ donors with secure authentication
- **Patient Requests**: Patients can request organs they need
- **Real-time Video Content**: Awareness videos about organ donation
- **Secure Authentication**: JWT-based authentication system
- **Database Integration**: MongoDB for persistent data storage
- **Responsive Design**: Mobile-friendly UI with Tailwind CSS
- **Modern UI**: Beautiful gradient backgrounds and smooth animations

## 📁 Project Structure

```
OrganHospital/
├── Organ-Backend/          # Express.js backend server
│   ├── controllers/        # Request handlers
│   ├── models/            # MongoDB schemas
│   ├── routes/            # API endpoints
│   ├── middleware/        # Authentication middleware
│   ├── server/            # Server configuration
│   └── package.json       # Backend dependencies
├── Organ-Frontend/         # React frontend
│   ├── src/
│   │   ├── components/    # Reusable React components
│   │   ├── pages/         # Page components
│   │   ├── context/       # React Context (Auth)
│   │   ├── services/      # API service
│   │   └── App.jsx        # Main app component
│   └── package.json       # Frontend dependencies
└── test-connection.js     # Connection testing script
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16+)
- MongoDB (Cloud Atlas or Local)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd OrganHospital
   ```

2. **Setup Backend**
   ```bash
   cd Organ-Backend
   npm install
   
   # Create .env file
   echo MONGO_URI=<your-mongodb-uri> > .env
   echo JWT_SECRET=<your-jwt-secret> >> .env
   
   # Start backend server
   npm run dev
   ```

3. **Setup Frontend** (in a new terminal)
   ```bash
   cd Organ-Frontend
   npm install
   npm run dev
   ```

### Environment Variables

**Backend (.env)**
```
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/organDB
JWT_SECRET=your-secret-key-here
PORT=5000
```

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Donors
- `GET /api/donor` - Get all donors
- `POST /api/donor` - Create donor profile
- `GET /api/donor/:id` - Get donor details

### Requests
- `GET /api/request` - Get all organ requests
- `POST /api/request` - Create organ request
- `GET /api/request/:id` - Get request details

## 🎨 Frontend Pages

- **Home** - Landing page with hero section and CTA
- **Register** - User registration form
- **Login** - User login form
- **Dashboard** - User profile and dashboard
- **Add Donor** - Register as organ donor
- **Request Organ** - Request organs
- **Profile** - User profile management

## 🔐 Security Features

- Password hashing with bcryptjs
- JWT-based authentication
- CORS protection
- Environment variable configuration
- Input validation

## 📝 Testing

Run the connection test script:
```bash
node test-connection.js
```

This will verify:
- Backend server connectivity
- API endpoints responsiveness
- Database connectivity
- Frontend-Backend integration

## 🛠️ Technologies Used

### Frontend
- React 19
- React Router v7
- Tailwind CSS
- Vite
- Axios
- React Icons

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
- CORS

## 🚀 Deployment

### Backend Deployment
- Can be deployed to Heroku, Railway, or AWS
- Uses environment variables for configuration

### Frontend Deployment
- Can be deployed to Vercel, Netlify, or GitHub Pages
- Build with: `npm run build`

## 📞 Contact & Support

For issues or questions, please create an issue in the GitHub repository.

## 📄 License

MIT License - feel free to use this project for your own purposes.

---

**Made with ❤️ for Organ Donation Awareness**
