
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
  var entryState, singlePageStrings, carouselStrings, domStrings;

  singlePageStrings = {
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

  carouselStrings = {
    ellipses: 'div.carousel__entry.active.ellipses',
    dots: 'div.carousel__entry.active.fa-ellipsis-v',
    dropdown: 'div.carousel__entry.active.dropdown-child',
    edit: 'div.carousel__entry.active.edit',
    save: 'div.carousel__entry.active.save',
    cancel: 'div.carousel__entry.active.cancel',
    destroy: 'div.carousel__entry.active.delete',
    parent: 'div.carousel__entry.active.toggle',
    paragraphFocus: 'div.carousel__entry.active.entry',
    docHeight : 'div.carousel__entry.active.entries',
    updateId: 'div.carousel__entry.active.update-id',
    updateContent: 'div.carousel__entry.active.toggle.tab',
    newContent: 'div.carousel__entry.active.entry.tab',
    newSave: '#save'
  };

  domStrings = singlePageStrings;

  if (carousel) {
    domStrings = carouselStrings;
    entryState = 'carousel'
  } else if (singlePage) {
    entryState = 'single';
  } else {
    entryState = null;
  };

  return {
    getDomStrings: function(){
      return domStrings;
    },
    getState: function(){
      return entryState;
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
    autoClick : function(element) {
      console.log(element);
      document.querySelector(element).focus()
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
    carousel(document);
    loggedIn();
  }


    // initialize carousel
    // set event listeners
    // post and destroy requests

  return {

    init: function(){
      state = data.getState();
      domStrings = data.getDomStrings();
      console.log(state);
      switch (state) {

        case ('carousel'):
          carouselTasks();
        case ('single') :
          loggedIn();
        case (null):
          loggedOut();
      }
    }
  };

})(diaryData,UIController);

controller.init();
