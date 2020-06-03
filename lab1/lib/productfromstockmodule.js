class ProductFromStock{
    constructor(name, stockname) {
        this._name = name;
        this._stockname = stockname;
      }
    
      get name() {
        return this._name;
      }
    
      set name(newName) {
        this._name = newName;
      }
      get stockname() {
        return this._stockname;
      }
    
      set stockname(newName) {
        this._stockname = newName;
      }

}


module.exports =  { ProductFromStock};