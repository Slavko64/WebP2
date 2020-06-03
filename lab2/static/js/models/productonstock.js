class Productonstock extends BaseModel { // eslint-disable-line no-unused-vars, no-undef
    constructor () {
      super('productonstock')
      this.fields = this.fields.concat(['stock', 'product'])
    }
  }