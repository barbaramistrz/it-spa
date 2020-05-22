import $ from 'jquery';
import {routes } from '../router/routes'
import { navItem } from './nav-item';
// import { cartPreview} from '../views/treatments';
 
export const nav = () => {
    
    const fragment = $(new DocumentFragment())
    const navBar = $(`
    <nav class="navbar navbar-expand navbar-dark bg-dark">
    <span class="navbar-brand">IT SPA</span>
    <ul class="navbar-nav mr-auto"></ul>
    <input type="image" id='cart-icon' src='https://image.flaticon.com/icons/svg/2649/2649220.svg' fill="white" data-toggle="popover" role="popover" data-placement="bottom" data-title="Cart" data-content="miaus"/>
</nav>
    `)
const navBarItems = routes.map( route => 
     navItem(route));

navBar.find("ul").append(navBarItems);

fragment.append(navBar)

return fragment;
}

$(function () {
    $('[data-toggle="popover"]').popover()
  })
 