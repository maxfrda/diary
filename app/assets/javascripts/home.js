
var p = document.getElementsByClassName("entry")[0];
function clickTag(paragraph) {
  paragraph.focus(); // Click on the checkbox

}
clickTag(p);

  !(function(d){
  // Variables to target our base class,  get carousel items, count how many carousel items there are, set the slide to 0 (which is the number that tells us the frame we're on), and set motion to true which disables interactivity.
  var itemClassName = "carousel__entry";
      items = d.getElementsByClassName(itemClassName),
      totalItems = items.length,
      slide = 0,
      moving = true;
      console.log(totalItems)

  // To initialise the carousel we'll want to update the DOM with our own classes
  function setInitialClasses() {

    // Target the last, initial, and next items and give them the relevant class.
    // This assumes there are three or more items.
    // first conditional prevents prev classlist from being added if there is only 1 entry
      if (items.length > 1) {
        items[totalItems - 1].classList.add("prev");
      }
      items[0].classList.add("active");
      items[1].classList.add("next");
  }


  // Set click events to navigation buttons

  function setEventListeners() {
     window.next = d.getElementsByClassName('carousel__button--next')[0];
     window.prev = d.getElementsByClassName('carousel__button--prev')[0];


    next.addEventListener('click', moveNext);
    prev.addEventListener('click', movePrev);
  }

  // Disable interaction by setting 'moving' to true for the same duration as our transition (0.5s = 500ms)
  function disableInteraction() {
    moving = true;
    $("div.carousel__button--next").hide();
    $("div.carousel__button--prev").hide();

    setTimeout(function(){
      moving = false
      $("div.carousel__button--next").show();
      $("div.carousel__button--prev").show();
    }, 500);
  }

  function moveCarouselTo(slide) {

    // Check if carousel is moving, if not, allow interaction
    if(!moving) {

      // temporarily disable interactivity
      disableInteraction();

      // Preemptively set variables for the current next and previous slide, as well as the potential next or previous slide.
      var newPrevious = slide - 1,
          newNext = slide + 1,
          oldPrevious = slide - 2,
          oldNext = slide + 2;



      // Test if carousel has more than three items
      // if ((totalItems - 1) > 3) {

        // Checks if the new potential slide is out of bounds and sets slide numbers
        if (newPrevious <= 0) {
          oldPrevious = (totalItems - 1);
        } else if (newNext >= (totalItems - 1)){
          oldNext = 0;
        }

        // Check if current slide is at the beginning or end and sets slide numbers
        if (slide === 0) {
          newPrevious = (totalItems - 1);
          oldPrevious = (totalItems - 2);
          oldNext = (slide + 1);
        } else if (slide === (totalItems -1)) {
          newPrevious = (slide - 1);
          newNext = 0;
          oldNext = 1;
        }

        // necessary for carousel to work with exactly 3 items
         if (totalItems === 3){
          oldNext = 1;
        }
        // Now we've worked out where we are and where we're going, by adding and removing classes, we'll be triggering the carousel's transitions.

        // Based on the current slide, reset to default classes.
        items[oldPrevious].className = itemClassName;
        items[oldNext].className = itemClassName;

        // Add the new classes
        items[newPrevious].className = itemClassName + " prev";
        items[slide].className = itemClassName + " active";
        items[newNext].className = itemClassName + " next";
      }
  }

  // Next navigation handler
  function moveNext() {

    // Check if moving
    if (!moving) {

      // If it's the last slide, reset to 0, else +1
      if (slide === (totalItems - 1)) {
        slide = 0;
      } else {
        slide++;
      }

      // Move carousel to updated slide
      moveCarouselTo(slide);
    }
  }

  // Previous navigation handler
  function movePrev() {

    // Check if moving
    if (!moving) {

      // If it's the first slide, set as the last slide, else -1
      if (slide === 0) {
        slide = (totalItems - 1);
      } else {
        slide--;
      }

      // Move carousel to updated slide
      moveCarouselTo(slide);
    }
  }


  // Initialise carousel
  function initCarousel() {
    setInitialClasses();
    setEventListeners();

    // Set moving to false now that the carousel is ready
    moving = false;
  }


  // make it rain

  /*  d.addEventListener('keydown', arrowMove);

    if(!moving)

    function arrowMove(e) {
        console.log("right");
      if (e.code === "ArrowRight"){
        moveNext()
      } else if (e.code === "ArrowLeft") {
        console.log("truck");
        movePrev();
      };
    }*/
  initCarousel();

  }(document));




//makes the variables globally available and makes sure they are updated whenever dropdown is pressed

function updateVariables() {

  window.dropdown = $("div.carousel__entry.active div.dropdown-child")[0];
  window.dots = $("div.carousel__entry.active span.fa-ellipsis-v")[0];
  window.edit = $("div.carousel__entry.active div.dropdown-child a.edit")[0];
  window.save = $("div.carousel__entry.active div.dropdown-child a.save")[0];
  window.cancel = $("div.carousel__entry.active div.dropdown-child a.cancel")[0];
  window.destroy = $("div.carousel__entry.active div.dropdown-child a.delete")[0];
  window.parent =  $("div.carousel__entry.active div.toggle")[0];
  window.update = $("div.carousel__entry.active div.entry");
};



// var edit = $("button.edit");
updateVariables();
// changes form action dynamically depending on item entry number.
function formAction()
  {
    var id = $("div.carousel__entry.active div.update-id").html();
    document.updateForm.action = `/entries/${id}`;
    console.log("phone");
}



    function updateEntry() {
      var update_button= document.getElementById("update_button");
      console.log("success");
      var input = document.getElementById("update_body");
      var content = $("div.carousel__entry.active div.entry p.tab"); // gets all items with class name tag and creates array
      var finalContent = '';
      console.log(content.length);
      for (i = 0; i < content.length; i++) { // filters out tabs that are in other entries
        var p = $("div.carousel__entry.active div.toggle p.tab")[i].innerHTML;
        finalContent += `${p} <br>`;
      };
      input.value = (finalContent);
     update_button.click();
  };




//Clicked will be changed to true on edit so that cancel and save can be toggled on properly
var clicked = false;

// This will show the dropdown menu
function toggle() {

  // updates variables so that they understand which entry they are in
  updateVariables();

  // will trun on the drop down display and make dots darker
  if (dropdown.style.display !== "block") {
    dropdown.style.display = "block";
    console.log("on");
    dots.style.opacity = "80%";

    // if clicked variable isn't true, this part of the code will turn off cancel and save displays
    if (!clicked) {
      cancel.style.display = "none";
      save.style.display = "none";
    };

  } else {

    // hides drop down when drop down is already showing
    toggleOff();

  };
};


  /* when edit is clicked this will change different buttons depending on what should be shown, also calls
   form action which will update post request url of update action so that it updates current entry id */
function editEntry() {

  cancel.style.display = "block"
  save.style.display = "block"
  parent.style.display = "block"
  destroy.style.display = "none";
  edit.style.display = "none";
  prev.style.display = "none";
  next.style.display = "none";
  update.focus();
  clicked = true;


    formAction();
    toggleOff();


};

// does the opposite of the previous event
function cancelEntry(){

  cancel.style.display = "none"
  save.style.display = "none"
  parent.style.display = "none"
  destroy.style.display = "block";
  edit.style.display = "block";
  prev.style.display = "block";
  next.style.display = "block";

    toggleOff();


};

//will toggleOff the dropdown menu
function toggleOff(){


   dropdown.style.display = "none";
   dots.style.opacity = "20%";

};



  // toggles edit off



  //makes it so tab key doesnt break app (disables it)
document.addEventListener('keydown', logKey);

 function logKey(e) {
   if (e.code === "Tab"){
     e.preventDefault();

   };
 };


  document.getElementById("save").onclick = myFunction;
  function myFunction() {
    var input = document.getElementById("entry_body");
    var content = $("div.carousel__entry.active p.tab");
    var finalContent = '';
    for (i = 0; i < content.length; i++) {
      var p = $("div.carousel__entry.active p.tab")[i].innerHTML;
      finalContent += `${p} <br>`;
    };
    input.value = (finalContent);
    document.getElementById("button").click();
}

var textHeight = 902

function yourFunction(){

    var docHeight = document.getElementsByClassName("entries")[0].clientHeight;
    var difference = textHeight - docHeight;
    // if (difference > 29) {
    //   textHeight = docHeight + 2
    // };

    if (docHeight >= textHeight) {
    window.scrollBy(0, 22);
    textHeight = docHeight + 22;



    // alert(numberOfLineBreaks);
  };

    setTimeout(yourFunction, 100);
}

yourFunction()
