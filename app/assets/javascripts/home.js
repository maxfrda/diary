
// all
// logged out (1 page)
// zero entries(1 page, logged in, zero entries)
// one entry - today( 1 page, logged in, 1 entry)
// many entries - none today(more than 1 page, at least 1 entry, none today)
// many entries( at least 2 entries )

var diaryData = (function(){

  var carousel = document.querySelector('.carousel');
  var singlePage = document.querySelector('.dropdown-child');
  var newEntry = document.querySelector('update-id');
  var entryState, domStrings, parent;

  domStrings = {
    ellipses: '.ellipses',
    dots: '.fa-ellipsis-v',
    dropdown: '.dropdown-child',
    edit: '.edit',
    save: '.save',
    cancel: '.cancel',
    destroy: '.delete',
    parent: '.toggle',
    paragraphFocus: '.entry',
    docHeight: '.entries',
    updateId: '.update-id',
    updateContent: 'toggle.tab',
    newContent: 'entry.tab',
    newSave: '#save'

  };

  //  test code below
  // domstrings should return an object that has each item as a se

  //test end
  parent = document;
  if (carousel) {
    parent = 'div.carousel__entry.active';
    entryState = 'carousel';
  } else if (singlePage) {
    entryState = 'single';
  } else {
    entryState = null;
  };

  return {

    // a query selector is added to each domString depending on the parent element
    addSelectors: function(element, strings){
      Object.keys(strings).forEach(function(key){
      strings[key] = element.querySelector(strings[key]) });
      return strings;
    },
    getDomStrings: function(){
      return domStrings;
    },
    getState: function(){
      return entryState;
    },
    getParent: function(){
      return document.querySelector(parent);
    }
  };
})();




var UIController = (function() {
  return {
    // drop down functions
    dropdownToggle: function(dots, dropdown){
      var ellipses = document.querySelector(dots);
      var opacity = ellipses.style.opacity;

      if (opacity == 0.8) {
        ellipses.style.opacity = '20%';
        $(dropdown).toggle();
      } else {
        ellipses.style.opacity = '80%';
        $(dropdown).toggle();
      }
    },

    // focus functions
    autoClick : function(paragraph) {
      // console.log(paragraph);
      paragraph.focus()
    },
    // logged out functions

    // toggle functions
    flip: function(...args){
        for (var i = 0; i < args.length; i++){
          $(args[i]).toggle();
      }
    }

  };
})();



var controller = (function(data,UIctrl) {
  var data;
  var domStrings;


  var loggedOut = function(){
    UIctrl.autoClick(domStrings.paragraphFocus);
  };

  var loggedIn = function(){
    UIctrl.autoClick(domStrings.paragraphFocus);
    dropdownListener();
  };

  var dropdownListener = function(){
      document.querySelector(domStrings.ellipses).addEventListener('click', () => {
      determineEventListeners(domStrings.updateId);
      UIctrl.dropdownToggle(domStrings.dots, domStrings.dropdown);
    })

  };

  var setEventListeners = function(...args){
    args.forEach(function(cur){
      element = document.querySelector(cur);
      switch (cur) {
        case(domStrings.edit):
          element.addEventListener('click', () => {
            items = [cur, domStrings.cancel, domStrings.save, domStrings.parent]
            UIctrl.flip(cur, domStrings.cancel, domStrings.save, domStrings.parent); //turns single item into array
            UIctrl.autoClick(domStrings.paragraphFocus);
            setEventListeners(domStrings.cancel, domStrings.save)
          });
        case(domStrings.newSave):
          element.addEventListener('click', UIctrl.saveEntry);
        case(domStrings.cancel):
          //code
          element.addEventListener('click', () => {
            items = [cur, domStrings.save];
            UIctrl.flip(cur, domStrings.save);
          });
        case(domStrings.save):
          //code
          // element.addEventListener('click', )
      }
    });
  }

  var determineEventListeners = function(entryID){
    var items;
    var currentEntry = document.querySelector(entryID);

    // checks to see if this is a new entry (only exisiting entries have this element)
    if (currentEntry) {
      items = [domStrings.edit, domStrings.destroy]
    } else {
      items = [domStrings.newSave]
    };

      items.forEach (function(cur) {
        UIctrl.flip(cur);
        setEventListeners(cur);
    });
    // document.querySelector(strings.cancel).addEventListener('click', cancelEntry);
    // document.querySelector(strings.save).addEventListener('click', updateEntry(strings.updateContent));
  }

  var carouselTasks = function() {
    loggedIn();
  }


    // initialize carousel
    // set event listeners
    // post and destroy requests

  return {

    init: function(){
      state = data.getState();

      switch (state) {
        case 'carousel':
          carousel(document);
          break;
      }
      domStrings = data.addSelectors(data.getParent(), data.getDomStrings());

      switch(state){
        case null:
          loggedOut();
          break;
        default:
          loggedIn();
          break;
      }

    }
  };

})(diaryData,UIController);

controller.init();
