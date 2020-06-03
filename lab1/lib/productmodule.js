class Product{
    constructor(name, shopname) {
        this._name = name;
        this._shopname = shopname;
      }
    
      get name() {
        return this._name;
      }
    
      set name(newName) {
        this._name = newName;
      }
      get shopname() {
        return this._shopname;
      }
    
      set shopname(newName) {
        this._shopname = newName;
      }

}


module.exports =  { Product};