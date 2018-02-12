const inquirer = require('inquirer');
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'bamazon'
  });

  connection.connect(function(err) {
    if (err) throw err;
    buyThings();
  });
  

function welcome () {
    console.log('**** Welcome to the bamazon web terminal store ****');
}
welcome();
function buyThings() {

    connection.query("SELECT * FROM products", function(err, results) {
        if (err) throw err;
        inquirer
        .prompt([
            {
                name: "choice",
                type: "list",
                message: 'What would you like to buy?',
                choices: function() {
                    var productArr = [];
                    for (var i = 0; i < results.length; i++) {
                        productArr.push(results[i].product_name);
                    }
                    return productArr;
                },
            },
            {
                name: "amount",
                type: "input",
                message: "How many would you like to buy?"
            }
        ]).then(function(answer){
            var itemPicked;
            for (var i = 0; i < results.length; i++) {
            if (results[i].product_name === answer.choice) {
                itemPicked = results[i];
            }
        }
            //Check if enough in inventory
        let query = "SELECT * FROM products WHERE ?";
            connection.query(query, {product_name: answer.choice}, function(err, res){
            if(res[0].stock_quantity >= answer.amount){
                console.log("Order placed successfully!. Your total is: $", answer.amount * itemPicked.price);
                buyThings();

            }else if(res[0].stock_quantity < answer.amount){
                console.log("/-- Not enough in inventory. Revise your quantity or Select a different item. --/");
                buyThings();
            }
        })

        let queryInv = "UPDATE products SET ? WHERE ?";
            connection.query(queryInv, {stock_quantity: -answer.amount}, function(err,res){
                    [
                        {
                        stock_quantity: res
                        },
                        {
                        id: itemPicked.id
                        }
                    ],
                console.log(err);
        // There's something missing above ...db won't update?         
        
        })
    })
})
}
