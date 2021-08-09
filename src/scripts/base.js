let url = document.location.href;
let page = url.split('/');
let pageName = page[page.length - 1];

// select the navbar button for the current page
let currentPageButton = document.querySelector(`.navbar__button[href="${pageName}"]`);
currentPageButton.classList.add('navbar__button--active');