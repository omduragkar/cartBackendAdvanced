# cartBackendAdvanced


## Installation:
There are total 4 easy steps to run this application:
     1. Click in clone button on the github repo: (https://github.com/omduragkar/backendforPlotLine).
     2. Or  download zip file and make sure you have installed nodejs
     3. Now  add command in file:
          npm install
          node index.js.
     4. Server is running you can check api which are PORT on: 5000.
     5. Adding .env for ease make sure to install mongoDB
     Viola! It's working now!


## POSTMAN:
     Link for the same: https://red-rocket-170166.postman.co/workspace/Team-Workspace~c8ee0c6d-45ab-4728-81be-e1f07af37bbc/collection/17650229-44943d71-e436-461a-a7f9-1f0643b8c05c?action=share&creator=17650229
## STACK:
     1. Database: MongoDB
     2. Authentication: JWT
     3. ODM: Mongoose
     4. Framework: Express
     5. Nodejs Ofcourse!
## Brief about Solution:
	1. I have created Models for:
          a. User:
               1. It adds Email, cart, total Values such as taxes, amount, etc.. and total order placed.
               2. Added role wise access with default as User.
               3. Admin Rights:
                    a. Can add Items ie product or Services
                    b. Can view all orders in godMode i.e. populated: cartItems, User who Placed order and Date of order. 
          b. Orders:
               1. It consist of toal Order Placed by many User with bill Value which can be directly accessed by Admin
               2. Also consist of bill Amount and extras.
          c. Item:
               1. For Products and Services.
          d. CartItem:
               Made diffrent because storing each cart Item value, quantity and price for the same.
     2. Routes and Test cases:
          a. Admin:
               1. Can add Items and Services
               2. Can check for all Orders
          b User:
               1. Can Create Account
               2. login for token
               3. get All Items
               4. add to cart(Here quantity wise cart items are stored and bill amount is determined here itself!)
               5. Remove from cart(Not quantiy wise directly removing that item)
               6. Place order
                    (Can't Place empty order!)
                    (Also after placing order the cart is cleared! so as to save multiple attempts!)
               7. Bill:
                    (This was sorted because of helper functions that i created. Alos order value being already totaled at add to cart moment)
               8. Clear Cart:
                    (Clear total Amount and items in cart!).
     3. Helper:
          1. Function for doing summations of cart value
          2. JWT token to authenticate ENDPOINT.
          3. Database Connection
          4. Customizing response with function!
     4. Constants:
          1. consist of constants such as role and product or service/
     5. MiddleWares:
          1. To protect the routes according to access!
     6. Controller:
          Sorted with respect to routes access!
     Haven't completed since have solved many edge cases in controllers can check!
