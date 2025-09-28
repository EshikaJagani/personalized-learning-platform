# Frontend Documentation

## Introduction

We are developing frontend using React Typescript. Further, we are using Bootstrap for look and feels.

## Documentation

In React, the main page is shown using App.tsx component. All other components are added to this App.tsx. Based on the design we want, Bootstrap has samples of components that can be created as .tsx files and exported to App.tsx and included in it.
Frontend is developed using React Typescript (Vite + React + TS).
Rough Structure Design: Main goal was to create a page with a Caption, sidebar with a list of skills, Assignment section as the center focus, showing the metadata from the user interaction on the right side.

- <b>Basic React Design</b>: React apps are divided into rows and columns. A page consists of a maximum of 12 columns. So, we divided the whole page into 2 rows. Caption being in the first row and using all the 12 columns. The second row consists of SkillsList (using 2 columns), QuestionSection (using 7 columns) and InfoSection (using 3 columns). This adds up to 12 columns. A total of five components were used to develop the frontend. These five components were called in the App.tsx file and assembled in the rows and columns form.
- <b>App.tsx</b>: The main page where all the components are called and assembled.
- <b>App.css</b>: Styling file corresponding to the App.tsx
- Caption.tsx</b>: This component consists of the code for the App name on the top of the page. Here simply a header tag was used to display the Caption text.
- <b>Caption.css</b>: Styling file corresponding to the Caption.tsx
- <b>SkillsList.tsx</b>: This component consists of the code for the list of skills displayed as a sidebar. Here all the skills were represented as clickable tabs which when clicked showed respective questions in the QuestionSection.
- <b>SkillsList.css</b>: Styling file corresponding to the SkillsList.tsx
- <b>QuestionSection.tsx</b>: This component consists of the code for the Questions as per the skills. When a specific skill is selected from the SkillsList tab, this region shows respective questions.
- <b>QuestionSection.css</b>: Styling file corresponding to the QuestionSection.tsx
- <b>InfoSection.tsx</b>: This component consists of the code for displaying the metadata fetched during the user interaction while answering the questions in the QuestionSection. When the user attempts questions, the user interaction details (metadata) are captured and displayed in this section. (For example, Attempt count, Problem Completed, Time on Task, Fraction of Hints used, etc.)
- <b>InfoSection.css</b>: Styling file corresponding to the InfoSection.tsx
- <b>Dashboard.tsx</b>: This component consists of the code for displaying the predictions and learning resource links in a table format. When Dashboard tab is clicked in the SkillsList tab, all the metadata is sent to the backend skill-by-skill and the respective predictions and resources are displayed on this page in the dashboard table
- <b>Dashboard.css</b>: Styling file corresponding to the Dashboard.tsx

## How to run locally?

I used the command:
`npm run dev`
And this command opened the developed page on the recently used browser.

## How to deploy the app?

I used the command:
`npm run build`
And this command created a dist folder whose components I dragged and dropped in the Azure Web App Service.
