# Microfrontend Template with Vite Module Federation, Vue, React, Vue-router, Vuex, and TypeScript

This repository demonstrates a microfrontend architecture using Vite's Module Federation plugin, React, and TypeScript. The demo consists of one host application (`vue-host-app`) and two remote applications (`vue-child-app` and `react-child-app`).

## Table of Contents

- [Prerequisites](#prerequisites)
- [Project Structure](#project-structure)
- [Running the Applications](#running-the-applications)
- [Technologies Used](#technologies-used)

## Prerequisites

Make sure you have the following installed on your machine:

- Node.js (>= 16)
- npm (>= 7) or yarn (>= 1.22)

## Project Structure
```sh (only for pretty highlighting)
microfrontend-vite-vue-react-routers/
├── docker-deploy/ # scripts to production deployment
├── shared-res/ # shared resources which uses by all apps
│ ├── shared-publuc/ # public files which will copied directly to app's bundles (images, fonts, etc...)
│ └── styles/ # .styl files which can be import by @require() in .styl files in apps
├── vue-host-app/ # Host application
│ ├── src/
│ ├── res/
│ ├── vite.config.ts
│ ├── package.json
│ ├── tsconfig.json
│ └── ...
├── vue-host-app/ # Host application
│ ├── src/
│ ├── res/
│ ├── vite.config.ts
│ ├── package.json
│ ├── tsconfig.json
│ └── ...
├── vue-host-app/ # Host application
│ ├── src/
│ ├── res/
│ ├── vite.config.ts
│ ├── package.json
│ ├── tsconfig.json
│ └── ...
├── Makefile
└── README.md
```


## Running the applications

Each application can runs in this modes:

#### Table of run commands
| App name    | dev mode      | preview mode      | deploy mode                                       |
|-------------|---------------|-------------------|---------------------------------------------------|
| vue-host    | `npm run dev` | `npm run preview` | `make all-for-app ENV_FILE_NAME=.env.host`        |
| vue-child   | `npm run dev` | `npm run preview` | `make all-for-app ENV_FILE_NAME=.env.vue-child`   |
| react-child | `npm run dev` | `npm run preview` | `make all-for-app ENV_FILE_NAME=.env.react-child` |

> [!TIP]
> **dev mode** - app runs with Vite dev server with Hot Module Reloading for for convenient code editing and instantly showing changes in app.

> [!WARNING]
> Host app can't show HMR changes while child apps editing. To load child's app's changes restart `dev`, `build` or `preview` command in child app to rebuild its bundle.

> [!TIP]
> **preview mode** - app runs with Vite preview server which serve files from bundle in `dist` folder.

> [!TIP]
> **deploy mode** - app runs with Nginx in docker container, runs scripts to setup CI/CD, getting letsencrypt SSL certificates and setup it's automatically renewing. 

Follow these steps to install the dependencies for each application and run it.

### Host Application

> [!IMPORTANT]
> To run every app you need to copy the `.env.example` file to the `.env` file in project root. 

1. Navigate to the `main` directory:
    ```sh
    cd vue-host-app
    ```

2. Install the dependencies:
    ```sh
    npm install
    ```
   
3. Run app in which mode you want: <br> See the command in [↑ table of run commands ↑](#table-of-run-commands)
   
### Vue Child Application

1. Navigate to the `main` directory:
    ```sh
    cd vue-child-app
    ```

2. Install the dependencies:
    ```sh
    npm install
    ```

3. Run app in which mode you want: <br> See the command in [↑ table of run commands ↑](#table-of-run-commands)

### React Child Application

1. Navigate to the `main` directory:
    ```sh
    cd react-child-app
    ```

2. Install the dependencies:
    ```sh
    npm install
    ```

3. Run app in which mode you want: <br> See the command in [↑ table of run commands ↑](#table-of-run-commands)

> [!TIP]
> Open your browser and go to http://localhost:5173 (or the port specified in your .env file) to see the application in action. <br>
To see every child app you can go to http://localhost:5001 (vue-app) and http://localhost:5002 (react-app)

## Technologies Used

- **Vite** (>= 5)
- **React** (>= 18)
- **Vue** (>= 3)
- **Vue-router**
- **Vuex**
- **TypeScript**
- **Module Federation**
