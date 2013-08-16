lists = new Meteor.Collection("Lists");


if (Meteor.isClient) {

  Template.categories.lists = function() {
    return lists.find({}, {sort: {Category:1 }});

  Session.set('adding_category', false);
  };

  Template.categories.events(
  {

    //Checking if the user wants to add a new category and shows text input.
    'click #btnNewCat': function (e , t) 
    {
      Session.set('adding_category', true);

      Meteor.flush();
      focusText(t.find("#add-category"));
    },

    //Checking if clicks are being received.
    'click':function(e,t)
    {
      console.log("banana");
    },

    //Adding new Category on pressing enter in the text box. 
    'keyup #add-category': function(e,t)
    {
      console.log("Typing in new Category....");
      if(e.which == 13)
      {
        console.log("Typing in new Category....");
        var catVal = String(e.target.value || "");
        if (catVal)
        {
          lists.insert({Category:catVal});
          Session.set('adding_category', false);
        }
      }
    },

    'focusout #add-category': function(e,t)
    {
      Session.set('adding_category', false);
    }
  });

  Template.categories.new_cat = function()
  {
    return Session.equals('adding_category', true);
  };




  //////Generic Helper Functions//////

  //This function puts our cursor at a specific DOM id value
  function focusText(i){
    i.focus();
    i.select();
  }


} //------ Closing bracket for if(Meteor.isClient){}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
