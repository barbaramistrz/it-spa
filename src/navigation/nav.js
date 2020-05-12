import $ from 'jquery';
import {routes } from '../router/routes'
import { navItem } from './nav-item';
 
export const nav = () => {
    
    const fragment = $(new DocumentFragment())
    const navBar = $(`
    <nav class="navbar navbar-expand navbar-dark bg-dark">
    <span class="navbar-brand">IT SPA</span>
    <ul class="navbar-nav mr-auto"></ul>
    <input type="image" id='cart-icon' src='https://www.iconsdb.com/icons/preview/white/cart-38-xxl.png' data-toggle="popover" role="popover" data-placement="bottom" data-title="Cart" data-content="Zawartość koszyka"/>
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
 