const modal = document.querySelector("#modal");
const modalShow = document.querySelector("#show-modal");
const modalClose = document.querySelector("#close-modal");
const bookmarkForm = document.querySelector("#bookmark-form");
const websiteNameEl = document.querySelector("#website-name");
const websiteUrlEl = document.querySelector("#website-url");
const bookmarksContainer = document.querySelector("#bookmarks-container");

//  Show modal
function showModal() {
  modal.classList.add("show-modal");
  websiteNameEl.focus();
}

// Form Validation
function validate(nameValue, urlValue) {
  const expression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;
  const regex = new RegExp(expression);

  if (!urlValue.match(regex)) {
    alert("Please provide a valid web adress");
    return false;
  }

  return true;
}

// Modal Event Listeners
modalShow.addEventListener("click", showModal);
modalClose.addEventListener("click", () =>
  modal.classList.remove("show-modal")
);
window.addEventListener("click", (e) =>
  e.target === modal ? modal.classList.remove("show-modal") : false
);

// Handle data from Form
function storeBookmark(e) {
  const nameValue = websiteNameEl.value;
  let urlValue = websiteUrlEl.value;
  if (!urlValue.includes("http://" && "https://")) {
    urlValue = `https://${urlValue}`;
  }

  console.log(urlValue);
  if (!validate(nameValue, urlValue)) {
    return false;
  }

  e.preventDefault();
}

// Event Listener
bookmarkForm.addEventListener("submit", storeBookmark);
