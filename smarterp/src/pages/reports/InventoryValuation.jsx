import { useEffect, useState } from "react";
import axios from "axios";

export default function InventoryValuation() {

  const [items,setItems]=useState([]);

  useEffect(()=>{
    fetchInventory();
  },[]);

  const fetchInventory=async()=>{

    const res=await axios.get(
      "http://localhost:5000/api/inventory"
    );

    setItems(res.data);

  };

  const totalValue=items.reduce(
    (sum,item)=>sum+Number(item.stock_value),
    0
  );

  return(

<div className="min-h-screen bg-slate-100 p-8">

<div className="max-w-7xl mx-auto bg-white shadow rounded-xl p-8">

<h1 className="text-3xl font-bold mb-8">

Inventory Valuation Report

</h1>

<table className="w-full border">

<thead className="bg-blue-600 text-white">

<tr>

<th className="p-3">Item</th>

<th className="p-3">Closing Stock</th>

<th className="p-3">Purchase Rate</th>

<th className="p-3">Stock Value</th>

</tr>

</thead>

<tbody>

{items.map(item=>(

<tr
key={item.id}
className="border-b text-center"
>

<td className="p-3">

{item.item_name}

</td>

<td className="p-3">

{item.closing_stock}

</td>

<td className="p-3">

₹{Number(item.purchase_rate).toLocaleString("en-IN")}

</td>

<td className="p-3 font-bold">

₹{Number(item.stock_value).toLocaleString("en-IN")}

</td>

</tr>

))}

</tbody>

<tfoot>

<tr className="bg-gray-100 font-bold">

<td
colSpan="3"
className="text-right p-4"
>

Total Inventory Value

</td>

<td className="p-4 text-green-700">

₹{totalValue.toLocaleString("en-IN")}

</td>

</tr>

</tfoot>

</table>

</div>

</div>

  );

}