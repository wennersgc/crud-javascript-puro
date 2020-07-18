window.addEventListener('load', start);

var globaNames =['um', 'dois', 'tres', 'quatro'];
var inputName = null;
var isEditing = false;
var currentIndex = null;

function start() {
    preventFormSubmit();
    inputName = document.querySelector('#inputName')
    activateInput();
    render()
}

function preventFormSubmit() {
    function handleFormSubmit(event) {
        event.preventDefault();
    }

    var form = document.querySelector('form');
    form.addEventListener('submit', handleFormSubmit);
}

function  activateInput() {

    function insertName(newName) {
        globaNames.push(newName);
    }
    
    function updateName(newName) {
        globaNames[currentIndex] = newName;
    }

    function handleTyping(event) {

        var hasText = !!event.target.value && event.target.value.trim() !== '';

        if (!hasText) {
            clearInput();
            return;
        }

        if (event.key =='Enter') {
            if (isEditing) {
                updateName(event.target.value);
            } else {
                insertName(event.target.value);
            }

            render();
            isEditing = false;
            clearInput();
        }

    }

    inputName.addEventListener('keyup', handleTyping);
    inputName.focus();
}

function render() {
    
    function createDeleteButton(index) {

        function deleteName() {
            globaNames.splice(index, 1);
            render();
        }

        var button = document.createElement('button');
        button.classList.add('deleteButton');
        button.textContent ='X';

        button.addEventListener('click', deleteName);

        return button;
    }
    
    function createSpan(name, index) {

        function editItem() {
           inputName.value = name;
           inputName.focus();
           isEditing = true;
           currentIndex = index;
        }

        var span = document.createElement('span');
        span.classList.add('clickable');
        span.textContent = name;

        span.addEventListener('click', editItem);

        return span;
    }
    
    var divNames = document.querySelector('#names');

    divNames.innerHTML = '';

    var ul = document.createElement('ul');

    for (var i = 0; i < globaNames.length; i++) {
        var currentName = globaNames[i];

        var li = document.createElement('li');
        var button = createDeleteButton(i);
        var span = createSpan(currentName, i);

        li.appendChild(button);
        li.appendChild(span);
        ul.appendChild(li);
    }

    divNames.appendChild(ul);
    clearInput();
}

function clearInput() {
    inputName.value = '';
    inputName.focus();
}