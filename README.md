### Final questions to answer after submitting

- How many hours did you spend doing the assignment?
  I started to work on Tuesday afternoon and spent around 10 hours. I took around half an hour to understand the codebase, the app structure, and technologies, more than 1 hour to install and make the app run because some dependencies cannot install on Node v12 and create some breaking things, then I started to implement the user story.

- Short summary of what you built, how, and why.
  I built the DateRangePicker component from react-day-picker library, it worked well and had a nice design, then I dispatch the date range (start and end date) to redux store and used it to query Firebase, the query checks that the startDate and endDate of completed rentals is in the range of the inputted date range before it fetches the database.
  I wanted to used some Material-UI based library such as @material-ui/pickers but it required @material-ui/core v4, I tried to update @material-ui/core v3 to v3, but it breaked the whole app and cannot migrate in a short time.
  Next I took advantage of Material UI components to build a pagination table to show the list of rentals, format the Date string for it easier to read.

- Tell about your process: how did you get familiar with the existing code, where did you start first, which parts of the excercise did you focus on the most?
  After reading through the README, I started to view dependencies in package.json to see total technologies in the app, then look through the views, routes, components to see how much pages the app has, the complexity in general. After that I see the actions and reducers to understand the communication flow between components. Most of the time I focused on the date range picker challenge, built and got it work with redux.

- Was there some parts of the exercise that were challenging, or you could not do? What took most of your time?
  Find an solution for choosing a compatible date pickers library with the app and dependencies installation took most of my time. Just a few libraries based on Material UI, some of the them use @material-ui v4, the remaining use the old material-ui which was deprecated and unsupported Typescript. I tried to migrate but unsuccessful and ended up to use react-day-picker, it also took time to make it work with TypeScript. I was also unsuccessful when install dependencies at the first time and finally had to downgrade Node.js from v12 to v10 to make it work. 

- If you had more time, what would you develop more for your Reporting view?
  If I had more time I would be adding more information to the reporting view, add some functions such as sorting the list to see the most people spend on the rental services, and some filtering functions. Beside I would also add some charts to visualize data such as show total customers in a day, total revenue in a day in a range date, show revenue increase/decreasing by the time.

- Which technologies/libraries/frameworks in the coding exercise were new to you, and which were you already familiar with?
  This is the first time I use Material UI. I have already worked with TypeScript, React, Redux, Firebase and used CSS in JavaScript with Styled-jsx when working with Next.js, I see it similar to JSS.

- What was your first impression of the new technologies that you tried?
  I really like TypeScript, since the last year when I got to know it, I always tried to use it instead of JavaScript as most as possible when working with React, Redux, Next.js, Node and see it’s more convenient to code, so I was happy when starting to work with this exercise.

- Was there something in the database architecture of the rentals that was odd or that you would change to make it easier to compose data for the Reporting view?
  It was not odd to me, but I think the nested route was quite deep and two much excess data, it would be not efficient when querying the data, it took a bit long to fetch, more data transfer and had to go through a long tree to reach the needed data. Maybe you could think about GraphQL, it is extremely efficient in querying data, just get only and total what we want in a query.

- Feedback to us: How did you like the coding excercise? What could we improve in it? Any other comments about the existing code or about the exercise?
  The code challenge is quite interesting to me. The application is not so complicated but also has many challenges to do in the limited time. The codebase and logic is clean and well-structured. Something you could improve is that you should upgrade the dependencies sometime in a while, so that it doesn’t create a big breaking.



## Rentle coding exercise

### Introduction to the exercise

Welcome to Rentle's code exercise! We have tried to create an exercise that follows the main technologies that are currently in use at Rentle for you to see that with which kind of technologies we currently work with, and you could potentially too. We hope that you learn something new while doing this exercise.

We don't want that you feel overwhelmed about the amount of work you need to do for the exercise. It is okay to spend just a few hours for this, and we hope that you would not spend more than 8 hours. If you absolutely want to do more, then sure go ahead! But we don't expect it in any way. 

Also, if you do not have a lot of time available, you can also do only a subsection of the exercise, and write down how you would have done the other parts or extend your solution.

Remember, if there are any questions that come to your mind, or you face any issues that you are struggling with, you can always ask us for information or help.

### Project structure

The exercise project is created with `create-react-app-typescript`.
The main technologies used in the project are Typescript, React, Redux, React Router, Firebase and Material UI. For styling, the project uses JSS.

The project has a basic structure in place with examples of some views, components, actions and reducers.
There is a basic authentication logic in place and logic to fetch the correct shop and rentals data for the signed in user, in addition with some basic views and components done. If you have some issues, you can try to look for examples from these files.

The needed interfaces for Typescript types should also be in `common/types` and `services/types` files.

### Case description

Our imaginary pilot customer is a ski rental shop owner and super excited about Rentle, but he is really looking for a way to get good reports out of all the rentals that are made through the Rentle software.
For this requirement, the Rentle team formed a user story for the Reporting feature:

---

Our customer wants to get a reporting view of all the rentals that are going through the software.
The report should show all the completed rentals from the selected date ranges.
The report should also show data that is interesting for our customer, who is operating a rental business (such as amount of rentals, total revenue from the rentals, most popular products, average rental prices, average rental durations etc.)

---

A developer of the Rentle team was only able to create a dummy Report view that only fetches all the shop's rentals from the Firestore database, and lists them all to a simple HTML table. The Reports component was **not** optimally made, and the Reporting view is not sufficient to meet the requirements of the described user story.

### The content of the code exercise

Your task is to fulfill the requirements of the user story by modifying the Reports view (and other parts of the code if needed to structure your implementation).
To help you complete the task, Rentle team has listed some steps that should be in the final submitted version:

1. Create a component that allows the user to select a specific date range to view all the completed rentals from that date range. You can take advantage of other libraries or implement it by yourself, whichever you think is better.

   *Optional*: Edit the database fetching logic, so that you fetch only the rentals that you need to show in the UI based on the selected date range. (If you think of a case, where there is 10000 rentals, it is not very efficient to fetch all of them if the UI needs to show only 100)

2. Fulfill the requirements of the user story by adding more information to the reporting view. Think yourself in the shoes of the rental shop owner, and think which kind of data would be beneficial for them to see in order to improve their daily rental business. Moreover, take advantage of the Material UI library and improve the UI of your Reports view to make it easier to read and more informative (the final visual design of the Reporting view is not important, but focus more on the functionality).

3. Structure your code so that it follows React/Redux best practices.

4. Answer to the questions in the end of the readme-file after the other parts are done and before you submit your exercise.

### Running the exercise locally

1. Clone the code-exercise repository
2. In the root folder:

`npm install`


`npm start`



CLI should open your browser and the app should start running in localhost:8000

For the exercise, you can login with Rentle Shop user credentials:

Username: `rentleshop@rentle.io`

Password: `RentleShop`


We have added some mock rental data to Rentle Shop user that the project fetches from the database. You should use this data to complete the exercise.

### Submit instructions

Clone this repository and make all the changes to your own repository that you push to your own GitHub / other collaboration platform. You can push your result to a private or public repository.

When you are ready to submit, send us an email to `founders@rentle.io` to let us know that you have submitted the exercise. If the solution is in a public repository, give us the URL for the repository. If it is in a private repository in GitHub, invite also `tooga` GitHub username as a collaborator. If it is in some other platform, give us instructions on how to access your submitted solution.

Remember to answer to the questions in the readme. You can either send them to us in the submit email, or write them directly to your readme file.

### Additional information

When implementing the code exercise, there are no requirements to modify the already written code in other places than in the Reports view.
However, if you want to change the current code structure or change the existing code somehow, you are free to do so.

##### Typescript
You can see the data structure of the rentals from the `InStoreAPI` interface from the `common/types` file. The other needed data should also be already typed.
If you have issues with Typescript type errors, and cannot fix them, the last thing to fix them is to set the asked type as `any`. Then the Typescript will not give an error of the wrong type. Still, we encourage you not to use `any` types if you can.

### Contacting in case of errors or questions
If you encounter any issues or questions that you would need help with, or would help you to do the exercise, please be in contact with us.
We do not expect you to know everything in advance or to learn very complicated things for the sake of the exercise. Just like in a normal developing environment, if you encounter things that you need help with to proceed, send us an email to `founders@rentle.io` or contact `@toomask` in Telegram.

### Final questions to answer after submitting

- How many hours did you spend doing the assignment?

- Short summary of what you built, how, and why.

- Tell about your process: how did you get familiar with the existing code, where did you start first, which parts of the excercise did you focus on the most?

- Was there some parts of the exercise that were challenging, or you could not do? What took most of your time?

- If you had more time, what would you develop more for your Reporting view?

- Which technologies/libraries/frameworks in the coding exercise were new to you, and which were you already familiar with?

- What was your first impression of the new technologies that you tried?

- Was there something in the database architecture of the rentals that was odd or that you would change to make it easier to compose data for the Reporting view?

- Any other comments about the existing code or about the exercise?

- Feedback to us: How did you like the coding excercise? What could we improve in it?