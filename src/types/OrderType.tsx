import ItemType from "./ItemType";

interface OrderType{
    id:number,
    totalPrice:number,
    orderDateAndTime:Date,
    OrderedItem:ItemType[]
}

export default OrderType;