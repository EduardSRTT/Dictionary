let index = 0;

function changeNameColor() {
    let myName = document.getElementById("name");
    if (index === 0) {
        myName.style.color = "orange";
        index = 1;
    } else {
        myName.style.color = "red";
        index = 0;
    }
}

setInterval(changeNameColor, 500);

function selectItem(id) {
    if (document.getElementById(id).style.border === "2px solid blue") {
        document.getElementById(id).style.border = "solid whitesmoke";
    } else {
        document.getElementById(id).style.border = "2px solid blue";
    }
}

let allWords = document.getElementsByTagName("li");

function deleteWords() {
    Array.from(allWords).forEach(word => {
        if (word.style.border === "2px solid blue") {
            word.remove();
        }
    });
}

function openPopout() {
    document.getElementById("overlay").style.display = "block";
    document.getElementById("popupDialog").style.display = "block";
}

function closePopout() {
    document.getElementById("overlay").style.display = "none";
    document.getElementById("popupDialog").style.display = "none";
    document.getElementById("nameInput").value = "";
}

function saveMyWord() {
    let savedWord = document.getElementById("nameInput").value;
    if (savedWord != "") {
        let newWord = document.createElement("li");
        let newNode = document.createTextNode("📖 " + savedWord);
        newWord.appendChild(newNode);
        document.getElementById("wholeList").appendChild(newWord);
        let newShowButton = document.createElement("span");
        let node2 = document.createTextNode("show");
        newShowButton.appendChild(node2);
        newWord.appendChild(newShowButton);
        newShowButton.style.fontSize = "small";
        newShowButton.style.textDecoration = "underline";
        newShowButton.style.float = "right";
        newShowButton.style.paddingRight = "8px";
        newShowButton.onmouseenter = function() {
            this.style.cursor = "pointer";
        };
        newWord.style.border = "solid whitesmoke";
        newWord.style.textAlign = "left";
        newWord.style.padding = "8px";
        newWord.style.cursor = "context-menu";
        newWord.style.listStyleType = "none";
        newWord.style.paddingLeft = "16.4px";
        newWord.onclick = function() {
            if (this.style.border === "2px solid blue") {
                this.style.border = "solid whitesmoke";
            } else {
                this.style.border = "2px solid blue";
            }
        };
        closePopout();
    }
}

function restoreWords() {
    for (let i = 0; i < allWords.length; ++i) {
        allWords[i].style.display = "block";
        document.getElementById("wholeList").style.marginBottom = "3px";
    }
}

let haveSearchBar = 0;
$(document).ready(function() {
    $("#button2").click(function() {
        if (haveSearchBar === 0) {
            $("#searchBar").toggle(500);
            $("#button2").text("✖️");
            haveSearchBar = 1;
        } else {
            $("#searchBar").toggle(500);
            $("#button2").text("Search");
            document.getElementById("searchBar").value = "";
            restoreWords();
            haveSearchBar = 0;
        }
    });
});

function showMatchWords() {
    let textTyped = document.getElementById("searchBar").value;
    for (let i = 0; i < allWords.length; ++i) {
        let currentWord = allWords[i].childNodes[0].textContent;
        if (currentWord.search(new RegExp(textTyped, "i")) === -1 && textTyped != "") {
            allWords[i].style.display = "none";
       } else {
            allWords[i].style.display = "block";
            document.getElementById("wholeList").style.marginBottom = "150px";
       }
    }
}