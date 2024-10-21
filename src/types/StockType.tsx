import ItemType from "./ItemType";

interface StockType{
    id:number,
    item:ItemType,
    quantity:number;
    lastUpdated:Date,
}
    

export default StockType;