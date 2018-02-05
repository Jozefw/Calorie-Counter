// ************* Local Storage Controller ***********


// *************** Item  Controller ******************
const itemCtrl = (function(){
  // item constructor
  const Item = function(id,name,calories){
    this.id = id;
    this.name = name;
    this.calories = calories;
  }
// Data structure or state
const data = {
  items:[
    {id:0,name:'Apple Pie',calories:1000},
    {id:1,name:'Chocolate Cream Pie',calories:2000},
    {id:2,name:'Tofu Pie',calories:10}

  ],
  currentItem:null,
  totalCalories:0
}
 // public methods
return {
  getItems:function(){
    return data.items
  },
  logData:function(){
    return data;
  }
}
})();

// ******************** UI  Controller ********************

const UICtrl = (function(){
UISelectors = {
  itemList: '#item-list',
}
  // public methods
  return {
    populateItems:function(items){
      let html = '';
      items.forEach(function(item){
        html += `<li class="collection-item" id="item-${item.id}">
        <strong>${item.name}: </strong> <em>${item.calories} : Calories</em>
        <a href="#" class="secondary-content">
          <i class="edit-item fa fa-pencil"></i>
        </a>
      </li>`
      });
      // insert list items
      document.querySelector(UISelectors.itemList).innerHTML = html;
    } 
  }
})();

//  APP Controller...basically initializes the project
const AppCtrl = (function(itemCtrl,UICtrl){

   // public methods
  return{
    init:function(){
      // fetch items from data structure
      const items = itemCtrl.getItems();
  
    // populate list with items
    UICtrl.populateItems(items);
    },
  }
})(itemCtrl,UICtrl);

AppCtrl.init();