class TO_DO {
  constructor(input, list) {
        this.input = document.querySelector(input);
        this.list = document.querySelector(list);
        
        this.displayInputValues = this.displayInputValues.bind(this);
        
        // id count to store in localstorage
        if(localStorage.length) {
        let maxID = [];

                for(let key in localStorage) {
                      if(localStorage.hasOwnProperty(key))  {
                        maxID.push(key)
                      }
                  
                }

        this.id = Math.max(...maxID) + 1
        } else {
            this.id = 0;
        }
        
  }


  // function that triggers to do actions
  displayInputValues(event) {
      const { value } = event.target
        if (event.key === "Enter") {
            const box = this.createItem("div",  value);

            box.dataset.id = this.id
            this.appendItem(box, this.list);
            
            this.clearInput('')
          
            this.storeLocalStorage(this.id++, box.outerHTML);

            box.addEventListener('click', this.removeItem);
        }
    
  }

  clearInput(clear) {
    this.input.value = clear
  }


  // function to create itens 
  createItem(wrapper,  content) {
    const box = document.createElement(wrapper);
    box.innerHTML = content;

    return box; 
  }

  // function to remove  itens 
  removeItem() {
    
    localStorage.removeItem(this.dataset.id)
    this.remove();
   
  }

  
  // function to dispay  itens  
  appendItem(item, node) {
    node.append(item);
  }

  // function to store items on local storage
  storeLocalStorage(id, item) {
    localStorage.setItem(id, item);
  }


  // event listeners
  eventListeners() {
    this.input.addEventListener("keypress", this.displayInputValues);
  }


  // function to get items from local storage
  getLocalStorageItems() {
    for(let key in localStorage) {
      if(localStorage.hasOwnProperty(key)) {

          const localBox = this.createItem('div', localStorage[key] );
         
          localBox.dataset.id = key;
          
          this.appendItem(localBox, this.list);

          localBox.addEventListener('click', this.removeItem);
      }
    }
  } 

  init() {
    this.eventListeners();

    if(localStorage.length) {
        this.getLocalStorageItems();
    }
  }
}

const todo = new TO_DO("input", ".list");

todo.init();