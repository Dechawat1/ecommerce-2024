import React, { useState, useEffect } from "react";
import useEcomStore from "../../store/ecom-store";
import { listUsers, changRoleUser, changStatusUser } from "../../api/admin";
import { toast } from "react-toastify";

const FormManageUser = () => {
  const token = useEcomStore((e) => e.token);
  const [getListUsers, setGetListUsers] = useState([]);

  useEffect(() => {
    handleGetListUsers(token);
  }, []);

  const handleGetListUsers = (token) => {
    return listUsers(token)
      .then((res) => {
        console.log(res.data);
        setGetListUsers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleStatusChange = (userId, newStatus) => {
    setGetListUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId ? { ...user, enabled: newStatus } : user
      )
    );
    const data = {
      id: userId,
      enabled: newStatus,
    };
    // ตัวอย่างการเรียก API เพื่ออัปเดตสถานะผู้ใช้ใน backend
    changStatusUser(token, data)
      .then((res) => {
        console.log("Status updated:", res.data);
        if (data.enabled === true) {
          toast.success("อีเมลนี้ได้เปิดการใช้งานแล้วครับ ");
        } else {
          toast.success("อีเมลนี้ได้ปิดการใช้งานแล้วครับ!!");
        }
      })
      .catch((err) => {
        console.log("Error updating status:", err);
      });
  };

  const handleChangRole = (event, id) => {
    const role = event.target.value;
    const data = {
      id: id,
      role: role,
    };

    return changRoleUser(token, data)
      .then((res) => {
        toast.success("Update Role Success!!!");
        handleGetListUsers(token);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="container mx-auto p-4 bg-white shadow-md">
        {/*header */}
        <div className="py-4 text-mg font-bold">Management User</div>

        {/*table */}
        <table className="w-full text-center border-separate border-spacing-y-2">
          <thead>
            <tr>
              <th className="p-4">ลำดับ</th>
              <th className="p-4">ชื่อผู้ใช้งาน</th>
              <th className="p-4">ที่อยู่</th>
              <th className="p-4">ตำแหน่ง</th>
              <th className="p-4">สถานะ</th>
            </tr>
          </thead>
          <tbody>
            {getListUsers?.map((user, index) => {
              return (
                <tr key={index}>
                  <td className="p-4">{user.id}</td>
                  <td className="p-4">{user.email}</td>
                  <td className="p-4">{user.address}</td>

                  <td className="p-4">
                    <select
                      value={user.role}
                      onChange={(event) => handleChangRole(event, user.id)}
                      className="bg-green-500 hover:bg-green-600 focus:outline-none p-2 border rounded-full text-white text-sm"
                    >
                      <option value="user">user</option>
                      <option className="" value="admin">
                        admin
                      </option>
                    </select>
                  </td>

                  <td className="p-4">
                    <input
                      className="mr-2 mt-[0.3rem] h-3.5 w-8 appearance-none rounded-[0.4375rem] bg-neutral-300 before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-neutral-100 after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-primary checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-primary checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-primary checked:focus:bg-primary checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:bg-blue-600 dark:after:bg-blue-400 dark:checked:bg-primary dark:checked:after:bg-primary dark:focus:before:shadow-[3px_-1px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca]"
                      type="checkbox"
                      checked={user.enabled}
                      onChange={(e) =>
                        handleStatusChange(user.id, e.target.checked)
                      }
                     
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default FormManageUser;
