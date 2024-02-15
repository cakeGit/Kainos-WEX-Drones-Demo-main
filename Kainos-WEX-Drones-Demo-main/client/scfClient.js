function safeFetch(url) {
  return fetch(url)
    .then(response => {
      if (response.status === 200) {
        return response.text();
      } else {
        throw new Error('Request failed');
      }
    })
    .catch(error => {
      console.error(error);
    });
}

pageLoadPromises = {};
pages = {};
currentPage = window.location.search == "" ? "user" : window.location.search.substring(1);

contentContainer = document.getElementById("content");
directoryElement = document.getElementById("directory");

scfHistory = [currentPage];

function back() {
  console.log(scfHistory)
  if (scfHistory.length > 1) {
    console.log(scfHistory)
    scfHistory.pop();
    console.log(scfHistory)
    direct(scfHistory[scfHistory.length-1], false);
  }
}

function loadPage(page) {
  data = pages[page + ".json"];
  if (data.initialise != undefined)
    new Function(data.initialise)();

  var directoryComponents = data.directory.split(">");
  var directoryHTML = "";
  for (var directory of directoryComponents) {
    directoryHTML +=
      "<span id='directory-separator'>&#62;</span>"
      + "<span id='directory-component'>" + directory + "</span>"
  }
  directoryElement.innerHTML = directoryHTML;
  
  //TODO: Add directory view at top
  contentContainer.innerHTML = data.content;
}

//set url and change content to page
function direct(url, addHistory) {
  if (addHistory == undefined)
    addHistory = true;
  
  if (currentPage != url) {
    if (addHistory) {
      scfHistory.push(url);
      console.log(scfHistory);
    }
    window.history.replaceState({}, url,
      window.location.origin + window.location.pathname + "?" + url);
    currentPage = url;
  }
  
  console.log("Directed url to > " + url);
  
  //Check if in pages, if not check for a promise and attach
  if (pages[url + ".json"] != undefined)
    loadPage(url);
  else if (pageLoadPromises[url + ".json"] != undefined) {
    console.log("awaiting page " + url + ".json")
    pageLoadPromises[url + ".json"].then(loadPage);
  } else
    throw new Error("Page " + url + " not found");
}

//get a list of all pages to download
async function initialise() {
  pageIndex = (await safeFetch("./scf/index")).split(",");

  for (pageName of pageIndex) {
    //Immutable copy
    let fetchedPageName = pageName;
    console.log("fetching " + fetchedPageName);
    pageLoadPromises[currentPage] = safeFetch("./scf/build/?" + fetchedPageName)
      .then(data => {
        console.log("fetched " + fetchedPageName);
        pages[fetchedPageName] = JSON.parse(data);
        console.log(pages);
        if (fetchedPageName == currentPage + ".json")
          direct(currentPage);
      });
  }
}

initialise();
