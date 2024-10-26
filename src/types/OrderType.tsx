
import ItemType from "./ItemType";

interface OrderType{
    
    id:number,
    total_price:number,
    orderDateTime:Date,
    OrderedItem:ItemType[]

    
}

export default OrderType;