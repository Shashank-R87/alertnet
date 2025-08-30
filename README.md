# AlertNet  
**Connecting drivers, securing roads**  

AlertNet is a blockchain + cloud powered platform that delivers **real-time zone alerts** to drivers, ensuring safer and smarter roads. Built with an integrated mobile app, smart contracts, and cloud-based APIs, AlertNet connects drivers to their environment seamlessly.  

---

## 🌟 Features
- 📡 **Real-time Zone Alerts** – Receive push notifications when entering/exiting critical zones.  
- 🔗 **Blockchain-backed Security** – Alerts are transparent, immutable, and verifiable on-chain.  
- ☁️ **Cloud Integration** – AWS Lambda + RDS API to fetch zone details dynamically.  
- 📍 **Geofencing** – Auto-detect your location and fetch nearby zone information.  
- 📱 **Mobile App (Expo)** – Simple and intuitive driver-facing application.  

---

## 🏗️ Architecture
1. **Mobile App (React Native + Expo)** – Driver-side app that connects to zones and listens for alerts.  
2. **Smart Contracts (Hardhat + Infura)** – Immutable logging of events and zone alerts on Ethereum Sepolia.  
3. **AWS Cloud**  
   - **API Gateway + Lambda** → Handles requests from the app and fetches zone details.  
   - **RDS (PostgreSQL)** → Stores geofence zones with coordinates and metadata.  
   - **VPC** → Network isolation for database and services.  

---

## 🚀 Getting Started

### Prerequisites
- Node.js & npm  
- Hardhat (for contracts)  
- Infura project ID (for Ethereum Sepolia)  
- AWS account (for Lambda + RDS setup)  
- Expo Go (for testing the mobile app)  

### Installation
Clone the repository:  
```bash
git clone https://github.com/your-username/alertnet.git
cd alertnet
```

Install dependencies:  
```bash
npm install
```

Run mobile app:  
```bash
npx expo start
```

Deploy contracts:  
```bash
npx hardhat run scripts/deploy.js --network sepolia
```

---

## 📖 Usage
1. Open the AlertNet app on your device.  
2. Allow location permissions.  
3. The app will fetch your current zone via API Gateway.  
4. If inside a registered zone, it connects to the zone’s smart contract and starts listening for alerts.  
5. Drivers receive instant blockchain-backed notifications.  

---

## 📂 Project Structure
```
/app              -> Expo mobile application
/contracts        -> Solidity smart contracts
/lib              -> Contract ABIs and shared utilities
/lambda           -> AWS Lambda functions
```

---

## 🌍 Team
Built with ❤️ in **Bengaluru** by the AlertNet team.  

---

## 📜 License
MIT License © 2025 AlertNet