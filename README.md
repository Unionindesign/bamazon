# bamazon
## A terminal app using MySql, node.js and npm inquirer

_First step was to create the database and tables_

![GitHub Logo](/images/mysqlDB.png)

_Next, use the inquirer npm package to prompt the user to select an item. Query the database, and show a list of results:_ 

![GitHub Logo](/images/Select_an_item.png)

_The next prompt would ask for an amount..._
![GitHub Logo](/images/prompt_how_many.png)

_At this point you are looping through an array of all the objects, checking the inventory of the product picked by the user, and if there's enough in stuck, fulfill the order by tellin ght user their order total. I didn't get the database to update but came close!_

![GitHub Logo](/images/order_total-updateDB.png)
