var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "19dart67",
    database: "bamazon"
});

// connect to the mysql server and sql database
connection.connect(function (err) {
    if (err) throw err;
    //gets all products from database
    getAllProducts(connection);
    //prompts the user
    //startPrompt();
});

function getAllProducts(connection) {
    connection.query('select *from products', function (err, res) {
        if (err) { throw err };
        console.log("---------------------------------------------------------");
        for(var i = 0; i<res.length;i++){
            console.log("Item ID: " + res[i].item_id +" "+ "Product: " + res[i].product_name.toUpperCase() + " " + "Price: $" + res[i].price + " " + "Qty: " + res[i].stock_quantity);
            console.log("---------------------------------------------------------")
        }
    })
}

// 6. The app should then prompt users with two messages.

//    * The first should ask them the ID of the product they would like to buy.
//    * The second message should ask how many units of the product they would like to buy.

// 7. Once the customer has placed the order, your application should check if your store has enough of the product to meet the customer's request.

//     * If not, the app should log a phrase like`Insufficient quantity!`, and then prevent the order from going through.

// 8. However, if your store _does_ have enough of the product, you should fulfill the customer's order.
//     * This means updating the SQL database to reflect the remaining quantity.
//    * Once the update goes through, show the customer the total cost of their purchase.