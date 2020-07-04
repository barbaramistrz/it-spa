import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.css';
import './it-spa.scss';
import * as firebase from "firebase/app";
import "firebase/database/"


import { Router, routes } from './router';
import { nav } from './navigation/nav';
import { Cart } from './cart/cart';

require('bootstrap');
require('firebase/database');

const firebaseConfig = {
    apiKey: "AIzaSyCIuLlyPT1eJZw81WI5x46EI4Q_B6x3G6k",
    authDomain: "it-spa.firebaseapp.com",
    databaseURL: "https://it-spa.firebaseio.com",
    projectId: "it-spa",
    storageBucket: "it-spa.appspot.com",
    messagingSenderId: "504232598544",
    appId: "1:504232598544:web:88d670847baadf08c6fe95"
  };
firebase.initializeApp(firebaseConfig);
export const database = firebase.database();
console.log(firebase.database().ref('treatments'))
  const treatmentsData = []
firebase.database().ref('treatments').once('value').then((snapshot) => { 
  treatmentsData.push(snapshot.val())
console.log(treatmentsData)
});
  console.log(treatmentsData)

document.addEventListener('DOMContentLoaded', function() {


  try {
    let app = firebase.app();
    let features = ['auth', 'database', 'messaging', 'storage'].filter(feature => typeof app[feature] === 'function');
  } catch (e) {
    console.error(e);
  }
});


const main = $('main');
const router= new Router(routes);

main.before(nav);

router.mount(main);
router.init();

const cart = new Cart();
