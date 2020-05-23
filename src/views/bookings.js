import $ from "jquery";
import { Cart } from "./../cart/cart";

export const bookings = () => {
  let roomObj = "";
  let cart = new Cart();

  roomObj = fetch("http://localhost:3000/rooms")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      main(data);
    })
    .catch(function (error) {
      console.log(error);
    });

  function main(rooms) {
    const cookiesCart = cart.getItSpaCart();
    const cartPreview = cookiesCart.sort(function(a, b) {
      return a.name.localeCompare(b.name);
   });
    console.log(cartPreview);


    const countedCart = {};
    cartPreview.forEach(function (obj) {
      const key = [obj.name, obj.price];
      countedCart[key] = (countedCart[key] || 0) + 1;
    });
    console.log(countedCart);

    const final = [];
    cartPreview.forEach(function (obj) {
final.push(obj.price)    });

    console.log(final)
    const finalCost = final.reduce((acc, value) => value + acc, 0)

    console.log(finalCost)

    for (let things in countedCart) {
      const nameAndPrice = things.split(",");
      console.log(nameAndPrice);
if(nameAndPrice[0].includes("Room")){
  const roomArr = cartPreview.filter(room => room.name == nameAndPrice[0]);
const room = roomArr[0];
const nicerDates = `${room["bookedDates"][0].split("-").reverse().join(".")} - ${room["bookedDates"][1].split("-").reverse().join(".")}`
  $("#roomsHere").append(
    $(
      `<tr>
        <td>${room["name"]}, ${nicerDates}
        </td>
        <td id="td-${nameAndPrice[1]}"> ${nameAndPrice[1]} euros</td>
        <td>
        <button class="btn btn-secondary btn-sm remove-btn" id="remove-${nameAndPrice[1]}">X</button> 
        </td>
        </tr>`
    )
  );
} else {

        $(
          `<tr>
            <td>${nameAndPrice[0]}
            </td>
            <td id="td-${nameAndPrice[1]}"> ${nameAndPrice[1] * countedCart[things]} euros</td>
            <td>
            <button class="btn btn-secondary btn-sm remove-btn" id="remove-${nameAndPrice[1]}">-</button> 
            ${countedCart[things]}
            <button class="btn btn-secondary btn-sm add-btn" id="book-${nameAndPrice[1]}">+</button>
            </td>
            </tr>`
        
      ).appendTo($("#here"))
   ;}
   $(`#remove-${nameAndPrice[1]}`).on("click", function (e) {
    e.preventDefault();
    remove(nameAndPrice[0]);
  });
  $(`#book-${nameAndPrice[1]}`).on("click", function (e) {
    e.preventDefault();
    book(nameAndPrice[0], nameAndPrice[1] * 1);
  })

    };
    $("#total").html(
      $(
        `<tr>
        <td></td>
          <td><b>Total:</b> ${finalCost} euros</td>
          <td></td>
        </tr>
      </>`
      ))
  }

  const fragment = $(new DocumentFragment());

  const h1 = $("<h1>Bookings</h1>");
  const booking = $(`<table class="table table-hover mx-auto">

  <thead>
    <tr>
      <th scope="col">Treatment</th>
      <th scope="col">Price</th>
      <th scope="col">#</th>
    </tr>
  </thead>
  <tbody class="here" id="here">
  <thead>
  <tr>
    <th scope="col">Booked Room</th>
    <th scope="col"></th>
    <th scope="col"></th>
  </tr>
</thead>
<tbody class="roomsHere" id="roomsHere">
<tfoot id="total">
</tfoot>
</tr>
  </tbody>
</table>`);

  fragment.append(h1).append(booking);

  return fragment;
};

let cart = new Cart();

export function book(itemName, itemPrice) {
  let cartItem = { name: itemName, price: itemPrice };
  cart.exists() ? cart.add(cartItem) : cart.setItSpaCart([cartItem])
  console.log(cartItem);
  $("#here").empty();
  $("#roomsHere").empty();

bookings()
}

 function remove(itemName) {
  let cartItem = { name: itemName };
  console.log(cartItem);
  console.log("removing")
  cart.remove(cartItem);
  $("#here").empty();
  $("#roomsHere").empty();

  bookings();
}

export function bookRoom(dates, roomName, roomPrice){
  let cartItem = { bookedDates:[dates[0], dates[1]], days: dates[2], name: roomName, price: roomPrice*dates[2] };
  cart.exists() ? cart.add(cartItem) : cart.setItSpaCart([cartItem])
  console.log(cartItem);
  $("#here").empty();
  $("#roomsHere").empty();

bookings()
}

