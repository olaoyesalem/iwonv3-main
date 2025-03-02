"use client";
import Button from "@/components/Button";
import TextInput from "@/components/TextInput";
import { useState } from "react";
import { FaEye, FaEyeSlash, FaUserAlt } from "react-icons/fa";
import { AiFillMail } from "react-icons/ai";
import { FaUserPlus } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Container from "./Container";
import useTheme from "../hooks/useTheme";
import axios from "axios";
import { toast } from "react-hot-toast";
import { signIn } from "next-auth/react";
import validator from "validator";
import Link from "next/link";

interface RegisterProps {
  refUsername?: string | string[];
}

const Register = (props: RegisterProps) => {
  const { refUsername } = props;
  const router = useRouter();
  const { mode } = useTheme();
  const [loading, setLoading] = useState(false);

  const [inputs, setInputs] = useState({
    fullName: "",
    email: "",
    password: "",
    username: "",
    refUsername: refUsername?.toString().toLowerCase() || "",
    isSecure: true,
  });

  const registerHandler = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e?.preventDefault();

    const data = {
      fullname: inputs.fullName || inputs.username,
      email: inputs.email,
      username: inputs.username,
      password: inputs.password,
      refUsername:
        inputs.refUsername.trim() === "" ? "NO REF" : inputs.refUsername,
    };

    const isEmail = validator.isEmail(data.email.trim());
    if (!isEmail) return toast.error("This is Not a valid email");

    if (data.password.trim().length < 6) {
      return toast.error("Password must be atleast 6 chars");
    }

    if (data.username.trim().length < 4) {
      return toast.error("Your username should have atleast 4 characters");
    }

    if (data.username.trim().split(" ").length > 1)
      return toast.error(
        "Invalid username: Username should be one word e.g woodman NOT wood man",
        { duration: 10000 }
      );

    try {
      setLoading(true);
      const res = await axios.post("/api/auth/register", data);
      if (res.data.error) throw new Error(res.data.error);

      const res1 = await signIn("credentials", {
        email: inputs.email,
        password: inputs.password,
        redirect: false,
      });
      if (res1?.error) throw new Error(res1?.error);
      router.replace("/dashboard");
      toast.success("login successful");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={registerHandler}>
        <Container>
          <div
            className={`${mode === "dark" ? "text-blue-500" : "text-blue-800"} font-bold text-2xl md:text-3xl flex items-center gap-x-2`}
          >
            <FaUserPlus size={24} /> <span>Create New Account</span>
          </div>

          <div className="flex flex-col gap-4 w-full">
            <TextInput
              id="email"
              icon={AiFillMail}
              placeholder="Enter Your Email"
              value={inputs.email}
              onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
              required
            />

            <TextInput
              id="username"
              icon={FaUserAlt}
              placeholder="Enter Your username"
              value={inputs.username}
              onChange={(e) =>
                setInputs({ ...inputs, username: e.target.value })
              }
              required
            />

            <TextInput
              id="password"
              icon={inputs.isSecure ? FaEye : FaEyeSlash}
              placeholder="Enter Your Password"
              secureEntry={inputs.isSecure}
              iconAction={() =>
                setInputs({ ...inputs, isSecure: !inputs.isSecure })
              }
              value={inputs.password}
              onChange={(e) =>
                setInputs({ ...inputs, password: e.target.value })
              }
              required
            />

            <TextInput
              id="refUsername"
              icon={FaUserAlt}
              placeholder="Enter Referral Username (optional)"
              value={inputs.refUsername}
              onChange={(e) =>
                setInputs({ ...inputs, refUsername: e.target.value })
              }
            />
          </div>

          <div className="w-full flex items-center justify-start gap-x-3">
            <input
              id="tandc-checkbox"
              type="checkbox"
              value=""
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              required
            />
            <label
              htmlFor="tandc-checkbox"
              className="flex flex-wrap items-start gap-x-2 text-gray-500 text-sm sm:text-base"
            >
              <p>I agree to these</p>
              <Link
                className="text-blue-500 hover:text-blue-600 underline"
                href="/terms-and-conditions"
              >
                Terms and Conditions
              </Link>
            </label>
          </div>

          <Button
            outline={false}
            small={false}
            label={"Sign Up"}
            type="submit"
            loading={loading}
          />

          <div className="flex flex-col gap-2.5 w-full items-center">
            <div
              className={`font-semibold 
        ${mode === "light" ? "text-gray-500" : "text-white"}`}
            >
              Already have an account?
            </div>

            <Button
              outline
              type="button"
              label={"Login Instead"}
              onClick={() => {
                router.push("/login");
              }}
            />
          </div>
        </Container>
      </form>
    </div>
  );
};
export default Register;
