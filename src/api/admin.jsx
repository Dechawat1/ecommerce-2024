import axios from "axios";

export const changOrderStatus = async (token, data) => {
  return await axios.put(
    "http://localhost:5001/api/admin/order-status",
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
export const getOrderAdmin = async (token) => {
  return await axios.get(
    "http://localhost:5001/api/admin/orders",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
export const listUsers = async (token) => {
  return await axios.get(
    "http://localhost:5001/api/users",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
export const changStatusUser = async (token,data) => {
  return await axios.post(
    "http://localhost:5001/api/change-status",
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
export const changRoleUser = async (token,data) => {
  return await axios.post(
    "http://localhost:5001/api/change-role",
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};