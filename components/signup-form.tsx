import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import Login from "@/components/form/Login";
import SignUp from "@/components/form/SignUp";

export async function SignupForm({
                                    className,
                                    ...props
                                }: React.ComponentPropsWithoutRef<"div">) {

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader className="">
                    <CardTitle className="text-xl">Create an Account</CardTitle>
                    <CardDescription>
                        Sign up with your Apple or Google account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <SignUp/>
                </CardContent>
            </Card>
            <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary  ">
                By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
                and <a href="#">Privacy Policy</a>.
            </div>
        </div>
    )
}
