export class ProductDTO {
    constructor(id, name, price, quantity, total) {
      this.id = id;
      this.name = name;
      this.price = price;
      this.quantity = quantity;
      this.total = total;
    }
  
    static fromModel(product) {
      return new ProductDTO(product.id, product.name, product.price, product.quantity, product.total);
    }
};  