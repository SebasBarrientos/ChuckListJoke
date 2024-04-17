const btnJoke = document.getElementById("btnJoke");
const divJokes = document.getElementById("jokes");
const url = "https://api.chucknorris.io/jokes/random";
const jokesArr = [];

let jokes = JSON.parse(localStorage.getItem("jokes")) || [];

const apiAccess = () => {
  axios
    .get(url)
    .then((response) => {
      let joke = response.data.value;
      jokes.push(joke);
      localStorage.setItem("jokes", JSON.stringify(jokes));
      //   console.log(jokes);
      printJoke();
    })
    .catch((error) => console.error(error));
};

const deleteJoke = (button) => {
  jokes = jokes.filter((joker) => joker != button);
  console.log(jokes);
  localStorage.setItem("jokes", JSON.stringify(jokes));
  printJoke();
  //de jokes hay que eliminar el contenido de button
};

const printJoke = () => {
  divJokes.innerHTML = "";
  let numbBtn = 0;
  //   console.log(jokes);
  jokes.forEach((joke) => {
    const button = document.createElement("button");
    const text = document.createElement("p");
    text.innerText = joke;
    button.innerText = "Delete";
    button.classList.add("btn", "btn-danger", "m-1");
    button.id = joke;
    divJokes.appendChild(text);
    //divJokes.innerHTML += `<p>${joke}</p>`;
    divJokes.appendChild(button);
    // document.getElementById(`Btn${numbBtn}`).appendChild(button);
    button.addEventListener("click", () => {
      deleteJoke(button.id);
      numbBtn++;
    });
  });
};

printJoke();
apiAccess();

btnJoke.addEventListener("click", apiAccess);
