$(document).ready(function () {


    display_all_items()


});
var items_count = { "coke": 1, "sprite": 4, "cheetos": 2, "chocolate": 4, "soda": 7, "lemonade": 8, "doritos": 3, "ruffles": 3 };
var items_price = { "coke": 41, "sprite": 27, "cheetos": 14, "chocolate": 9, "soda": 10, "lemonade": 11, "doritos": 32, "ruffles": 35 };
var valid_currency_denomination = ["10", "20", "50", "100", "500"]
var selected_item = "soda"



///display all the itmes from the array into the vending machine
function display_all_items() {
    $(".vending").html("");
    $.each(items_count, function (item, item_count) {
        if (item_count < 1) {
            $(".vending").append('<div class=items ></div>')
        }
        else {
            $(".vending").append('<div class=items id=' + item + ' onclick="change_selection()">' + item + '  <br> price: ' + items_price[item] + '</div>')
        }

    });
}


////function to change the item selection
function change_selection() {
    $(this.event.target).addClass('addColor').siblings().removeClass('addColor')
    selected_item = this.event.target.id
}


function get_item() {

    var price = items_price[selected_item]
    var user_amount = $(".user_amount").val();
    if (!valid_currency_denomination.includes(user_amount))
    {
        alert("you have inserted invalid currency or invalid denomination")
        return;
    }
    if (user_amount >= price) {

        var balance = get_balance(price, user_amount);
        console.log(balance);
        $(".item").html(selected_item);
        items_count[selected_item]--;
        display_all_items()
        $(".user_amount").val('');
        $(".balance_coins").html("");
        balance.forEach(element => {

            $(".balance_coins").append("<div>" + element + "</div>");

        })
    }
    else {
        alert("insufficient amount for purchase")
    }

    console.log(items_count);

}

/////function to get the balance amount in coins
function get_balance(item_price, user_input) {
    var coin_array = [];
    if (user_input < item_price) {
        console.log("you do not have money to purchase this item");
    }
    else {
        var balance = user_input - item_price;

        if (balance > 5) {
            for (let i = 1; i <= balance / 5; i++) {
                coin_array.push(5);
            }
        }
        balance = balance % 5;

        if (balance > 2) {
            for (let i = 1; i <= balance / 2; i++) {
                coin_array.push(2);
            }
        }
        balance = balance % 2;

        if (balance != 0) {
            coin_array.push(1);
        }

        console.log(balance);
        return coin_array

    }


}
