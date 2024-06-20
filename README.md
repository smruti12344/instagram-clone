# Instagram Clone

This project is an Instagram clone application built using React, Vite, Firebase, Chakra UI, React Icons, and React Firebase Hooks. The app allows users to create an account, log in, post photos, like posts, and follow other users.

## Table of Contents

- [Demo](#demo)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Demo

[Link to live demo](https://your-live-demo-link.com)

## Features

- User authentication (sign up, log in, log out)
- Post photos with captions
- Like and comment on posts
- Follow and unfollow users
- User profile with posts and followers
- Responsive design

## Installation

1. Clone the repository

   ```bash
   git clone https://github.com/smruti12344/instagram-clone.git
   cd instagram-clone
npm install

VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-auth-domain
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-storage-bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
VITE_FIREBASE_APP_ID=your-app-id
## Structure of Project
instagram-clone/
├── public/
├── src/
│   ├── components/
│   │   ├── Auth/
│   │   ├── Feed/
│   │   ├── Post/
│   │   ├── Profile/
│   │   └── UI/
│   ├── contexts/
│   ├── hooks/
│   ├── pages/
│   ├── styles/
│   ├── utils/
│   ├── App.js
│   ├── index.js
│   └── firebase.js
├── .env
├── .gitignore
├── index.html
├── package.json
├── README.md
└── vite.config.js

