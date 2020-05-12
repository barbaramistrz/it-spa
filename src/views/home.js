import $ from 'jquery';


export const home = () => {
    const fragment = $(new DocumentFragment());
    

    const landing= $(`<div class='home flex-fill'>
  <div class="caption text-center">
  <img src="https://image.flaticon.com/icons/svg/887/887350.svg" class="img-responsive icon">
    <h1>Welcome to the best SPA ever!</h1>
    <h3>Get your SPA on</h3>
    <a class="btn btn-outline-dark btn-lg" href="/treatments">Look at our amazing treatments</a>
  </div>
  </div>
  </div>`)
    fragment.append(landing);
    
    return fragment;
}