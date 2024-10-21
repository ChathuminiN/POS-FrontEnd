import CategoryType from "./CategoryType";

interface ItemType{
     id:number;
     name:string;
     category:CategoryType;
     description:string;
     stock:number;
     price:number;
}

export default ItemType;