// api/validation.ts
import { toast } from "@/hooks/use-toast";

// Function to validate the email (returns boolean or custom error message)
export const validateEmail = async (email: string) => {
    try {
        const response = await fetch(`/api/validate-email?email=${email}`);
        const data = await response.json();
        if (!data.isValid) {
            return "Email is already in use or invalid.";
        }
        return true;
    } catch (error) {
        toast({
            variant: "destructive",
            title: "Error validating email",
            description: "Something went wrong while validating the email.",
        });
        return false;
    }
};

// Function to validate the phone number
export const validatePhoneNumber = async (phoneNumber: string) => {
    try {
        const response = await fetch(`/api/validate-phone?phone_number=${phoneNumber}`);
        const data = await response.json();
        if (!data.isValid) {
            return "Phone number is already in use or invalid.";
        }
        return true;
    } catch (error) {
        toast({
            variant: "destructive",
            title: "Error validating phone number",
            description: "Something went wrong while validating the phone number.",
        });
        return false;
    }
};
