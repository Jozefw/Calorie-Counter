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
    // {id:0,name:'Apple Pie',calories:1000},
    // {id:1,name:'Chocolate Cream Pie',calories:2000},
    // {id:2,name:'Tofu Pie',calories:10}
  ],
  currentItem:null,
  totalCalories:0
}
 // public methods
return {
  getItems:function(){
    return data.items
  },
  addNewItem:function(name, calories){
    let ID;

    // create an id number
    if(data.items.length > 0){
      ID = data.items[data.items.length - 1].id + 1;
    }else{ID = 0};

    // parse calories as a number
    calories = parseInt(calories);

    // make new item object
    const newItem = new Item(ID,name,calories);

    // add new item to items array
    data.items.push(newItem);
    return newItem;
  },
  getTotalCalories: function(){
    let totalCals = 0;
    data.items.forEach(function(item){
      totalCals = totalCals + item.calories;
      
    });
    data.totalCalories = totalCals;
    return data.totalCalories;
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
  addBtn: '.add-btn',
  name: '#item-name',
  calories: '#item-calories',
  totalCalories:'.total-calories'
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
    },
    getItemAdded: function(){
      return {
        name: document.querySelector(UISelectors.name).value,
        calories: document.querySelector(UISelectors.calories).value
      }
    }, 
    addNewListItem: function(item){
      // show list styling because its hidden if nothing is there
      document.querySelector(UISelectors.itemList).style.display = 'block';

      // create li element for UI
      const LI = document.createElement('LI');
      LI.className = 'collection-item';
      LI.id = `item-${item.id}`;
      LI.innerHTML = `<strong>${item.name}: </strong> <em>${item.calories} : Calories</em>
      <a href="#" class="secondary-content">
        <i class="edit-item fa fa-pencil"></i>
      </a>`;

        // insert list items
        document.querySelector(UISelectors.itemList).insertAdjacentElement('beforeend',LI);

    },
    clearInputFields: function(){
      document.querySelector(UISelectors.name).value = ''
      document.querySelector(UISelectors.calories).value = ''
    },
    hideList: function(){
      document.querySelector(UISelectors.itemList).style.display = 'none';
    },
    showTotalCalories: function(totalCalories){
      document.querySelector(UISelectors.totalCalories).innerHTML = totalCalories;
    },
    getSelectors:function(){
      return UISelectors;
    }
  }
})();

//  ******** APP Controller...basically initializes the project ******
const AppCtrl = (function(itemCtrl,UICtrl){
  // load Event Listeners

  // get Ui Selectors as they are private
  const loadEventListeners = function(){

    // Get UI selectors
    const UISelectors = UICtrl.getSelectors();

    // add item event from UI
    document.querySelector(UISelectors.addBtn).addEventListener('click',itemAdded);
  }
  
  const itemAdded = function(e){

    // get item input from form (UI controller)
    const input = UICtrl.getItemAdded();
    
    // check if there is anything in the input fields
    if(input.name !== '' && input.calories !== ''){
     const newItem = itemCtrl.addNewItem(input.name,input.calories);

    //  add new item to UI list
    UICtrl.addNewListItem(newItem);

      // Get total calories
    const totalCalories = itemCtrl.getTotalCalories();

      // add Total Calories to UI
     UICtrl.showTotalCalories(totalCalories);

    UICtrl.clearInputFields();
    };

    e.preventDefault;
  }
   // public methods
  return{
    init:function(){
      // fetch items from data structure
      const items = itemCtrl.getItems();
    // check if items are there if not remove styling
      if(items.length === 0){
        UICtrl.hideList();
      }else{
        // populate list with items
        UICtrl.populateItems(items);
      }
      loadEventListeners();

    },
  }
})(itemCtrl,UICtrl);

AppCtrl.init();