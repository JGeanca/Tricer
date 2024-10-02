# Project 01 - E-commerce Website Clothing Store

## Index

- [Project 01 - E-commerce Website Clothing Store](#project-01---e-commerce-website-clothing-store)
  - [Index](#index)
  - [Description](#description)
  - [User Manual](#user-manual)
    - [Prerequisites](#prerequisites)
      - [Dependencies Installation](#dependencies-installation)
      - [Additional Packages Included](#additional-packages-included)
      - [Running the Project](#running-the-project)
  - [Design](#design)
    - [Brand Identity](#brand-identity)
    - [System Architecture](#system-architecture)
      - [Navigation](#navigation)
    - [Mockups](#mockups)
  - [Additional Information](#additional-information)
    - [Mock Data](#mock-data)
    - [Linter](#linter)

## Description

This project is an e-commerce website designed for a clothing store, the objective is allowing users to browse, select, and purchase clothing items in an intuitive and efficient manner. The primary focus of this first project step is to create a user-friendly and visually appealing interface while implementing best practices in web development. The functionality of the website will be implemented in subsequent project steps.

## User Manual

### Prerequisites

Before running the project, ensure you have the following installed on your machine:

- Node.js: You need to have Node.js installed, which includes npm (Node Package Manager). You can download the latest version of Node.js from the [official website](https://nodejs.org/en). To verify that Node.js and npm are installed correctly, you can run the following commands in your terminal:

~~~bash
node -v
npm -v
~~~

These commands should return the version numbers of Node.js and npm.

#### Dependencies Installation

Navigate to projects/project-01/ and run the command:

~~~bash
npm install
~~~

This command will install all necessary dependencies, including the packages and configurations in the next section.

#### Additional Packages Included

- `bootstrap`: Front-end framework that provides a collection of pre-designed HTML, CSS, and JavaScript components for building responsive and mobile-first web applications. You can see the documentation [here](https://getbootstrap.com/docs/5.0/getting-started/introduction/).

- `react-bootstrap`: Is a library that allows you to use Bootstrap components as React components. It reimplements Bootstrap's JavaScript components in a way that is compatible with React, enabling the possibility to take advantage of Bootstrap's styling and layout features while adhering to React's declarative programming style. You can see the documentation [here](https://react-bootstrap.netlify.app/docs/components/accordion).

- `react-router-dom`: This library is used for routing within the application. You can see the documentation [here](https://reactrouter.com/en/main).

- `zustand`: Zustand is a library for global state management in React applications. It is ideal for storing and managing the global state of the application, such as user session data, user preferences, and other states that need to be accessible from various parts of the application. You can see the documentation [here](https://zustand.surge.sh/).

- `React Query/TanStack`: This library is designed for data fetching, caching, and synchronization in React applications. It simplifies the management of data states that come from APIs and external sources, efficiently handling data synchronization and updates. It is particularly useful for implementing pagination, infinite scrolling, and providing feedback to users during loading states. You can see the documentation [here](https://react-query.tanstack.com/).

#### Running the Project

To run the project, navigate to projects/project-01/ and run the command:

~~~bash
npm run dev
~~~

Then, open the link shown in the terminal in your browser. The project will be running on a local server, and you can interact with the website.

## Design

### Brand Identity

The brand identity of our website is centered around the concept illustrated in the mood board:

![Mood Board](./imgs/moodBoard.jpg)

Our brand is called ***Tricer***, and it draws inspiration from this mood board, which aims to represent an urban street style. The design reflects a strong musical influence, incorporating cool colors to create a vibrant and contemporary aesthetic that resonates with our target audience.

### System Architecture

The current system is designed as a Single Page Application (SPA) using react-router-dom to handle navigation between the different views of the platform without the need to reload the page. This allows for a smooth and fast user experience, where the different sections of the store, such as the product catalog, product details, and categories, are dynamically loaded based on the defined routes. Each view or page is represented as a React component, and the architecture facilitates the reuse of components and quick adaptation for the deployment of future functionalities or integration with real APIs.

#### Navigation

The navigation of the website is structured as follows the diagram below:
![navigationDiagram](./imgs/navigationDiagram.svg)

### Mockups

You can see the mockups of the website in the following link of Figma: [TricerStoreMockups](https://www.figma.com/design/IrHRSZP4JTKU3gjFCipxq3/Proyecto-%231---Tienda-de-Ropa?node-id=0-1&node-type=canvas).

## Additional Information

### Mock Data

This project uses mock data to simulate the behavior of a real e-commerce website. The mock data is stored in JSON files located in projects/project-01/src/mocks/. This data includes detailed information about clothing items, such as item names, descriptions, prices, and image URLs. The mock data is utilized to populate the website with clothing items, allowing users to browse and interact with a simulated shopping experience.

The images used in the project are sourced from [Pull&Bear](https://www.pullandbear.com), and all rights to these images belong to their respective owners. In future iterations of the project, this mock data will be replaced with real data fetched from an API to create a fully functional e-commerce platform.

### Linter

The project uses [ESLint](https://eslint.org/S) for code linting, and we follow the [StandardJS](https://standardjs.com/) style guide, which enforces a set of rules for writing clean and consistent JavaScript code. The ESLint configuration file is located at projects/project-01/.eslintrc.js. This configuration includes the following rules:

~~~text
Use single quotes (') for strings.
Do not use semicolons (;).
Indentation should be set to 2 spaces.
~~~

***

Return to [Assignments Documentation](../../../README.md).
