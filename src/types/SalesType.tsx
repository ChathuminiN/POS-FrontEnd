import ItemType from "./ItemType";

interface SalesType{
    id:number,
    totalPrice:number,
    soldAt:Date,
    orderedProducts:ItemType[]///////////////
}

export default SalesType;