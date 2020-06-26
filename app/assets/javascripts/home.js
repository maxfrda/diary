
// all
// logged out (1 page)
// zero entries(1 page, logged in, zero entries)
// one entry - today( 1 page, logged in, 1 entry)
// many entries - none today(more than 1 page, at least 1 entry, none today)
// many entries( at least 2 entries )

var diaryData = (function(){
  var loggedOut = document.querySelector('.about-entry');
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
    newContent: '.update-entry',
    newSave: '#save',
    entryBody: '#entry_body',
    entryButton: '#button'

  };

  // parent determines which ELEMENT queryselector searches
  parent = document;
  if (loggedOut) {
    parent = 'div.carousel__entry.active';
    entryState = null;
  } else if (carousel) {
    parent = 'div.carousel__entry.active';
    entryState = 'carousel';
  } else {
    entryState = 'single'
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
          } else {
            args[i].style.display = 'block';

          }
      }
    }

  };
})();



var controller = (function(data,UIctrl) {
  var domStrings;
  var parent


  var loggedOut = function(){
    determineEventListeners(domStrings.updateID);
    UIctrl.autoClick(domStrings.paragraphFocus);
    stepOne();
    demoListeners();

  };


  var loggedIn = function(){
    UIctrl.autoClick(domStrings.paragraphFocus);
    determineEventListeners(domStrings.updateID);


  };

  const demoListeners = function(){
    const save = document.getElementById('demo-save');
    save.addEventListener('click', demoEntry);
  }

  const demoEntry = function(){
    const content = $("div.carousel__entry.active div.entry");
    const postEntry = document.getElementById('demo-entry');
      var finalContent = '';
      for (i = 0; i < content.length; i++) {
        var p = content[i].innerHTML;
        finalContent += `${p} <br>`;
      };

      postEntry.innerHTML = `<div class="entry" style="font-size: 16px">
                            ${finalContent}</div>`
      stepTwo();
  }


  const stepOne = function(){
    let check = document.querySelector('.tab').innerText;

    if(check.length > 2){
      const box = document.querySelector('.box1');
      const box1 = document.querySelector('.box2');
      box.style.display = 'none';
      box1.style.display = 'block';

    };

      setTimeout(stepOne, 100);

  };

  const stepTwo = function(){
    let box = document.querySelector('.box2');
    UIctrl.flip(domStrings.dropdown, box)

  }

  var dropdownListener = function(){
      domStrings.ellipses.addEventListener('click', function() {
      UIctrl.dropdownToggle(domStrings.dots, domStrings.dropdown);
    })

  };

  var cancelFunction = function(){
    UIctrl.flip(domStrings.cancel,  domStrings.save, domStrings.parent, domStrings.edit,
    domStrings.destroy);
    UIctrl.dropdownToggle(domStrings.dots, domStrings.dropdown);
    if (state == 'carousel'){
      $("div.carousel__entry.active div.carousel__button--next").show();
      $("div.carousel__entry.active div.carousel__button--prev").show();
    }
  }



  var setEventListeners = function(...args){
    args.forEach(function(cur){
      if (cur == domStrings.edit) {
          cur.addEventListener('click', function(){
            UIctrl.flip(cur, domStrings.cancel, domStrings.save,
              domStrings.destroy, domStrings.parent);
            UIctrl.autoClick(domStrings.updateFocus);

            UIctrl.dropdownToggle(domStrings.dots, domStrings.dropdown);
            if (state == 'carousel'){
              $("div.carousel__entry.active div.carousel__button--next").hide();
              $("div.carousel__entry.active div.carousel__button--prev").hide();
            }
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
          console.log('');
        }
      });
    };


  var determineEventListeners = function(entryID){
    var items;

    // checks to see if this is an existing entry (only exisiting entries have this element)
    if (entryID) {
      items = [domStrings.edit, domStrings.destroy, domStrings.save,
              domStrings.cancel, domStrings.parent]
      UIctrl.flip(domStrings.edit, domStrings.destroy)
    } else if (domStrings.newSave) {
      items = [domStrings.newSave, domStrings.dropdown]
    } else {
      items = [domStrings.dropdown];
    }
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
        var content = $("div.carousel__entry.active div.entry");
      } else {
        var content = $("div.entry");
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
        var content = $("div.carousel__entry.active div.update-entry");
      } else {
        var content = $("div.update-entry");
      }
      var finalContent = '';
      for (i = 0; i < content.length; i++) { // filters out tabs that are in other entries
        var p = content[i].innerHTML;
        finalContent += `${p} <br>`;
      };
     document.getElementById("update_body").value = (finalContent);
     $('#update_button').click();
     var p = domStrings.updateID.innerHTML;
     $(`#update-${p}`).load(` #update-${p}`);
      cancelFunction();
     domStrings.newContent.innerHTML = "&nbsp;";

  };

  var preventTab = function(){

   document.addEventListener('keydown', logKey);
   function logKey(e) {
     if (e.code === "Tab"){
       e.preventDefault();

     };
   };
  }


  return {
    init: function(){
      preventTab();
      state = data.getState();
      switch (state) {
        case 'single':
        $('.button-wrapper').hide();
          break;
        default:
        carousel(document);
      }
      domStrings = addSelectors(data.getParent(), data.getDomStrings());

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

        data.updateParent();
        domStrings = addSelectors(data.getParent(), data.getDomStrings());
        if (domStrings.edit){
          UIctrl.reset(domStrings.edit, domStrings.destroy);
      }
        loggedIn();

    }


  };

})(diaryData,UIController);


if (document.querySelector('.date')){
  controller.init();
}


// text box is generated with text and next button in upper left corner
// move text box to text entry, generate default text
