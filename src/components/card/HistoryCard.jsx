import React, { useState, useEffect } from "react";
import { getOrders } from "../../api/user";
import useEcomStore from "../../store/ecom-store";
import { dateFormat } from "../../utils/dateformat";
import { numberFormat } from "../../utils/number";

const HistoryCard = () => {
  const token = useEcomStore((e) => e.token);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    handleGetOrders(token);
  }, []);

  const handleGetOrders = (token) => {
    getOrders(token)
      .then((res) => {
        console.log(res);
        setOrders(res.data.orders);
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
    <div className="p-4 space-y-6 lg:p-8">
      <h1 className="text-2xl font-bold text-gray-800 md:text-3xl">
        ประวัติการสั่งซื้อ
      </h1>

      {/* คลุม */}
      <div className="space-y-6">
        {/* card loop order*/}
        {orders?.map((item, index) => {
          return (
            <div
              key={index}
              className="bg-white p-4 rounded-lg shadow-lg border border-gray-300"
            >
              {/* header */}
              <div className="flex justify-between lg:flex lg:space-x-6 lg:items-center mb-2">
                <div>
                  <p className="text-sm text-gray-600">Order date</p>
                  <p className="font-semibold text-gray-800">
                    {dateFormat(item.createdAt)}
                  </p>
                </div>
                <span
                  className={`${getStatusColor(item.orderStatus)} px-2 py-1 rounded-full`}
                >
                 {item.orderStatus}
                </span>
              </div>
              {/* table */}
              <div className="mt-4 lg:mt-0 lg:flex-1 lg:ml-6">
                <table className="min-w-full border rounded-lg overflow-hidden table-auto">
                  <thead>
                    <tr className="bg-gray-100 text-gray-700 text-sm">
                      <th className="py-2 px-4 text-left">สินค้า</th>
                      <th className="py-2 px-4 text-left">ราคา</th>
                      <th className="py-2 px-4 text-left">จำนวน</th>
                      <th className="py-2 px-4 text-left">ราคารวม</th>
                    </tr>
                  </thead>
                  <tbody>
                    {item?.products.map((product, index) => (
                      <tr key={index} className="text-left text-gray-800">
                        <td className="py-3 ">{product.product.title}</td>
                        <td className="py-3 px-4 ">{numberFormat(product.product.price)}</td>
                        <td className="py-3 px-8 ">{product.count}</td>
                        <td className="py-3 px-4 ">
                          {numberFormat(product.count * product.product.price)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* total */}
              <div className="mt-4 lg:mt-0 lg:text-right">
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-600">
                    ราคาสุทธิ
                  </p>
                  <p className="text-xl font-bold text-blue-500">
                    {numberFormat(item.cartTotal)}.-
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HistoryCard;
