var body = document.getElementsByTagName('body')[0];
// main container where all books info will be displayed
var boxes = document.querySelector('.boxes');

// object constuctor for books
function book(title, author, pages, read) {
    this.title = title; // book title
    this.author = author; // author of the book
    this.pages = pages; // no of pages in book
    this.read = read; // whether book has already read or not
}
// adding two books for demo
var suheldev = new book('The legend of Suheldev', 'Amish Tripathi', 300, true);
var Dharma = new book('Dharma', 'Amish Tripathi', 250, false);

// main array where all book objects will be kept
var books = [suheldev, Dharma];

// function to show book info in cards
var cards = function (bookelement) {
    var link = document.createElement("div");
    link.setAttribute('class', 'box');
    content(link, bookelement);
    boxes.appendChild(link);
    
}

// content that will be in card
var content = function (link, bookelement) {
    var title = document.createElement("div");
    title.setAttribute('class', 'title');
    title.innerHTML = `<h2> ${bookelement.title}`;
    link.appendChild(title);
    var author = document.createElement('h3');
    author.innerHTML = `By ${bookelement.author}`;
    link.appendChild(author);
    var pages = document.createElement('h4');
    pages.innerHTML = `Number of pages are ${bookelement.pages}`;
    link.appendChild(pages);

    var status = document.createElement('h5');
    if (bookelement.read) {
        status.innerHTML = "You have already read this book !!";
    }
    else {
        status.innerHTML = "You have not read this book";
    }
    link.appendChild(status);
    var removebook = document.createElement('button');
    removebook.setAttribute('id', `card-${boxes.childElementCount}`);
    removebook.setAttribute('class', 'rmbtn');
    removebook.innerHTML = "Remove";
    removebook.value = `card-${boxes.childElementCount}`;
    removebook.onclick = function () {
        console.log('removed')
        boxes.removeChild(link);
    }
    link.appendChild(removebook);
}


// adding two demo cards to main webpage
for (var i = 0; i < books.length; i++) {
    cards(books[i]);
}

// button which will bring form to add new book
const showform = document.getElementById('show-form');
// form object
const form = document.getElementById('form');


// enabling form
showform.onclick = function () {
    form.style.display = 'block';
}



const formsubmit = document.getElementById('form-submit');
const formcancel = document.getElementById('form-cancel');

// events that will take place when we submit form
formsubmit.onclick = function () {
    var info = new Array();
    // get all the form data in array
    for (var i = 0; i < form.length; i++){
        info.push(form.elements[i].value);
    }
    // get the read status
    var readstatus = document.querySelector('#read-status').checked;
    // create new book object
    var newbook = new book(info[0], info[1], info[2], readstatus);
    // add new book to final array
    books.push(newbook);
    // show success message on webpage
    var success = document.createElement('h1');
    success.setAttribute('id', 'success');
    success.innerHTML = "Book added Successfully !!";
    var showbutton = document.getElementById('show-btn');
    // hide form
    form.style.display = 'none';
    showbutton.appendChild(success);
    // remove succes message after 5sec
    setTimeout( function () {
        showbutton.removeChild(success);
    }, 5000);
    // create card of new book and show it on webpage
    cards(newbook);
    // reset the form
    form.reset();
}

// if cancel is clicked, hide the form
formcancel.onclick = function () {
    form.style.display = 'none';
}

