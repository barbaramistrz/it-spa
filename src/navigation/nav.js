import $ from "jquery";
import { routes } from "../router/routes";
import { navItem } from "./nav-item";
// import { cartPreview} from '../views/treatments';

export const nav = () => {
  const fragment = $(new DocumentFragment());
  const navBar = $(`
    <nav class="navbar navbar-expand navbar-dark bg-dark">
    <span class="navbar-brand">IT SPA</span>
    <ul class="navbar-nav mr-auto"></ul>
    <input type="image" id='cart-icon' src='https://image.flaticon.com/icons/svg/2649/2649220.svg' data-toggle="popover" role="popover" data-html="true" data-placement="bottom" 
    >
</nav>
    `);

 
  const navBarItems = routes.map((route) => navItem(route));

  navBar.find("ul").append(navBarItems);

  fragment.append(navBar);

  return fragment;
};

const booking = $(`<table class="table table-sm mx-auto">

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

$(function () {
  $('[data-toggle="popover"]').popover({
    content: booking,
    html: true
  })
});

