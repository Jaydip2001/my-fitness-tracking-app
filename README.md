# AI-Powered Fitness Tracker App

![Project Status](https://img.shields.io/badge/Status-Complete%20(Tutorial%20Build)-brightgreen)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Table of Contents

* [About The Project](#about-the-project)
    * [Built With](#built-with)
* [Features](#features)
* [Getting Started](#getting-started)
    * [Prerequisites](#prerequisites)
    * [Installation](#installation)
    * [Running the App](#running-the-app)
* [Configuration](#configuration)
    * [Sanity CMS Setup](#sanity-cms-setup)
    * [Clerk Authentication Setup](#clerk-authentication-setup)
    * [Gemini API Integration](#gemini-api-integration)
* [Usage](#usage)
* [Project Structure](#project-structure)
* [Future Enhancements](#future-enhancements)
* [Acknowledgements](#acknowledgements)
* [License](#license)
* [Contact](#contact)

---

## About The Project

This repository contains the source code for a full-fledged AI-Powered Fitness Tracker mobile application, developed using React Native. This project meticulously replicates the functionalities and architecture demonstrated in a comprehensive YouTube tutorial by Papa React, providing a robust solution for personal fitness management.

The application aims to revolutionize how individuals approach their fitness journey by offering personalized guidance, efficient workout tracking, and insightful progress analytics. It integrates cutting-edge AI capabilities via **Google's Gemini API** to offer dynamic workout routines and exercise-specific instructions. All content, including an extensive exercise database, is managed through Sanity.io, while user authentication is securely handled by Clerk.

This project serves as a strong foundation for learning modern mobile application development with React Native, integrating various powerful third-party services.

### Built With

* [React Native](https://reactnative.dev/)
* [Expo](https://expo.dev/)
* [Sanity.io](https://www.sanity.io/) (Headless CMS)
* [Clerk](https://clerk.com/) (Authentication)
* [Google Gemini API](https://ai.google.dev/models/gemini) (AI Capabilities)
* [Nativewind](https://www.nativewind.dev/) (Tailwind CSS for React Native)
* [TypeScript](https://www.typescriptlang.org/)
* [Expo Router](https://docs.expo.dev/router/overview/) (File-system based routing)
* [Node.js](https://nodejs.org/)

## Features

The AI-Powered Fitness Tracker app includes a wide array of functionalities:

* **Secure User Authentication:**
    * Seamless sign-up and login using Clerk, supporting Google Sign-in and Email OTP.
    * Protected routes ensuring user data and workout history are secure.
* **Comprehensive Exercise Database:**
    * Search functionality to easily find exercises.
    * Detailed descriptions for each exercise, including equipment needed and instructions, powered by Sanity.io.
* **Intelligent AI Workout Guidance:**
    * Leverages **Google's Gemini API** to provide personalized workout routines.
    * Offers step-by-step instructions, setup and positioning tips, safety guidelines, and exercise variations.
    * Dynamic AI advice that can be refreshed for alternative suggestions.
* **Advanced Workout Tracking:**
    * Real-time tracking of active workout sessions.
    * Ability to log sets, repetitions, and weights for each exercise.
    * Functionality to complete and save workout sessions.
    * Full CRUD (Create, Read, Update, Delete) operations for managing workout records.
* **Performance Metrics and History Analytics:**
    * Access to a detailed history of all past workout sessions.
    * Summaries for completed workouts, including total time trained and exercises performed.
    * Foundation for future progress tracking (personal bests, streaks, weight trends).
* **Intuitive User Interface (UI/UX):**
    * Clean and modern design built with Nativewind.
    * Smooth navigation using tab and stack navigators.
    * Interactive elements like modals and pull-to-refresh for a native feel.

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

Before you begin, ensure you have the following installed on your machine:

* Node.js (LTS version recommended)
* npm (comes with Node.js) or Yarn
* [Expo Go app](https://expo.dev/client) on your mobile device (iOS or Android) for easy testing
* An iOS simulator (Xcode for macOS) or Android emulator (Android Studio) if developing locally.

### Installation

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/YOUR_USERNAME/your-repo-name.git](https://github.com/YOUR_USERNAME/your-repo-name.git)
    cd your-repo-name
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```
3.  **Set up your environment variables:**
    Create a `.env` file in the root of your project and add the necessary API keys and project IDs. (Detailed in [Configuration](#configuration) section below).

### Running the App

1.  **Start the Expo development server:**
    ```bash
    npm start
    # or
    yarn start
    ```
    This will open the Expo Dev Tools in your browser.
2.  **Open the app:**
    * Scan the QR code displayed in the terminal or Expo Dev Tools using the Expo Go app on your mobile device.
    * Press `i` to open on an iOS simulator.
    * Press `a` to open on an Android emulator.

## Configuration

This project relies on several third-party services. You will need to configure them for the app to function correctly.

### Sanity CMS Setup

1.  **Create a Sanity project:**
    * Go to [Sanity.io](https://www.sanity.io/) and create a new project.
    * Follow their instructions to set up your dataset and define your content schemas (e.g., for `exercises`, `workouts`).
    * Obtain your `projectId` and `dataset` name from your Sanity project dashboard.
2.  **Update Sanity client configuration:**
    * Locate your Sanity client configuration file (e.g., `lib/sanity.js` or `config/sanity.ts`).
    * Update `projectId` and `dataset` with your credentials.

### Clerk Authentication Setup

1.  **Create a Clerk application:**
    * Go to [Clerk.com](https://clerk.com/) and create a new application.
    * Configure your desired authentication methods (Google, Email OTP, etc.).
    * Obtain your **Public Frontend API Key** (starts with `pk_live_...`).
2.  **Add Clerk environment variable:**
    * In your `.env` file, add:
        ```
        EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_your_clerk_publishable_key
        ```
    * Ensure your `_layout.tsx` or main app file is wrapped with `<ClerkProvider publishableKey={EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY}>`.

### Gemini API Integration

1.  **Get a Gemini API Key:**
    * Go to [Google AI Studio](https://aistudio.google.com/app/apikey) or the Google Cloud Console and generate a new API key for the Gemini API.
    * Ensure the API key has the necessary permissions to access the Gemini model you plan to use (e.g., `gemini-pro`).
2.  **Add Gemini environment variable:**
    * In your `.env` file, add:
        ```
        EXPO_PUBLIC_GEMINI_API_KEY=your_gemini_api_key
        ```
    * Access this key in your AI integration logic (e.g., using `process.env.EXPO_PUBLIC_GEMINI_API_KEY`).

## Usage

Once configured and running, the application allows users to:

* Sign up or log in to access personalized features.
* Browse and search through a comprehensive library of exercises.
* Start new workouts, adding exercises and tracking sets, reps, and weight.
* Receive real-time AI guidance for exercises, including form tips and variations.
* View a detailed history of completed workouts.
* Manage their user profile and workout records.

*(Optional: Add screenshots or GIFs here showing the app in action)*

## Project Structure

The project follows a standard React Native/Expo project structure, with a focus on modularity:


├── app/                  \# Expo Router's file-system based routes
│   ├── (tabs)/           \# Group for tab-based navigation (Home, Profile, History)
│   │   ├── index.tsx     \# Home screen
│   │   ├── profile.tsx   \# User profile screen
│   │   └── history.tsx   \# Workout history screen
│   ├── \_layout.tsx       \# Root layout for the application (ClerkProvider, Navigators)
│   └── active-workout.tsx\# Hidden screen for ongoing workout session
├── components/           \# Reusable UI components
├── constants/            \# Global constants, e.g., colors, styles
├── lib/                  \# Utility functions, e.g., Sanity client, Gemini API client
├── hooks/                \# Custom React hooks
├── assets/               \# Static assets (images, icons)
├── .env.example          \# Example environment variables file
├── app.json              \# Expo configuration
├── package.json          \# Project dependencies
└── tsconfig.json         \# TypeScript configuration



## Future Enhancements

* **Advanced Analytics:** Implement interactive charts and graphs to visualize long-term progress (e.g., volume lifted over time, personal best trends).
* **Workout Streaks & Gamification:** Introduce elements to motivate users through tracking consistency.
* **Custom Workout Templates:** Allow users to create and save their own repeatable workout routines.
* **Exercise Demo Videos:** Integrate video demonstrations for each exercise from Sanity.
* **Social Features:** Enable users to share workouts or connect with friends.
* **Wearable Integration:** Sync with external fitness devices (e.g., smartwatches) for automated data capture.
* **Enhanced AI (Gemini Vision):** Potentially integrate Gemini's multimodal capabilities for real-time form correction using device camera.

## Acknowledgements

This project was developed by closely following the comprehensive tutorial by Papa React. Special thanks to:

* **Papa React:** For the excellent tutorial and starter template.
* **Expo:** For simplifying React Native development and deployment.
* **Sanity.io:** For providing a flexible and powerful headless CMS.
* **Clerk:** For robust and easy-to-implement authentication.
* **Google Gemini Team:** For the powerful and versatile AI API.

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

[Your Name/GitHub Username] - [Your Email Address (Optional)] - [Link to your Portfolio/LinkedIn (Optional)]

Project Link: [https://github.com/YOUR_USERNAME/your-repo-name](https://github.com/YOUR_USERNAME/your-repo-name)

---
