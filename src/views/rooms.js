import $ from "jquery";
import { bookRoom } from "./bookings";

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
      $("#rooms").append(
        $(
          `<div class='card' style='max-width:100%; margin:5px' id='${rooms[i]["id"]}'>
        <img class='card-img-top responsive' width = "100%" height=230 src="${rooms[i]["photo"]}" alt="Random photo of a hotel room from Unsplash" />
       <div class="card-body flex">       
        <h3 class="card-title">${rooms[i]["name"]}</h3>
        <p class='card-text'>Number of beds: <b>${rooms[i]["beds"]}</b></p>
        <p class='card-text'>Number of guests: <b>${rooms[i]["guests"]}</b></p>
        <p class='card-text'>Price: ${rooms[i]["price"]} euros</p>
        <input class="btn btn-outline-secondary " type="submit" id='roomBtn${rooms[i]["id"]}'} value="Book"/>
        </div></div>`
        )
      );

      $(`#roomBtn${rooms[i]["id"]}`).on("click", function (e) {
        e.preventDefault();
        if($("#start-date").val() == "" || $("#end-date").val() == ""){alert("Select dates first!")}
        else{ bookRoom(dates, rooms[i]["name"], rooms[i]["price"]);}
  });
    }
    let dates = [];
    const calculateDays = (startDate, endDate) => {
      return Math.floor(
        (Date.parse(endDate) - Date.parse(startDate)) / 86400000
      );
    };

    $("#start-date").change(function () {
      dates[0] = $(this).val();
      const now = new Date($(this).val());
      const year = new Date(now.setYear(now.getFullYear() + 1));

      $("#end-date").attr("min", $(this).val());
      $("#end-date").attr("max", year.toISOString().split("T")[0]);
      $("#end-date").prop("disabled", false);
    });

    $("#end-date")
      .change(function () {
        dates[1] = $(this).val();
        dates[2] = calculateDays(dates[0], dates[1]);
        console.log($("#end-date").val())
      });

    
  
  };
  const fragment = $(new DocumentFragment());

  const h1 = $("<h1>Rooms</h1>");

  const roomCards = $(
    `<form class="flex-container form-inline" style="display:flex; flex-wrap:wrap; justify-content:center">
   <div class="form-row" style="display:flex; flex-wrap:wrap; justify-content:center" id="dates">
    <label>Arrival date:</label><input type="date" id="start-date" required class="input-date form-control" min="${new Date().toISOString().split("T")[0]}"  >
    <label>Departure date:</label><input type="date" id="end-date" required class="input-date form-control"   disabled>
    </div>
    <div class="flex-container" id="rooms" style="display:flex; flex-wrap:wrap; justify-content:center">
    </div>
    </form>`
  );

  fragment.append(h1).append(roomCards);

  return fragment;
};
