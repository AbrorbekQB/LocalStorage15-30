const addItems = document.querySelector('.add-items');
const itemsList = document.querySelector('.plates');
const items = JSON.parse(localStorage.getItem("items"))||[];

function populateList(plates = [], platesList) {
  platesList.innerHTML = plates.map((plate, i) => {
    return `
    <li>
    <input type="checkbox" data-index=${i} id="item${i}" ${plate.done ? 'checked' : ''} />
    <label for="item${i}">${plate.name}</label>
    </li>
    `;
  }).join('');
}
populateList(items, itemsList);

function dontReplay(params) {
  return items.find(item => item.name === params);
};

function addItem(evt) {
  evt.preventDefault();
  const elAddInput = addItems.querySelector("input");
  if (dontReplay(elAddInput.value)) {
    alert("You can't add to list");
    return;
  };
  const item = {
    name : elAddInput.value,
    done: false
  };
  items.push(item);
  populateList(items, itemsList);
  this.reset();
  localStorage.setItem("items", JSON.stringify(items));
};

function toggleDone(evt) {
  if(!evt.target.matches("input")) return;
  console.log(evt.target); 
  const index = evt.target.dataset.index;
  items[index].done = !items[index].done;
  localStorage.setItem("items", JSON.stringify(items));
};

addItems.addEventListener("submit", addItem);
itemsList.addEventListener("click", toggleDone);