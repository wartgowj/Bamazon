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
            console.log("Item ID: " + res[i].item_id + " " + "Product: " + res[i].product_name.toUpperCase() + " " + "Price: $" + res[i].price + " " + "Qty: " + res[i].stock_quantity);
            console.log("----------------------------------------------------------------")
        }
        managerPrompt();
    })
}

//adds inventory to a particular item
function addInventory(connection) {
    connection.query('select *from products', function (err, res) {
        if (err) { throw err };
        console.log("----------------------------------------------------------------");
        for (var i = 0; i < res.length; i++) {
            console.log("Item ID: " + res[i].item_id + " " + "Product: " + res[i].product_name.toUpperCase() + " " + "Price: $" + res[i].price + " " + "Qty: " + res[i].stock_quantity);
            console.log("----------------------------------------------------------------")
        }
        managerPrompt();
    })
}

//add a new item to the database
function addProduct(connection) {
    connection.query('select *from products', function (err, res) {
        if (err) { throw err };
        console.log("----------------------------------------------------------------");
        for (var i = 0; i < res.length; i++) {
            console.log("Item ID: " + res[i].item_id + " " + "Product: " + res[i].product_name.toUpperCase() + " " + "Price: $" + res[i].price + " " + "Qty: " + res[i].stock_quantity);
            console.log("----------------------------------------------------------------")
        }
        managerPrompt();
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
                choices: ["View Products For Sale", "View Low Inventory", "Add To Inventory", "Add New Product", "Exit"],
                name: "processChoice"
            }
        ])
        .then(function(answer){
            var managerChoice = answer.processChoice;
            switch (managerChoice) {
                case 'View Products For Sale':
                    getAllProducts(connection);
                   // break;
                case 'View Low Inventory':
                    viewLowInventory(connection);
                    break;
                case 'Add To Inventory':
                    addInventory(connection);
                    break;
                case 'Add New Product':
                    addProduct(connection);
                    break;
                case 'Exit':
                    connection.end();
                    break;
                default:
                    console.log("Sorry, command not recognized. Please choose again")
                    managerPrompt();
                    break;
            }
        })
    }
