import { ILoginErrors, ILoginProps, IRegisterprops, TRegisterErrors } from "@/types";

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passRegex = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/;

export function validateLoginForm(values: ILoginProps) {
    const errors: ILoginErrors = {}

    if (values.email && !emailRegex.test(values.email)) {
        errors.email = ("Email is not valid");
    } else if (values.email && values.password && !passRegex.test(values.password)) {
        errors.password = ("Password must be 8-16 characters, with at least one capital letter, one lowercase letter, and one number.");
    }    
    return errors;
}

export function validateRegisterForm(values: IRegisterprops) {
    const errors: TRegisterErrors = {}

    if (!values.email) {
        errors.email = "Email is required";
    } else if (!emailRegex.test(values.email)) {
        errors.email = "Please provide a valid email address (e.g., example@domain.com).";
    }
    
    if (!values.password) {
        errors.password = "Password is required";
    } else if (!passRegex.test(values.password)) {
        errors.password = "Password must be 8-16 characters, with at least one uppercase letter, one lowercase letter, and one number.";
    }

    if (!values.name) {
        errors.name = "Name is required";
    }

    if (!values.address) {
        errors.address = "Address is required";
    }

    if (!values.phone) {
        errors.phone = "Phone number is required";
    } else if (!/^\+?\d{10,15}$/.test(values.phone)) {
        errors.phone = "Phone number must be 10-15 digits, and may include a country code.";
    }

    return errors;
}

