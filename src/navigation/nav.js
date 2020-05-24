import $ from "jquery";
import { routes } from "../router/routes";
import { navItem } from "./nav-item";
import { bookings } from "../views";
// import { cartPreview} from '../views/treatments';

export const nav = () => {

    
  

  const fragment = $(new DocumentFragment());
  const navBar = $(`
    <nav class="navbar navbar-expand navbar-dark bg-dark">
    <span class="navbar-brand">IT SPA</span>
    <ul class="navbar-nav mr-auto"></ul>
    <input type="image" id='cart-icon' src='https://image.flaticon.com/icons/svg/2649/2649220.svg' data-toggle="popover" role="popover" data-html="true" data-placement="left"
    >
</nav>
    `);

 
  const navBarItems = routes.map((route) => navItem(route));




  navBar.find("ul").append(navBarItems);

  fragment.append(navBar);

  return fragment;
};

const booking = () =>{
    bookings();

    return $(`<table class="table table-sm table-hover table-responsive">

  <thead>
    <tr>
      <th scope="col">Treatment</th>
      <th scope="col">Price</th>
      <th scope="col" style="min-width:40px">#</th>
    </tr>
  </thead>
  <tbody class="navhere" id="navhere">
  <thead>
  <tr>
    <th scope="col">Booked Room</th>
    <th scope="col"></th>
    <th scope="col"></th>
  </tr>
</thead>
<tbody class="navroomsHere" id="navroomsHere">
<tfoot id="total">
</tfoot>
</tr>
  </tbody>
</table>`);}


$(function () {
    $('[data-toggle="popover"]').popover({
      content: booking, 
      html: true,
      container: 'body',
      boundary: 'viewport'
  });

  });

