
// all
// logged out (1 page)
// zero entries(1 page, logged in, zero entries)
// one entry - today( 1 page, logged in, 1 entry)
// many entries - none today(more than 1 page, at least 1 entry, none today)
// many entries( at least 2 entries )

var diaryData = (function(){

  var carousel = document.querySelector('.carousel');
  var singlePage = document.querySelector('.dropdown-child');
  var entryState, DOMstrings, parent;

  DOMstrings = {
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
    updateID: '.update-id',
    updateContent: 'toggle.tab',
    updateBody: '#update_body',
    updateText: '.update-padding',
    updateFocus: '.update-entry',
    updateButton: '#update_button',
    newContent: 'p.tab',
    newSave: '#save',
    entryBody: '#entry_body',
    entryButton: '#button'

  };

  // parent determines which ELEMENT queryselector searches
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

    getDomStrings: function(){
      cloneObject = Object.assign({}, DOMstrings);
      return cloneObject;
    },
    getState: function(){
      return entryState;
    },
    getParent: function(){
      //here we set the value of parent, which determines whether we are searching
      // the document or the parent element.
        if (carousel) {
          return document.querySelector('div.carousel__entry.active');
        } else {
          return document;
        }
    },

    updateParent: function() {
      // removes event listeners by replacing parent element
      var parent = diaryData.getParent();
      var new_parent = parent.cloneNode(true);
      return parent.parentNode.replaceChild(new_parent, parent);
    }



  };
})();




var UIController = (function() {
  return {
    // drop down functions
    dropdownToggle: function(dots, dropdown){

      var opacity = dots.style.opacity;
      if (opacity == 0.8) {
        dots.style.opacity = '20%';
        UIController.flip(dropdown);
      } else {
        dots.style.opacity = '80%';
        UIController.flip(dropdown);

      }
    },
    reset: function(...args){
      args.forEach(function(cur){
        cur.style.display = 'none';
        console.log('fuchskia;dlkf')
      });
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
          if (args[i].style.display == 'block') {
              args[i].style.display = 'none';
              console.log(`${args[i].className}: ${args[i].style.display}`)
          } else {
            args[i].style.display = 'block';
              console.log(`${args[i].className}: ${args[i].style.display}`)

          }
      }
    }

  };
})();



var controller = (function(data,UIctrl) {
  var domStrings;
  var parent


  var loggedOut = function(){
    UIctrl.autoClick(domStrings.paragraphFocus);
  };

  var loggedIn = function(){
    console.log('logged in')
    UIctrl.autoClick(domStrings.paragraphFocus);
    determineEventListeners(domStrings.updateID);


  };

  var dropdownListener = function(){
      domStrings.ellipses.addEventListener('click', () => {
      UIctrl.dropdownToggle(domStrings.dots, domStrings.dropdown);
      console.log(state);
    })

  };

  var cancelFunction = function(){
    UIctrl.flip(domStrings.cancel,  domStrings.save, domStrings.parent, domStrings.edit,
    domStrings.destroy);
    UIctrl.dropdownToggle(domStrings.dots, domStrings.dropdown);

  }


  var setEventListeners = function(...args){
    args.forEach(function(cur){
      if (cur == domStrings.edit) {
          cur.addEventListener('click', () => {
            UIctrl.flip(cur, domStrings.cancel, domStrings.save,
              domStrings.destroy, domStrings.parent);
            UIctrl.autoClick(domStrings.updateFocus);

            UIctrl.dropdownToggle(domStrings.dots, domStrings.dropdown);
          });
        } else if (cur == domStrings.newSave) {
          cur.addEventListener('click', saveEntry);
        } else if (cur == domStrings.cancel){
          cur.addEventListener('click', cancelFunction);
        } else if (cur == domStrings.save) {
          //code
          cur.addEventListener('click', () =>{
          formAction();
          updateEntry();

        })

        } else if (cur == domStrings.destroy){
          console.log('destroy');
        }
      });
    };


  var determineEventListeners = function(entryID){
    var items;

    // checks to see if this is an existing entry (only exisiting entries have this element)
    if (entryID) {
      items = [domStrings.edit, domStrings.destroy, domStrings.save,
              domStrings.cancel, domStrings.parent]
              console.log('newSave not being passed')
      UIctrl.flip(domStrings.edit, domStrings.destroy)
    } else {
      console.log('new save being passed')
      items = [domStrings.newSave, domStrings.dropdown]

    };

    dropdownListener();

      items.forEach (function(cur) {
        setEventListeners(cur);
    });
  }

      var addSelectors = function(element, strings){
      Object.keys(strings).forEach(function(key){
        // console.log(`${key}: ${element}`)
      strings[key] = element.querySelector(strings[key]) });
      return strings;
      // returns a new object with the element selected in each key value
    }

    var saveEntry = function() {
      if (state == 'carousel') {
        var content = $("div.carousel__entry.active p.tab");
      } else {
        var content = $("p.tab");
      }
      var input = domStrings.entryBody;
      var finalContent = '';
      for (i = 0; i < content.length; i++) {
        var p = content[i].innerHTML;
        finalContent += `${p} <br>`;
      };
      input.value = (finalContent);
      domStrings.entryButton.click();

    }

    var formAction = function() {
      var id = domStrings.updateID.innerHTML;
      document.updateForm.action = `/entries/${id}/updates`;
    }

    var updateEntry = function() {
      if (state == 'carousel') {
        var content = $("div.carousel__entry.active p.tab");
      } else {
        var content = $("p.tab");
      }
      var finalContent = '';
      for (i = 0; i < content.length; i++) { // filters out tabs that are in other entries
        var p = content[i].innerHTML;
        finalContent += `${p} <br>`;
        console.log(finalContent);
      };
     document.getElementById("update_body").value = (finalContent);
     $('#update_button').click();
     var p = domStrings.updateID.innerHTML;
     $(`#update-${p}`).load(` #update-${p}`);
     domStrings.newContent.innerHTML = "&nbsp;";

      cancelFunction();
  };




  return {
    init: function(){
      state = data.getState();
      switch (state) {
        case 'carousel':
          carousel(document);
          break;
      }

      domStrings = addSelectors(data.getParent(), data.getDomStrings());
      console.log(data.getDomStrings());
      switch(state){
        case null:
          loggedOut();
          break;
        default:
          loggedIn();
          break;
      }

    },

    carouselTasks: function(){

      console.log('working');
      data.updateParent();
      domStrings = addSelectors(data.getParent(), data.getDomStrings());
      UIctrl.reset(domStrings.edit, domStrings.destroy);
      loggedIn();
    },


  };

})(diaryData,UIController);

controller.init();


