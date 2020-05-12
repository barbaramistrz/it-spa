import $ from "jquery";

export const rooms = () => {
  let roomObj = "";
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
    for (let i = 0; i < rooms.length; i++) {
      roomCards.append(
        $(
          `<div class='card' style='max-width:100%; margin:5px' id='${rooms[i]["id"]}'>
        <img class='card-img-top responsive' width = "100%" height=230 src="${rooms[i]["photo"]}" />
       <div class="card-body flex">       
        <h3 class="card-title">${rooms[i]["name"]}</h3>
        <p class='card-text'>Number of beds: <b>${rooms[i]["beds"]}</b></p>
        <p class='card-text'>Number of guests: <b>${rooms[i]["guests"]}</b></p>
        <p class='card-text'>Price: ${rooms[i]["price"]} euros</p>
        <a href="#" class="btn btn-outline-secondary" id='roomBtn${rooms[i]["id"]}'}>Book</a>
        </div></div>`
        )
      );
    }
  }

  const fragment = $(new DocumentFragment());

  const h1 = $("<h1>Rooms</h1>");
  const roomCards = $(
    '<div class="flex-container" style="display:flex; flex-wrap:wrap; justify-content:center"></div>'
  );

  fragment.append(h1).append(roomCards);

  return fragment;
};
