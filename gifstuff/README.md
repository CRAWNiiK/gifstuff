# GifStuff - GIF Generation Application

A modern web application that creates animated GIFs using various effects and generators. Built with React frontend and Express.js backend, featuring dark/light theme support and integration with GifStuffAPI.

## Features

- **GIF Generation**: 9 different effects (Pet Pet, Money Rain, Pizza, Swirl, Dogecash, Slap, Cat Jam, Burn, Gun)
- **QR Code Generator**: Convert URLs to QR codes
- **IP Address Checker**: Check your current IP address
- **Theme Support**: Light, dark, and system theme switching
- **Responsive Design**: Mobile-first approach with modern UI

## Quick Start

### Local Development

1. **Clone and install dependencies:**
   ```bash
   git clone <repository-url>
   cd gifstuff
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   - Navigate to `http://localhost:5000`

### Production Build

1. **Build the application:**
   ```bash
   npm run build
   ```

2. **Start production server:**
   ```bash
   npm start
   ```

## Deployment Options

### Option 1: Direct Node.js Deployment

#### Linux/macOS:
1. **On your VPS/server:**
   ```bash
   # Install Node.js 20+
   curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
   sudo apt-get install -y nodejs

   # Clone and setup
   git clone <repository-url>
   cd gifstuff
   chmod +x scripts/setup.sh
   ./scripts/setup.sh
   ```

2. **Or manual setup:**
   ```bash
   npm install
   npm run build
   sudo npm install -g pm2
   pm2 start ecosystem.config.js
   pm2 startup
   pm2 save
   ```

#### Windows:
1. **Download and install Node.js 18+ from [nodejs.org](https://nodejs.org/)**

2. **Run the setup script:**
   ```cmd
   # Clone and setup
   git clone <repository-url>
   cd gifstuff
   scripts\setup.bat
   ```

3. **Or manual setup:**
   ```cmd
   npm install
   npm run build
   npm install -g pm2
   pm2 start ecosystem.config.js
   pm2 startup
   pm2 save
   ```

3. **Setup reverse proxy (Nginx):**
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;

       location / {
           proxy_pass http://localhost:5000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
           proxy_set_header X-Forwarded-Proto $scheme;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

### Option 2: Docker Deployment

1. **Using Docker Compose (recommended):**
   ```bash
   docker-compose up -d
   ```

2. **Using Docker directly:**
   ```bash
   docker build -t gifstuff .
   docker run -d -p 5000:5000 --name gifstuff-app gifstuff
   ```

### Option 3: VPS with SSL

1. **Install Certbot for SSL:**
   ```bash
   sudo apt install certbot python3-certbot-nginx
   sudo certbot --nginx -d your-domain.com
   ```

2. **Auto-renewal:**
   ```bash
   sudo crontab -e
   # Add: 0 12 * * * /usr/bin/certbot renew --quiet
   ```

## Environment Variables

The application works without any required environment variables. Optional ones:

- `PORT`: Server port (default: 5000)
- `NODE_ENV`: Environment mode (development/production)

## System Requirements

- **Node.js**: Version 18 or higher
- **RAM**: Minimum 512MB
- **Storage**: 200MB for application files
- **Network**: Internet connection for GifStuffAPI calls

## Architecture

- **Frontend**: React 18 with TypeScript, Vite build tool
- **Backend**: Express.js server with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui components
- **External API**: GifStuffAPI for GIF and QR generation
- **Storage**: In-memory (no database required)

## Troubleshooting

### Common Issues

#### All Platforms:
1. **Port 5000 already in use:**
   ```bash
   # Linux/macOS: Find process using port
   sudo lsof -i :5000
   ```
   ```cmd
   # Windows: Find process using port
   netstat -ano | findstr :5000
   ```
   ```bash
   # Use different port
   PORT=3000 npm start
   ```

2. **Build fails:**
   ```bash
   # Linux/macOS: Clear cache and reinstall
   rm -rf node_modules package-lock.json
   npm install
   npm run build
   ```
   ```cmd
   # Windows: Clear cache and reinstall
   rmdir /s node_modules
   del package-lock.json
   npm install
   npm run build
   ```

#### Windows-Specific:
3. **PM2 installation fails:**
   - Run Command Prompt as Administrator
   - Or use manual startup: `npm start`

4. **Script execution policy error:**
   ```powershell
   Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
   ```

#### Linux-Specific:
5. **Permission denied:**
   ```bash
   # Use different port (>1024)
   PORT=8080 npm start
   ```

## API Endpoints

The application proxies these endpoints to avoid CORS issues:

- `GET /api/gif/:endpoint` - Generate GIF with specified effect
- `GET /api/qr` - Generate QR code from URL
- `GET /api/checkip` - Get current IP address

## Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -am 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit pull request

## License

MIT License - see LICENSE file for details.