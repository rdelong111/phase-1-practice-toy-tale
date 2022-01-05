let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

const thecollection = document.getElementById('toy-collection');
fetch('http://localhost:3000/toys')
  .then((r) => r.json())
  .then((object) => {
    for (toy in object) {
      addtoys(object[toy]);
    }
  });

document.querySelector('form').addEventListener('submit', (e) => {
  e.preventDefault();

  const toydata = {
    name: document.querySelectorAll('input.input-text')[0].value,
    image: document.querySelectorAll('input.input-text')[1].value,
    likes: 0
  };

  const pushobject = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(toydata)
  };

  fetch('http://localhost:3000/toys',pushobject)
  .then((r) => r.json())
  .then(() => {
    addtoys(toydata);
  });
});

function addtoys(toy) {
  const newtoy = document.createElement('div');
  const toyname = document.createElement('h2');
  const toyimg = document.createElement('img');
  const toylikes = document.createElement('p');
  const toybtn = document.createElement('button');

  newtoy.setAttribute('class', 'card');
  toyname.textContent = toy.name;
  toyimg.setAttribute('class', 'toy-avatar');
  toyimg.setAttribute('src', toy.image);
  toylikes.textContent = toy.likes;
  toybtn.setAttribute('class', 'like-btn');
  toybtn.setAttribute('id', toy.id);
  toybtn.textContent = 'like';

  newtoy.appendChild(toyname);
  newtoy.appendChild(toyimg);
  newtoy.appendChild(toylikes);
  newtoy.appendChild(toybtn);
  thecollection.appendChild(newtoy);

  document.getElementById(`${toy.id}`).addEventListener('click', () => {
    toy.likes++;
    newtoy.querySelector('p').textContent = toy.likes;
    updatelikes(toy);
  });
}

function updatelikes(toy) {
  fetch(`http://localhost:3000/toys/${toy.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({'likes': toy.likes})
  });
}