import axios from "axios";

export const changOrderStatus = async (token, data) => {
  return await axios.put(
    "https://ecommerce-api-kohl-sigma.vercel.app/api/admin/order-status",
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
    "https://ecommerce-api-kohl-sigma.vercel.app/api/admin/orders",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
export const listUsers = async (token) => {
  return await axios.get(
    "https://ecommerce-api-kohl-sigma.vercel.app/api/users",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
export const changStatusUser = async (token,data) => {
  return await axios.post(
    "https://ecommerce-api-kohl-sigma.vercel.app/api/change-status",
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
    "https://ecommerce-api-kohl-sigma.vercel.app/api/change-role",
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};