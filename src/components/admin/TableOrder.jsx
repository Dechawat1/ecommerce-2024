import React, { useState, useEffect } from "react";
import { getOrderAdmin, changOrderStatus } from "../../api/admin";
import useEcomStore from "../../store/ecom-store";
import { toast } from "react-toastify";
import { numberFormat } from "../../utils/number";
import { dateFormat } from "../../utils/dateformat";

const TableOrder = () => {
  const token = useEcomStore((e) => e.token);
  const [orderAdmin, setOrderAdmin] = useState([]);

  useEffect(() => {
    handleGetOrderAdmin(token);
  }, []);

  const handleGetOrderAdmin = (token) => {
    return getOrderAdmin(token)
      .then((res) => {
        setOrderAdmin(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChangStatus = (event, id) => {
    const orderStatus = event.target.value;
    const data = {
      orderId: id,
      orderStatus: orderStatus,
    };

    return changOrderStatus(token, data)
      .then((res) => {
        toast.success("Update Status Success!!!");
        handleGetOrderAdmin(token);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Not Process":
        return "bg-gray-200";
      case "Processing":
        return "bg-blue-200";
      case "Completed":
        return "bg-green-200";
      case "Cancelled":
        return "bg-red-200";
    }
  };

  return (
    <div className="container mx-auto p-4 bg-white shadow-md">
      <div>
        <table className="w-full">
          <thead>
            <tr className="bg-gray-200 border">
              <th>ลำดับ</th>
              <th>ผู้ใช้งาน</th>
              <th>วันที่</th>
              <th>สินค้า</th>
              <th>รวม</th>
              <th>สถานะ</th>
              <th>จัดการ</th>
            </tr>
          </thead>

          <tbody>
            {orderAdmin?.map((item, index) => {
              return (
                <tr key={index} className="border">
                  <td className="text-center">{index + 1}</td>
                  <td>
                    <p>{item.orderedBy.email}</p>
                    <p>{item.orderedBy.address}</p>
                  </td>
                  <td>
                    {dateFormat(item.createdAt)}
                  </td>

                  <td className="px-2 py-4">
                    {item.products?.map((product, index) => (
                      <li key={index}>
                        {product.product.title} {"  "}
                        <span className="text-sm text-red-500 px-2 font-semibold">
                          {product.count} x {numberFormat(product.product.price)}.-
                        </span>
                      </li>
                    ))}
                  </td>

                  <td className="px-4">{numberFormat(item.cartTotal)}.-</td>
                  <td>
                    <span
                      className={`${getStatusColor(item.orderStatus)} px-2 py-1 rounded-full`}
                    >
                      {item.orderStatus}
                    </span>
                  </td>
                  <td>
                    <select
                      value={item.orderStatus}
                      onChange={(event) => handleChangStatus(event, item.id)}
                      className="bg-slate-400 hover:bg-gray-500 focus:outline-none p-2 border rounded-2xl text-white"
                    >
                      <option>Not Process</option>
                      <option className="" value="Processing">
                        Processing
                      </option>
                      <option className="" value="Completed">
                        Completed
                      </option>
                      <option className="" value="Cancelled">
                        Cancelled
                      </option>
                    </select>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableOrder;
