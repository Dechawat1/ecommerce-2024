// rafce
import React, { useState } from "react";
import { toast } from "react-toastify";
import useEcomStore from "../../store/ecom-store";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const loginSchema = z
  .object({
    email: z.string().email({ message: "กรุณากรอกอีเมล" }),
    password: z.string(),
  })
  .refine((data) => data.password.length != 0, {
    message: "กรุณากรอกรหัสผ่าน",
    path: ["password"],
  });

const Login = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  // Javascript
  const navigate = useNavigate();
  const actionLogin = useEcomStore((state) => state.actionLogin);


  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleOnChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (form) => {
    try {
      const res = await actionLogin(form);
      const role = res.data.payload.role;
      roleRedirect(role);
      toast.success("Welcome Back");
    } catch (err) {
      console.log(err);
      const errMsg = err.response?.data?.message;
      toast.error(errMsg);
    }
  };

  const roleRedirect = (role) => {
    if (role === "admin") {
      navigate("/admin");
    } else {
      navigate(-1);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center 
    justify-center bg-gray-200 px-4"
    >
      <div className="w-full shadow-md bg-white p-8 max-w-md">
        <h1 className="text-2xl text-center my-4 font-bold"> Login</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <div>
              <input
                {...register("email")}
                placeholder="Email"
                className="border w-full px-3 py-2 rounded 
              focus:outline-none focus:ring-2 focus:ring-green-400
              focus:border-transparent"
                onChange={handleOnChange}
                name="email"
                type="email"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>
            <div>
              <input
                {...register("password")}
                placeholder="Password"
                className="border w-full px-3 py-2 rounded 
              focus:outline-none focus:ring-2 focus:ring-green-400
              focus:border-transparent"
                onChange={handleOnChange}
                name="password"
                type="password"
              />
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>

            <button
              className="bg-blue-500 rounded-md w-full 
        text-white font-bold py-2 shadow hover:bg-blue-400"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
