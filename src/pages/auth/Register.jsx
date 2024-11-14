// rafce
import React, { useEffect, useState } from "react";
import { useNavigate  } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import zxcvbn from "zxcvbn";

const registerSchema = z
  .object({
    email: z.string().email({ message: "Invalid email !!!" }),
    password: z.string().min(8, { message: "Password ต้องมากกว่า 8 ตัวอักษร" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Confirm Password is not match!!!",
    path: ["confirmPassword"],
  });

const Register = () => {
  const [passwordScore, setPasswordScore] = useState(0);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const validatePassword = () => {
    let password = watch().password;
    return zxcvbn(password ? password : "").score;
  };

  useEffect(() => {
    setPasswordScore(validatePassword());
  }, [watch().password]);

  const onSubmit = async (data) => {
    try {
      const res = await axios.post("http://localhost:5001/api/register", data);
      toast.success(res.data);
      navigate('/')
    } catch (err) {
      const errMsg = err.response?.data?.message;
      toast.error(errMsg);
    }
  };

  return (
    <div className="min-h-screen flex items-center 
    justify-center bg-gray-200 px-4">

      <div className="w-full shadow-md bg-white p-8 max-w-md">

        <h1 className="text-2xl text-center my-4 font-bold"> Register</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-4">

        <div>
        <input {...register("email")} 
        placeholder="Email"
        className={`border w-full px-3 py-2 rounded 
        focus:outline-none focus:ring-2 focus:ring-green-400
        focus:border-transparent
          ${errors.email && 'border-red-500'}
        `} 
        
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>

        
        <div>
        <input {...register("password")} 
        type="password"
        placeholder="Password"
        className={`border w-full px-3 py-2 rounded 
          focus:outline-none focus:ring-2 focus:ring-green-400
          focus:border-transparent
            ${errors.password && 'border-red-500'}
          `} 
          
          />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}
        {
          watch().password?.length > 0 &&
          <div className="flex mt-3">
          {Array.from(Array(5).keys()).map((item, index) => (
            <span className="w-1/5 px-1" key={index}>
              <div
                className={`rounded-md h-2 ${
                  passwordScore <= 2
                    ? "bg-red-200"
                    : passwordScore < 4
                    ? "bg-yellow-200"
                    : "bg-green-200"
                }
                
                `}
              ></div>
            </span>
          ))}
        </div>
        }
        </div>
       
        <div>
        <input {...register("confirmPassword")} 
        type="password"
        placeholder="ConfirmPassword"
        className={`border w-full px-3 py-2 rounded 
          focus:outline-none focus:ring-2 focus:ring-green-400
          focus:border-transparent
            ${errors.confirmPassword && 'border-red-500'}
          `} 
          
          />
        {errors.confirmPassword && (
          <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>
        )}
        </div>
        
        <button 
        className="bg-blue-500 rounded-md w-full 
        text-white font-bold py-2 shadow hover:bg-blue-400">
          Register</button>
        </div>
      </form>
      </div>
     
    </div>
  );
};

export default Register;
