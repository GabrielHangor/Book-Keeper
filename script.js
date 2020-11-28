const modal = document.querySelector("#modal");
const modalShow = document.querySelector("#show-modal");
const modalClose = document.querySelector("#close-modal");
const bookmarkForm = document.querySelector("#bookmark-form");
const websiteNameEl = document.querySelector("#website-name");
const websiteUrlEl = document.querySelector("#website-url");
const bookmarksContainer = document.querySelector("#bookmarks-container");

let bookmarks = [];

//  Show modal window
function showModal() {
  modal.classList.add("show-modal");
  websiteNameEl.focus();
}

// Form Validation
function validate(nameValue, urlValue) {
  const expression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;
  const regex = new RegExp(expression);

  if (!urlValue.match(regex)) {
    alert("Please provide a complete web adress");
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

// Populate the UI with bookmarks
function buildBookmarks() {
  bookmarks.forEach((bookmark) => {
    const { name, url } = bookmark;
    // Item
    const item = document.createElement("div");
    item.classList.add("item");
    // Close Icon
    const closeIcon = document.createElement("i");
    closeIcon.classList.add("fas", "fa-times");
    closeIcon.setAttribute("title", "Delete Bookmark");
    closeIcon.setAttribute("onclick", `deleteBookmark('${url}')`);
    // Favicon, Name/Link
    const linkInfo = document.createElement("div");
    linkInfo.classList.add("name");
    const favicon = document.createElement("img");
    favicon.setAttribute(
      "src",
      `https://s2.googleusercontent.com/s2/favicons?domain=${url}`
    );
    favicon.setAttribute("alt", "Favicon");
    // Link
    const link = document.createElement("a");
    link.setAttribute("href", `${url}`);
    link.setAttribute("target", "_blank");
    link.textContent = `${name}`;
    // Append each bookmark to bookmarks container
    linkInfo.append(favicon, link);
    item.append(closeIcon, linkInfo);
    bookmarksContainer.appendChild(item);
  });
}

// Get bookmarks from localstorage
function getBookmarks() {
  localStorage.getItem("bookmarks")
    ? bookmarks = JSON.parse(localStorage.getItem("bookmarks"))
    : localStorage.setItem("bookmarks", JSON.stringify(bookmarks));

  buildBookmarks();
}

// Handle data from Form
function storeBookmark(e) {
  const nameValue = websiteNameEl.value;
  let urlValue = websiteUrlEl.value;

  if (!validate(nameValue, urlValue)) {
    return false;
  }

  const bookmark = {
    name: nameValue,
    url: urlValue,
  };

  bookmarks.push(bookmark);
  bookmarkForm.reset();
  websiteNameEl.focus();

  // Save bookmarks in localstorage
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  getBookmarks();
  e.preventDefault();
}

// Event Listener
bookmarkForm.addEventListener("submit", storeBookmark);

// On load
getBookmarks();
