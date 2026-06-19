"use client";
import { authClient } from "@/lib/auth-client";
import { Check } from "@gravity-ui/icons";
import { Button, Description, FieldError, Form, Input, Label, TextField } from "@heroui/react";
import { useRouter } from "next/navigation";

const LoginPage = () => {
    const router = useRouter();

    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const user = Object.fromEntries(formData.entries());

        const { data, error } = await authClient.signIn.email({
            email: user.email,
            password: user.password,
        });

        console.log("Submitting data:", data);

        router.push("/");
    };

    return (
        <div className="container mx-auto my-20 max-sm:p-4">
            <Form className="flex w-96 mx-auto flex-col gap-4" onSubmit={onSubmit}>
                <TextField isRequired name="email" type="email">
                    <Label>Email</Label>
                    <Input className="w-full" placeholder="john@example.com" />
                    <FieldError />
                </TextField>

                <TextField isRequired name="password" type="password">
                    <Label>Password</Label>
                    <Input className="w-full" placeholder="Enter your password" />
                    <Description>Must be at least 8 characters</Description>
                    <FieldError />
                </TextField>

                <div className="flex gap-2">
                    <Button type="submit" className="w-full rounded-none">
                        <Check /> Login
                    </Button>
                </div>
            </Form>
        </div>
    );
};

export default LoginPage;