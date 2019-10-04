console.log("Client side JavaScript file is loaded");

// fetch("http://localhost:3000/weather?address=Bengaluru").then(response => {
//   response.json().then(data => {
//     if (data.error) {
//       console.log(data.error);
//     } else {
//       console.log(data.location);
//       console.log(data.forecast);
//     }
//   });
// });

const weatherForm = document.querySelector("form");
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

messageOne.textContent = "";

// messageOne.textContent = 'From JavaScript'

weatherForm.addEventListener("submit", e => {
  e.preventDefault();
  const location = search.value;
  messageOne.textContent = 'Loading...';
  messageTwo.textContent = '';
  // console.log(location);
    fetch("http://localhost:3000/weather?address="+location).then(response => {
        response.json().then(data => {
            if (data.error) {
                messageOne.textContent = data.error;
            } else {
                messageOne.textContent = data.location;
                messageTwo.textContent = data.forecast;
            }
        });
    });
});
