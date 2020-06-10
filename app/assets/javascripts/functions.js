
// // changes form action dynamically depending on item entry number.
// function formAction(id)
//   {
//     var id = id.html();
//     document.updateForm.action = `/entries/${id}`;
// }


// function updateEntry(text) {
//  var update_button= document.getElementById("update_button");
//  var input = document.getElementById("update_body");
//  var content = $(text); // gets all items with class name 'tab' and creates array
//  var finalContent = '';
//  for (i = 0; i < content.length; i++) { // filters out tabs that are in other entries
//    var p = $(text)[i].innerHTML;
//    finalContent += `${p} <br>`;
//  };
//  input.value = (finalContent);
// update_button.click();
// };



// function saveEntry(newContent) {
//     var input = document.getElementById("entry_body");
//     var content = $(newContent);
//     var finalContent = '';
//     for (i = 0; i < content.length; i++) {
//       var p = $(newContent)[i].innerHTML;
//       finalContent += `${p} <br>`;
//     };
//     input.value = (finalContent);
//     document.getElementById("button").click();
// }

// function autoScroller(element){

//     var selector = element
//     var textHeight = 902
//     var docHeight = document.querySelector(selector).clientHeight;
//     var difference = textHeight - docHeight;
//     // if (difference > 29) {
//     //   textHeight = docHeight + 2
//     // };

//     if (docHeight >= textHeight) {
//       window.scrollBy(0, 22);
//       textHeight = docHeight + 22;



//     // alert(numberOfLineBreaks);
//   };

//     setTimeout(autoScroller(element), 10000);
// }

  //makes it so tab key doesnt break app (disables it)
