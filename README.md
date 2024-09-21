# Microfrontend Demo with Vite Module Federation, React, and TypeScript

This repository demonstrates a microfrontend architecture using Vite's Module Federation plugin, React, and TypeScript. The demo consists of one host application (`main`) and two remote applications (`sidebar` and `header`).

## Table of Contents

- [Prerequisites](#prerequisites)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Running the Applications](#running-the-applications)
- [Technologies Used](#technologies-used)
- [License](#license)

## Prerequisites

Make sure you have the following installed on your machine:

- Node.js (>= 16)
- npm (>= 7) or yarn (>= 1.22)

## Project Structure

microfrontend-react-vite/
├── main/ # Host application
│ ├── src/
│ ├── public/
│ ├── vite.config.ts
│ ├── package.json
│ └── ...
├── sidebar/ # Remote application 1
│ ├── src/
│ ├── public/
│ ├── vite.config.ts
│ ├── package.json
│ └── ...
├── header/ # Remote application 2
│ ├── src/
│ ├── public/
│ ├── vite.config.ts
│ ├── package.json
│ └── ...
└── README.md



## Installation

Follow these steps to install the dependencies for each application.

### Main Application (Host)

1. Navigate to the `main` directory:
    ```sh
    cd main
    ```

2. Install the dependencies:
    ```sh
    npm install
    ```

### Sidebar Application (Remote)

1. Navigate to the `sidebar` directory:
    ```sh
    cd sidebar
    ```

2. Install the dependencies:
    ```sh
    npm install
    ```

### Header Application (Remote)

1. Navigate to the `header` directory:
    ```sh
    cd header
    ```

2. Install the dependencies:
    ```sh
    npm install
    ```

## Running the Applications

### Running the Sidebar Application

1. Navigate to the `sidebar` directory:
    ```sh
    cd sidebar
    ```

2. Start the development server:
    ```sh
    npm run preview
    ```

### Running the Header Application

1. Navigate to the `header` directory:
    ```sh
    cd header
    ```

2. Start the development server:
    ```sh
    npm run preview
    ```

### Running the Main Application

1. Navigate to the `main` directory:
    ```sh
    cd main
    ```

2. Start the development server:
    ```sh
    npm run dev
    ```

3. Open your browser and go to `http://localhost:3000` (or the port specified in the Vite config) to see the application in action.

## Technologies Used

- **Vite** (>= 5)
- **React** (>= 18)
- **TypeScript**
- **Module Federation**

## License

This project is licensed under the MIT License.
