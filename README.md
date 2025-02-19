# NFT Minting Page

## Overview
NFT Minting Page is a full-stack web application that enables users to mint NFTs and manage their NFT collections. The project consists of a **backend** for handling NFT data storage and a **frontend** for user interaction.

---

## Features
- Store and retrieve NFT metadata.
- Connect wallet functionality using Web3.
- Mint NFTs using a smart contract.
- View owned NFTs in a gallery.
- Secure API interactions.

---

## Tech Stack

### **Backend:**
- Node.js
- Express.js
- MongoDB
- Swagger (for API documentation)
- Winston (for logging)
- Helmet (for security headers)

### **Frontend:**
- React Vite
- TailwindCSS
- Wagmi + RainbowKit (for wallet connection)
- Web3.js

---

## API Endpoints

### **1. Store NFT Data**
- **Endpoint:** `POST /store`
- **Params:**
  - `NFT Name` (String)
  - `NFT Description` (String)
  - `NFT Logo URL` (String)
  - `NFT ID` (Number)
  - `User Wallet Address` (String)


### **2. Get NFT Data By ID**
- **Endpoint:** `GET /:nftId`
- **Params:** `NFT ID` (Number)
- **Response:**
  - `200 OK` - NFT data retrieved
  - `404` - NFT not found
  - `500` - Server error

### **3. Get NFT Gallery**
- **Endpoint:** `GET /gallery/:userWalletAddress`
- **Params:** `User Wallet Address` (String)
- **Response:**
  - `200 OK` - Returns NFT list
  - `404` - No NFTs found
  - `500` - Server error

---

## Installation & Running the Project

### **Backend Setup**
```sh
cd backend
npm install  
npm start   
```

### **Frontend Setup**
```sh
cd frontend
npm install  
npm run dev  
```

---

## Contributing
Contributions are welcome! Feel free to submit a pull request or open an issue.

## License
This project is licensed under the [MIT License](LICENSE).

