import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.css';
import './it-spa.scss';

import { Router, routes } from './router';
import { nav } from './navigation/nav';
import { Cart } from './cart/cart';

require('bootstrap');

const main = $('main');
const router= new Router(routes);

main.before(nav);

router.mount(main);
router.init();

const cart = new Cart();
