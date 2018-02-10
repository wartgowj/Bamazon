# Bamazon

A CLI storefront program utilizing Node and MYSQL.


CUSTOMER INTERFACE

run bamazoncustomer.js to start the customer experience

The app will automatically display all the items available to purchase.

It will then prompt the customer to enter the item number they wish to purchase.

It will then prompt for the quantity desired.

If enough of the item is available to fulfill the order it will give the customer their total amount due.

It will then adjust the item's inventory level in the database.

If there is not enough available to fill the order it will notify the customer and ask if they want to change thier order. 

MANAGER INTERFACE

run bamazonmanager.js to start the manager experience

The app will display the options the manager can choose from:

VIEW PRODUCTS FOR SALE - displays all items in the product database

VIEW LOW INVENTORY - shows all items that have an inventory level less than 5

ADJUST INVENTORY - allows manager to add or remove from an items inventory in the database

ADD NEW PRODUCT - allows manger to add a new item to the product database.

EXIT - exits the app
