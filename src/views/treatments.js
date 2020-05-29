import $ from "jquery";
import { book } from "./bookings";

export const treatments = () => {
  let roomObj = "";
  roomObj = fetch("http://localhost:3000/treatments")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      main(data);
    })
    .catch(function (error) {
      console.log(error);
    });

  function main(treatments) {
    for (let i = 0; i < treatments.length; i++) {
      $("#list-tab").append(
        $(
          `<a class="list-group-item list-group-item-action" id="list-${treatments[i]["id"]}-list" data-toggle="list" role="tab" href="#list-${treatments[i]["id"]}" aria-controls="${treatments[i]["id"]}">${treatments[i]["name"]}</a>`
        )
      );
      $("#nav-tabContent").append(
        $(`<div class="tab-pane fade show rounded" id="list-${treatments[i]["id"]}" role="tabpanel" aria-labelledby="list-${treatments[i]["id"]}-list">
        <h3>${treatments[i]["name"]}</h3>
        <p>${treatments[i]["description"]}</p>
        <p>Price: ${treatments[i]["price"]} euros</p>
        <p>Time: ${treatments[i]["time"]} minutes</p>
        <br>
        <div id="bookT-${treatments[i]["id"]}" style="display:flex; flex-wrap:wrap;">
        <button class="btn btn-secondary btn-lg book-btn" id='treatmentBtn${treatments[i]["id"]}'>Book</button>
        <span class="booked added"></span>
        </div>`)
      );

      $(`#list-1-list`).addClass("active ");
      $(`#list-1`).addClass("active ");

      $(`#list-${treatments[i]["id"]}-list`).on("click", function (e) {
        e.preventDefault();
        $(this).tab("show");
      });

      $(`#treatmentBtn${treatments[i]["id"]}`).on("click", function (e) {
        e.preventDefault();
        book(treatments[i]["name"], treatments[i]["price"]);
        $(`#treatmentBtn${treatments[i]["id"]}`).prop("disabled", true);
        $(`.booked`).append(
          $(
            "<img id='booked' src='https://image.flaticon.com/icons/svg/2649/2649220.svg' alt='Item booked!' style='max-height:50px'>"
          )
        );
        $(`#cart-icon`).prop("src", "https://image.flaticon.com/icons/svg/2649/2649220.svg");

        setTimeout(function () {
          $(`.booked`).empty();
          $(`#treatmentBtn${treatments[i]["id"]}`).prop("disabled", false);
          $(`#cart-icon`).prop("src", "https://image.flaticon.com/icons/svg/2649/2649386.svg")

        }, 900);
      });
    }
  }

  const fragment = $(new DocumentFragment());
  const h1 = $("<h1>Treatments</h1>");
  const treatmentsCards = $(`<div class="row mx-auto" style="max-width:1100px">
  
    <div class="col-4">
      <div class="list-group" id="list-tab" role="tablist">
      </div>
    </div>
    <div class="col-8">
      <div class="tab-content rounded" id="nav-tabContent">
      </div>
    </div>
  </div>`);

  fragment.append(h1).append(treatmentsCards);

  return fragment;
};
