const toTopButton = document.getElementById("to-top-btn");
window.addEventListener("scroll", scrollFunction);

function scrollFunction(){
    if (window.scrollY > 730) { 
        toTopButton.classList.add("show"); // show button
    }
    else {
        toTopButton.classList.remove("show"); // hide button
    }
}

toTopButton.addEventListener("click", function(){
    window.scrollTo(0,0); // scroll back to the top
})


/*---------------------Our Statistics------------------ */
const stats = document.querySelectorAll(".statistics");
const countBtn = document.getElementById("count-btn");

window.addEventListener("scroll",btnClick)

function btnClick(){
    if (window.scrollY > 680) {
    countBtn.click();
    countBtn.disabled = true}
}


function startCount(){
stats.forEach(function(statistics){
    
    statistics.innerText = "0";

    function updateCounter(){
        var target = parseInt(statistics.getAttribute("data-stop-count"));
        var counter = parseInt(statistics.innerText);
        var increment = target / 1000;


        if (counter < target) {
            statistics.innerText = Math.ceil(counter + increment);
            setTimeout(updateCounter,1);
        } else {
            statistics.innerText = target;
        }
    };
    updateCounter();
  
})};

/* ------------------------ Quote of the day ------------------ */
const quotes =
[
    '"The most honest form of filmmaking is to make a film for yourself."', 
    '"When I’m working on a problem, I never think about beauty. But when I’ve finished, if the solution is not beautiful I know it’s wrong."',
    '"To create, one must first question everything."',
    '"I don’t dream at night, I dream at day, I dream all day I’m dreaming for living."',
    '"Do what you do so well that they will want to see it again and bring their friends too"',
    '"There are 360 degrees, so why stick to one"',
    '"I don’t believe that the public knows what it wants; this is the conclusion that I have drawn from my career."',
    '"Whatever good things we build end up building us."',
    '"If it’s a good movie, the sound could go off and the audience would still have a perfectly clear idea of what was going on."'];


const authors = 
[
    '- Peter Jackson', 
    '- Buckminster Fuller', 
    '- Eileen Gray', 
    '- Steven Spielberg', 
    '- Walt Disney', 
    '- Zaha Hadid', 
    '- Charlie Chaplin', 
    '- Jim Rohn', 
    '- Alfred Hitchcock' ];


const quoteBtn = document.getElementById("generate-btn");
const quote = document.querySelector(".quote");
const author = document.querySelector(".author");
const tweetBtn = document.querySelector(".tweet-quote");

var index = 1;

function shuffleQuotes(){
    index = Math.floor(Math.random()*quotes.length);                  //generates a random index
    quote.innerHTML = quotes[index];
    author.innerHTML = authors[index];
    quote.style.webkitFilter = "blur(2px)";
    author.style.webkitFilter = "blur(2px)";
}

var currentDate = new Date();                                       //gets current date
var strCurrentDate = String(currentDate.getDate());                  //gets the day from current date and converts it to a string

if (strCurrentDate == localStorage.getItem("yourQuoteDate") && localStorage.getItem("yourQuote") != null && localStorage.getItem("yourAuthor") != null) {     // checks: if current date == the date you picked a quote (so you can't pick more than once a day), if a quote and an author exist
    var definedQuote = localStorage.getItem("yourQuote");             // gets "yourQuote" value from localStorage 
    var definedAuthor = localStorage.getItem("yourAuthor");            
    quote.innerHTML = definedQuote;          // sets the gotten value 
    author.innerHTML = definedAuthor;
    quote.style.webkitFilter = "blur(0px)";
    author.style.webkitFilter = "blur(0px)";
    quoteBtn.style.display = "none";
    tweetBtn.style.display = "block";
}
else {         // if not => pick a quote
var shuffle = setInterval(shuffleQuotes,100);
}

quoteBtn.addEventListener("click", pickQuote);

function pickQuote(){                   // picks a quote by stopping the shuffle
    clearInterval(shuffle);
    quote.style.webkitFilter = "blur(0px)";
    author.style.webkitFilter = "blur(0px)";
    quoteBtn.style.display = "none";
    tweetBtn.style.display = "block";

    if (typeof(Storage) !== "undefined") {      
        localStorage.setItem("yourQuote", quotes[index]);    // saves the picked quote to localStorage
        localStorage.setItem("yourAuthor", authors[index]);
        localStorage.setItem("yourQuoteDate", strCurrentDate);
      } ;
}

/* -------------- toTop button counter ----------- */
var count = 0;
$("#to-top-btn").on('click', function() {
    count++;
  if (typeof(Storage) !== "undefined") {
      sessionStorage.toTopCount = count;
  }});

/*-------------------Drag and Drop section-------------------------*/
$(document).ready(function () {  // toggles the game
    $(".game-content").hide();
    var playCount = 0;
    $("#play-btn").click(function () {
        playCount++;
        if (playCount % 2 != 0) {
            $("#play-btn").html("Collapse");
            $(".home-game h2").html("Find the word");
        }
        else {
            $("#play-btn").html("Let's play a game");
            $(".home-game h2").html("Did you get tired scrolling?");
        }
        $(".game-content").slideToggle(1000);
    })
})

const boxElements = document.querySelectorAll(".box");

// add event listeners
boxElements.forEach(elem => {
    elem.addEventListener("dragstart", dragStart);
    elem.addEventListener("dragend", dragEnd);
    elem.addEventListener("dragenter", dragEnter);
    elem.addEventListener("dragover", dragOver);
    elem.addEventListener("dragleave", dragLeave);
    elem.addEventListener("drop", drop);

    // Drag and Drop Functions

    function dragStart(event) {
        event.target.classList.add("drag-start");
        event.dataTransfer.setData("text", event.target.id);
    }

    function dragEnd(event) {
        event.target.classList.remove("drag-start");
    }

    function dragEnter(event) {
        if (!event.target.classList.contains("drag-start")) {
            event.target.classList.add("drag-enter");
        }
    }

    function dragOver(event) {
        event.preventDefault();
    }

    function dragLeave(event) {
        event.target.classList.remove("drag-enter");
    }

    var word = "";

    function drop(event) {
        event.preventDefault();
        event.target.classList.remove("drag-enter");
        const draggableElementId = event.dataTransfer.getData("text");
        const droppableElementId = event.target.id;
        if (draggableElementId !== droppableElementId) {
            const draggableElement = document.getElementById(draggableElementId);
            const droppableElementBgColor = event.target.style.backgroundColor;
            const droppableElementTextContent = event.target.querySelector("span").textContent;

            event.target.style.backgroundColor = draggableElement.style.backgroundColor;
            event.target.querySelector("span").textContent = draggableElement.querySelector("span").textContent;
            event.target.id = draggableElementId;
            draggableElement.style.backgroundColor = droppableElementBgColor;
            draggableElement.querySelector("span").textContent = droppableElementTextContent;
            draggableElement.id = droppableElementId;

            // get the word created by the user
            $(".box > .letter").each(function () {
                word += $(this).text();
            })
            console.log(word);

            // check if the word is correct
            if (word === "STREAMING") {
                $(".box").addClass("correct");
                word = "";
            }
            else {
                $(".box").removeClass("correct");
                word = "";
            }
        }
    }
});

/* ------------------- Responsive Menu ----------------*/ 

const navSlide = () => {
    const menu = document.querySelector(".menu");
    const nav = document.querySelector("nav");
    const navLinks = document.querySelectorAll(".nav_links li");
    
    //toggle now
    menu.addEventListener("click", () => {
        nav.classList.toggle("nav-active");

        //animate links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {link.style.animation = `navLinkFade 0.5s ease forwards ${index / 6 + 0.5}s`
        }
        });
        // menu animation
        menu.classList.toggle("line-toggle");
    });

}

navSlide();