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
    //prompts manager for process choice
    managerPrompt(connection);
    
});

//shows all items with an inventory level below 5
function viewLowInventory(connection) {
    connection.query('select *from products', function (err, res) {
        if (err) { throw err };
        console.log("----------------------------------------------------------------");
        for (var i = 0; i < res.length; i++) {
            if(res[i].stock_quantity < 5){
            console.log("Item ID: " + res[i].item_id + " " + "Product: " + res[i].product_name.toUpperCase() + " " + "Qty: " + res[i].stock_quantity);
            console.log("----------------------------------------------------------------")
            }
        }
        managerPrompt();
    })
}

//adds inventory to a particular item
function addInventory() {
    connection.query("select * from products", function (err, res) {
        inquirer
            .prompt([
                {
                    name: "itemChoice",
                    type: "input",
                    message: "Please enter the item ID"
                },
                {
                    name: "itemQuantity",
                    type: "input",
                    message: "How many would you like to add?(use negative numbers to reduce inventory"
                }
            ])
            .then(function (answer) {
                var itemChoice = parseInt(answer.itemChoice);
                var itemQuantity = parseInt(answer.itemQuantity);
                var quantityAvail = false;
                for (var i = 0; i < res.length; i++) {
                    if (res[i].item_id === itemChoice) {
                        quantityAvail = res[i].stock_quantity;
                    }
                }
                if (quantityAvail) {
                    console.log("--------------------------------------------------")
                    console.log("You have adjusted item number " + itemChoice + "\'s" + " inventory by " + itemQuantity);
                    console.log("--------------------------------------------------")
                    newQuantity = (quantityAvail + itemQuantity);
                    connection.query("UPDATE products SET ? WHERE ?", [
                        {
                            stock_quantity: newQuantity
                        },
                        {
                            item_id: itemChoice
                        },
                    ])
                    managerPrompt();
                } else {
                    console.log("------------------------------------------------------------")
                    console.log("Sorry, that item is not recognized")
                    console.log("------------------------------------------------------------")
                    inquirer
                        .prompt([
                            {
                                name: "tryAgain",
                                type: "confirm",
                                message: "Would you like to try again?"
                            },
                        ]).then(function (response) {
                            if (response.tryAgain) {
                                addInventory();
                            } else {
                                console.log("------------------------------------------------------------")
                                console.log("Ok, exiting application")
                                console.log("------------------------------------------------------------")
                                connection.end();
                            }
                        })
                }
            })
    })
}

//add a new item to the database
function addProduct(connection){
    inquirer
    .prompt([
        {
            name: "itemName",
            type: "input",
            message: "Please enter the item name"
        },
        {
            name: "itemDept",
            type: "input",
            message: "Please enter the item's department"
        },
        {
            name: "itemPrice",
            type: "input",
            message: "Please enter the item's price"
        },
        {
            name: "itemInventory",
            type: "input",
            message: "Please enter the item's current inventory"
        }
    ]).then(function(answer){
        connection.query("INSERT INTO products SET ?", 
        {
            product_name: answer.itemName,
            department_name: answer.itemDept,
            price: answer.itemPrice,
            stock_quantity: answer.itemInventory
        },
        function(err, res){
            console.log("------------------------------------------------------------")
            console.log(answer.itemName + " has been added to product database")
            console.log("------------------------------------------------------------")
            managerPrompt();
        })      
    })
}

//retrieves a list of all products from database
function getAllProducts(connection) {
    connection.query('select *from products', function (err, res) {
        if (err) { throw err };
        console.log("----------------------------------------------------------------");
        for(var i = 0; i<res.length;i++){
            console.log("Item ID: " + res[i].item_id +" "+ "Product: " + res[i].product_name.toUpperCase() + " " + "Price: $" + res[i].price + " " + "Qty: " + res[i].stock_quantity);
            console.log("----------------------------------------------------------------")
        }
        managerPrompt();
    })
}

//prompts mangager for process desired
function managerPrompt(){
        inquirer
        .prompt([
            {
                type: "list",
                message: "Which process would you like to perform?",
                choices: ["View Products For Sale", "View Low Inventory", "Adjust Inventory", "Add New Product", "Exit"],
                name: "processChoice"
            }
        ])
        .then(function(answer){
            var managerChoice = answer.processChoice;
            switch (managerChoice) {
                case 'View Products For Sale':
                    getAllProducts(connection);
                    break;
                case 'View Low Inventory':
                    viewLowInventory(connection);
                    break;
                case 'Adjust Inventory':
                    addInventory(connection);
                    break;
                case 'Add New Product':
                    addProduct(connection);
                    break;
                case 'Exit':
                    console.log("------------------------------------------------------------")
                    console.log("Ok, exiting application")
                    console.log("------------------------------------------------------------")
                    connection.end();
                    break;
                default:
                    console.log("Sorry, command not recognized. Please choose again")
                    managerPrompt();
                    break;
            }
        })
    }
