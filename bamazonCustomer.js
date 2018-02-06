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
    
});
//retrieves a list of all products from database
function getAllProducts(connection) {
    connection.query('select *from products', function (err, res) {
        if (err) { throw err };
        console.log("----------------------------------------------------------------");
        for(var i = 0; i<res.length;i++){
            console.log("Item ID: " + res[i].item_id +" "+ "Product: " + res[i].product_name.toUpperCase() + " " + "Price: $" + res[i].price + " " + "Qty: " + res[i].stock_quantity);
            console.log("----------------------------------------------------------------")
        }
        promptBuyer();
    })
}

//prompts user for product choice and quantity desired
function promptBuyer(){
    connection.query("select * from products", function(err, res){
        inquirer
        .prompt([
            {
                name: "itemChoice",
                type: "input",
                message: "Please enter the item ID of the item you'd like to buy"
            },
            {
                name: "itemQuantity",
                type: "input",
                message: "How many would you like to buy?"
            }
        ])
        .then(function(answer){
            var itemChoice = parseInt(answer.itemChoice);
            var itemQuantity = parseInt(answer.itemQuantity);
            var price;
            for (var i = 0; i < res.length; i++){
                if(res[i].item_id === itemChoice){
                    price = res[i].price;
                    quantityAvail = res[i].stock_quantity;
                }
            }
            if(itemQuantity < quantityAvail){
                console.log("--------------------------------------------------")
                console.log("Your total is: $" + (price * itemQuantity).toFixed(2));
                console.log("Thank you for shopping at Bamazon!!");
                console.log("--------------------------------------------------")
            }else{
                console.log("------------------------------------------------------------")
                console.log("Sorry, we only have " + quantityAvail + " available.")
                console.log("------------------------------------------------------------")
                inquirer
                .prompt([
                    {
                        name: "newItem",
                        type: "confirm",
                        message: "Would you like to change your order?"
                    },
                ]).then(function(response){
                    if(response.newItem){
                        promptBuyer();
                    }else{
                        return;
                    }
                })
            }   
        })
    })
}