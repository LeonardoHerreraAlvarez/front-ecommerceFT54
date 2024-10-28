/* eslint-disable @typescript-eslint/no-explicit-any */
import { ILoginProps, IRegisterprops } from "@/types";
import { Toast } from "@/helpers/index";

const APIURL = process.env.NEXT_PUBLIC_API_URL;

export async function register(userData: IRegisterprops) {
  try {
    const res = await fetch(`${APIURL}/users/register`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!res.ok) {
      const errorData = await res.json();
      Toast.fire({
        icon: "error",
        title: errorData.message || `Error ${res.status}: ${res.statusText}`,
      });
      return null;
    }

    return await res.json();
  } catch (error: any) {
    Toast.fire({
      icon: "error",
      title: error.message || "Failed to register",
    });
    return null;
  }
};

export async function login(userData: ILoginProps) {
  try {
    const res = await fetch(`${APIURL}/users/login`, {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(userData)
    });

    if (res.ok) {
      return res.json();
    } else {
      Toast.fire({
        icon: "error",
        title: "Failed to register"
      });
      return { error: "Login failed" };
    }
  } catch (error: any) {
    Toast.fire({
      icon: "error",
      title: "Failed to register"
    });
    return { error: error.message };
  }  
}

