const nameInput = document.getElementById('name');
const textInput = document.getElementById('text');
const itemsDiv = document.getElementById('items');
const preview = document.getElementById('preview');
const addItemBtn = document.getElementById('addItem');
const downloadBtn = document.getElementById('download');

let items = JSON.parse(localStorage.getItem('items')) || [];
let nameValue = localStorage.getItem('name') || '';
let textValue = localStorage.getItem('text') || '';

nameInput.value = nameValue;
textInput.value = textValue;

function renderItems() {
  itemsDiv.innerHTML = '';
  items.forEach((item, index) => {
    const div = document.createElement('div');
    div.innerHTML = `
      <label>アイテム名: <input type="text" value="${item.Name}" data-index="${index}" class="itemName"></label>
      <button class="deleteItem" data-index="${index}">削除</button>
    `;
    itemsDiv.appendChild(div);
  });
  updatePreview();
}

function updatePreview() {
  const json = {
    Name: nameInput.value,
    Text: textInput.value,
    Money: 0,
    Item: items.map(i => ({ Name: i.Name, Money: 0 }))
  };
  const str = JSON.stringify(json);
  preview.textContent = str;
  localStorage.setItem('items', JSON.stringify(items));
  localStorage.setItem('name', nameInput.value);
  localStorage.setItem('text', textInput.value);
}

addItemBtn.addEventListener('click', () => {
  items.push({ Name: '' });
  renderItems();
});

itemsDiv.addEventListener('input', e => {
  if (e.target.classList.contains('itemName')) {
    const index = e.target.dataset.index;
    items[index].Name = e.target.value;
    updatePreview();
  }
});

itemsDiv.addEventListener('click', e => {
  if (e.target.classList.contains('deleteItem')) {
    const index = e.target.dataset.index;
    items.splice(index, 1);
    renderItems();
  }
});

nameInput.addEventListener('input', updatePreview);
textInput.addEventListener('input', updatePreview);

downloadBtn.addEventListener('click', () => {
  const data = preview.textContent;
  const blob = new Blob([data], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'data.json';
  a.click();
});

renderItems();
updatePreview();
