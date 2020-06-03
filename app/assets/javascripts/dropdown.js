// first it needs to be determined which buttons will show
//  1. zero entries, save
//  1. everything else, update, delete
// next we expose the dropdown and change ellipses color
// if update is clicked, we show save and cancel, focus, and show divider
// if cancel is clicked, we remove save and cancel and divider
// if save is clicked, we save the update
//



function dropdown(strings) {

  if (newEntry){
    let dropString = strings.newSave
  } else {
    let dropString = strings.edit
  };

  strings.ellipses.style.opacity = "80%";
  strings.dropdown.toggle();
  toggle(dropString);


}



function entryEventListeners(strings){

  document.querySelector(strings.ellipses).addEventListener('click', toggle());

  if (newEntry) {
    document.querySelector(strings.newSave).addEventListener('click', saveEntry(strings.newContent));
  } else {
    document.querySelector(strings.edit).addEventListener('click', editEntry(strings));
  };

  document.querySelector(strings.cancel).addEventListener('click', cancelEntry);
  document.querySelector(strings.save).addEventListener('click', updateEntry(strings.updateContent));
};

