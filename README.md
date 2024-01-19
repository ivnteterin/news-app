# News App
![Workflow](https://github.com/ivnteterin/news-app/workflows/build/badge.svg) 

This project is a simple web application that utilizes the NewsAPI to fetch and display news articles.

<kbd><img style="border:1px solid red" width="400" alt="image" src="https://github.com/ivnteterin/news-app/assets/79375552/291477fa-c223-4826-81d1-c984be85ebf3"></kbd>

Demo: https://ivnteterin.github.io/news-app/


### Project Structure

The project structure is organized as follows:

- **.husky/**: Configuration files for Husky, used for Git hooks.
- **public/**: Contains static assets and the main HTML file.
- **src/**: The source code for the News App.
  - **components/**: React components used in the application.
  - **services/**: Services for fetching data from the NewsAPI.
  - **styles/**: Stylesheets for styling the application.
  - **App.js**: Main component for the application.
  - **index.js**: Entry point of the application.
- **.eslintrc.js**: ESLint configuration file for maintaining code quality.
- **.gitignore**: Specifies intentionally untracked files to be ignored by Git.
- **.lintstagedrc.json**: Configuration for lint-staged, used for running linters on pre-committed files.
- **.prettierrc.json**: Prettier configuration file for code formatting.
- **package-lock.json**: Lock file for Node.js dependencies.
- **package.json**: Node.js project configuration file.

### Getting Started

To get started with the News App locally, follow these steps:

1. Clone this repository: `git clone https://github.com/your-username/News-App.git`
2. Navigate to the project directory: `cd News-App`
3. Install dependencies: `npm install`
4. Start the development server: `npm start`
5. Open your web browser and visit [http://localhost:3000](http://localhost:3000) to view the News App.

### Features

- Fetches and displays news articles from TheNewsAPI.
- Provides a simple and responsive user interface.

Feel free to explore the code, report issues. If you have any questions or would like to get in touch, you can reach out to me at ivnteterin@gmail.com
