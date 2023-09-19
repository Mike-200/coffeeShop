class CoffeeShopTill {
  constructor(branch, order, itemTypes) {
    this.branch = branch;
    this.order = order;
    this.itemTypes = itemTypes;
    // list of standard products availabe with standard costs
    this.drinks = {
      // key: [friendly output for the receipt, price]
      latte: ["Latte", 3.2],
      cappuccino: ["Cappaccino", 3.15],
      flatWhite: ["Flat White", 3.5],
      americano: ["Americano", 2.85],
    };
    this.food = {
      // key: [friendly output for the receipt, price]
      croissant: ["Croissant", 1.25],
      scone: ["Scone", 0.85],
      blt: ["BLT sandwich", 3.45],
      chickenWrap: ["Chicken Wrap", 4.0],
      carrotCake: ["Carrot Cake", 1.85],
    };
  }

  // use one function that can take a parameter itemType so the same function can be reused for food and drinks, or both
  itemsOrdered() {
    const itemsOrdered = []; // athough this is not used here, it will be needed for the baristers
    let costOfItemsOrdered = 0;
    // Clear the screen and print the reciept header
    //console.clear();
    let receipt = "\n\n*** R e c e i p t ***\n---------------------\n";
    // Loop through the array of item types
    this.itemTypes.forEach((itemType) => {
      for (let i = 0; i < this.order.length; i++) {
        if (this.order[i] in this[itemType]) {
          // add the items ordered to the barister's list
          itemsOrdered.push(this.order[i]);
          // update the total cost of the order
          costOfItemsOrdered += this[itemType][this.order[i]][1];
          // add the item ordered to the receipt
          receipt += this[itemType][this.order[i]][0];
          // format the receipt so all the costs line up
          if (this[itemType][this.order[i]][0].length < 8) {
            receipt += "\t\t";
          } else if (this[itemType][this.order[i]][0].length < 16) {
            receipt += "\t";
          }
          // add the cost of the item ordered to the receipt
          receipt += "£" + this[itemType][this.order[i]][1].toFixed(2) + "\n";
        }
      }
    });
    // add the total cost at the bottom of the receipt
    receipt += `---------------------\nTotal Cost\t£${costOfItemsOrdered.toFixed(
      2
    )}\n---------------------`;
    console.log(receipt);
    return costOfItemsOrdered;
  }

  // get price of an item for sale
  get priceOfLatte() {
    console.log(
      `The price of a latte is £${this.drinks["latte"][1].toFixed(2)}`
    );
  }

  // change price of an item for sale
  set priceOfLatte(price) {
    this.drinks.latte[1] = price;
    this.priceOfLatte;
  }
}

class Customer extends CoffeeShopTill {
  constructor(branch, name, cashAvailable, order, itemType) {
    super(branch, order, itemType);
    this.name = name;
    this.cashAvailable = cashAvailable;
  }

  canCustomerAffordItems() {
    const costOfItemsOrdered = this.itemsOrdered();
    if (this.cashAvailable >= costOfItemsOrdered) {
      console.log(
        `${this.name} has £${this.cashAvailable.toFixed(
          2
        )} which is enough money to buy the items ordered.`
      );
    } else {
      console.log(
        `${this.name} has £${this.cashAvailable.toFixed(
          2
        )} which is not enough money to buy the items ordered.`
      );
    }
  }
}

const myOrder = ["latte", "flatWhite", "scone", "carrotCake"];
//const chorley = new CoffeeShopTill("Chorley");
const mike = new Customer("Chorley", "Mike", 5, myOrder, ["food", "drinks"]);
//console.log("chorley: ", chorley);
//const amountSpent = chorley.drinksOrdered(myOrder);
//console.log(amountSpent);
// console.log("chorley.drinksOrdered: ", chorley.foodOrdered(myOrder));
// console.log("chorley.drinksOrdered: ", chorley.foodAndDrinksOrdered(myOrder));
//chorley.priceOfLatte;
//chorley.priceOfLatte = 3.5; // use = (equals) as it is a setter not a function

//mike.drinksOrdered(myOrder);
//mike.itemsOrdered()
mike.canCustomerAffordItems();
