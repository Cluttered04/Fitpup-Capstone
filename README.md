Fit pup - Your best friend's fitness app

A calorie, weight, and exercise tracker for your furry friend

## To install
Visit https://github.com/Cluttered04/Fitpup-Capstone and clone down a branch to your local directory then "checkout -b *name*" a new branch to test. Run the commands "npm install react", "npm install --save moment react-moment", "npm install react-bootstrap bootstrap", "npm install recharts", and "npm install react-router-dom" to install the necessary node modules. Run the "npm start" command to launch application in your browser.

## Front page
When the user visit the website, they will be greeted with a splash information page with a "Please sign in" message, and a green sign in button on the navbar.

## Authentication
Upon clicking the "Sign in" button, an auth0 authentication pop up will display, and the user may create a new account or log in. Upon log in, the user's information will be saved to session storage and they will be able to navigate to the other pages of the application. User will be on the "Dog Summary" page immediately upon sign in.

## Dog Summary/Home
Upon sign in, or upon clicking the "Home" button on the nav bar, the user will be taken to a page where they may view a list of their saved dogs. For each dog, an image will be displayed, underneath which the user will see their dog's name and breed. A user may click the "Add new dog" button to reach a form where they may enter a new dog's information - name, breed, age, activity level, and whether the dog is neutered/spayed. Upon saving the dog's information, they will be returned to the dog list, now with the new dog's information.

User may edit a dog by clicking the "Edit dog" button. They will be redirected to a pre-populated form that will allow them to change previously saved details about their dog. Upon saving their changes, they will be taken back to the dog list with their updated dog's new information.

User may also navigate to the food or exercise list pages by clicking the "My foods", or "My exercises" buttons respectively, or by clicking on the nav bar.

## Food/Exercise list pages
Upon visiting the foods list page, a user may view a list of pre-seeded data of a variety of food's names, brands, calorie counts, and serving sizes, as well as any foods they have previously entered for personal use. They may edit the details of any food they have personally entered by clicking the "Edit" button to be taken to a form when they may change the food's details. Upon saving those details, they will be returned to the updated Food List page. A user may add a new food by clicking the "Add New Food" button. This button will render a form allowing them to enter details of a food for personal later user. User will be returned to the updated Foods List upon saving their food details.

The exercise list page functionality is the same as the food list page, with the exception of displaying only the name of the activity.

## Adding an individual entry to a dog
To add a food or exercise entry for their dog, a user may click the name or brand of the food or exercise in the list. Clicking will generate a modal containing a form. This form will conditionally render with the item's name prefilled. User will be able to choose a dog for either entry, then enter a time (in minutes) for exercises, and number of servings for foods. Clicking the "Submit" button on the modal will close the modal while posting their new entry to the database.

## Dog Summary Page
A user may click the image associated with a dog on their dog list/home page to view that dog's summary page. The summary page will have the individual dog's information at the top. Under this information, a user may record their dog's weight. The three most recent weigh ins are available to view underneath, along with a graph that shows the dog's weight changes over time. There is also a graph showing the dog's exercise activity over time.

Previously entered food entries are grouped, by date, underneath, with a header displaying the day of the entries and a calculated calorie total. Previously entered exercise entries are also grouped by date, displaying the date header and total time spent exercising for that day.

User may click the "Add New Food Entry" or "Add New Exercise Entry" to be returned to the food or exercise list, respectively, where they may make a new entry for their dog.

User may click the "Edit" button on any entry to display a modal with the dog's name and the name of the food/exercise previously entered pre-rendered. User may then make changes to the number of servings or time (in minutes) spent exercising. If a user enters something other than a number for either field, they will receive a helpful error message. Upon clicking "Submit", their entry's information will be saved and update in the dog summary page, displaying with an updated total calorie count/time spent header in the appropriate day.

User may delete any individual entry by clicking the "Delete" button on the entry, which will update their list and the appropriate total time/calorie headers for that day.