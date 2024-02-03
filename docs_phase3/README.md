Portfolio Assignments - DLBCSPJWD01
Project: Java and Web Development

Table of Contents:
1.  Overview
2.  Installation Instructions
3.  Instructions on running application
4.  Navigating the website
5.  Testing

1.  Overview:
This is an e-commerce website selling toys. It is a colourful, fun and easy website to navigate.  The frontend is built using React.js for the building of the user interface.  Utilising React Router for client-side routing and styling employs CSS for basic styling of components.

The backend API is utilised to fetch product data.  We utilise Node.js as server-side framework for handling requests and managing the backend logic.  I chose MongoDB as the database to store and retrieve data related to products and users.

The website caters to toy enthusiasts, parents of small children and teenagers.  The website was designed to be fun and engaging and appealing to children and those young at heart.

The products are based on categories: FNAF (Five Night's at Freddys), Minecraft and Assorted.  The product pages give detailed descriptions and enlarged images and pricing.  The website offers easy navigation and you are able to browse between different pages seamlessly.

2.  Installation instructions:

Prerequisites:

Visual Studio Code (VSCode)
Node.js
MongoDB
Extension for VSCode:  Thunder Client

VSCode:
Visit the official Visual Studio Code website: https://code.visualstudio.com/.  Download the installer for your operating system and follow the instructions provided by your operating system.

VSCode also supports extensions that can enhance your development experience.  These are common extensions for web development:

    ESLint:  JavaScript and TypeScript linting.  Linting is the process of analysing code for potential errors, bugs, stylistic issues or problematic patterns.
    Prettier - Code formatter:  Code formatting for various languages.
    Node.js Modules Intellisense:  Completes the wording whilst typing for ease of coding.

Node.js:
Install Node.js on your machine.  You can download from https://nodejs.org/.

MongoDB Compass:
Install MongoDB Compass on your machine by following instructions at https://www.mongodb.com/docs/compass/current/install/.

Thunder Client:
This is an extension that will be found in the extension market in VSCode.  Search Thunder Client from creator Ranga Vadhineni, install and it is automatically enabled, if not, enable the extension.  The icon, lighting bolt encircled can be found in the far left menu of VSCode.

3.  Instructions on running application

Clone the repository:

    GitHub:  Clone the GitHub repository to your pc using the following command in either VSCode or Terminal.  Type the following in the terminal:

    git clone https://github.com/Choweymajinks9/Web-Application-Development

Backend Setup (Node.js with Express):
Navigate to a new terminal window with the root folder and prompt and go to your backend folder by typing:

    cd backend

Install the dependencies by typing the following in terminal:

    npm install

Start the backend server by typing the following in terminal:

    node .\index.js

The backend should be running on http://localhost:4000.  The terminal console will display a message saying that the server is running at port 4000.  If the link is opened, a new tab will open in your browser and a message will be displayed, "Express App is Running".  That is from the following string in the index.js file in backend:

    app.get("/",(req,res)=>{
    res.send("Express App is Running")

MongoDB:
There is a connection string that is located in index.js in the backend folder that connects to the cluster hosted by MongoDB.  Open your MongoDB Compass app on your pc and paste the following URI into:

mongodb+srv://mpsstore001:01mystoreisOP3n@cluster0.4hmk1ep.mongodb.net/mpsstore

It is configured to allow all IP addresses to connect to the database.  The string (with comment prestring) is and includes the username and password for an easy connection.  Click the "Save&Connect" button to connect to the database.  You will be connected to the mpsstore database, you will find under mpsstore database, both products data and user data.

Frontend Setup (React.js):
Working in your folder which hosts your frontend, backend and admin folders.  Open a terminal for this root directory and change the directory to the frontend by typing:

    cd frontend

Install dependencies:
Install the required dependencies using npm by typing in your terminal the following:

    npm install

Start the React development server:

    npm start
    
The development server will begin and open the homepage in your browser.  The web address is:

    http://localhost:3000

Admin Panel (for adding and removing product):
Navigate to a new terminal window with the root folder and prompt and got your admin folder by typing:

    cd admin

Install the dependencies by typing the following in terminal:

    npm install

Install Vite by typing the following in terminal:

    npm install --save-dev vite

Start the admin panel by typing the following in terminal:

    npm run dev

The console will display the http link to click and open the admin panel in a new tab in your browser.  Just hold the CTRL button on the keyboard and left click on your mouse (or right click depending on your dominant hand). You will have 2 options, the first is "Add Product" and the second is "List Product".  You will be able to add a product through the "Add Product" with completing the different fields.  If you click the "List Products", all products will be fetched from the database including any new products you add to the database.

4.  Navigating the website:
You will be taken to the homepage, which is the "Shop" page.  You will see on the navbar, the menu items are Shop, FNAF, Minecraft and Assorted Toys.  These are clickable links and will show all the relevant categorised products.  

There is a "Login" button.  If you click this, it will take you to the login page.  New users must click the word "Click here" and it will take you to the "Sign Up" page, where you are able to create your user login details.  Once logged in you may navigate the store and add products to your cart.

Once products are added, you go to your "Cart" page by clicking the icon and view the products chosen.  If you wish to up the quantity of certain products, go back to the page that has the product, open it and click "Add to Cart" however many times you want to add product.  Should you wish to remove 1pc at a time, you may do so in the "Cart" page by click the "X" under the "Remove" heading and it will delete 1pc quantity at a time.

Once happy, select one of the countries to ship to and the corresponding city and the shipping charges will be automatically added.  Should you wish to use a promotional code, use either "SAVE10" or "SAVE50" for 10% or 50% off the product only.  The shipping cannot be discounted.

Click "Proceed to Checkout" and the message will be displayed.

Exclusive Offers:
On the homepage, scroll down to the Exclusive offers for you container and click the "Check Now" button and a few products will be selected at random for you, the buyer to view.  Click the "Shop" link at the top and scroll down to the exclusive offer container and if you click the button again, a new set of products will be displayed.

Newsletter:
At the bottom of the homepage, there is a container with an input to put in a valid email address to subscribe to the newsletter.  If the email address is not recognised as a valid email address, a prompt will display alerting to the fact.

5.  Testing:
To test endpoints, we will make use of Thunder Client, the extension on VSCode.  Ensure that the backend has been started.  Refer above to point 3.  Click the icon and then click "New Request", choose POST and test the first API.  The URL is http://localhost:4000/upload.  Below this, click "Body" and then click "Form".  Below this you will see "Form Fields" and "File".  Under "File", check "product" and click "choose file" and choose an image file and then click the blue "SEND" button.  If passed, you will see under "Response" in the right section, the following message:

{
  "success": 1,
  "image_url": "http://localhost:4000/images/product_1706903257301.png"
}

Copy the URL of the uploaded image and open a new tab in your browser and paste the URL in the address bar.  The image should load.

To test user creation for logging in, create a user by providing an email address for user and a password and save and log in.  To confirm that the user has been saved in the backend, open your MongoDB compass app, go to users under mpsstore and if successful, you will find the newly created user.








