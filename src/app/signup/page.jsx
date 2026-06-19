"use client";
import { authClient } from "@/lib/auth-client";
import { FloppyDisk } from "@gravity-ui/icons";
import {
    Button,
    Description,
    FieldError,
    FieldGroup,
    Fieldset,
    Form,
    Input,
    Label,
    TextField,
} from "@heroui/react";
import { router } from "next/client";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";

const SignUpPage = () => {
    const router = useRouter();
    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const user = Object.fromEntries(formData.entries());

        // Better Auth এর সঠিক মেথড হলো signUp.email
        const { data, error } = await authClient.signUp.email({
            email: user.email,
            password: user.password, // এটি অবশ্যই থাকতে হবে
            name: user.name,
            image: user.image, // ফিল্ডের নাম ঠিক করুন
        });

        if (error) {
            console.error("Signup Error:", error.message);
        } else {
            router.push('/');
        }
    };

    return (
        <div className="container mx-auto my-20 max-sm:p-4">
            <Form className="w-full max-w-96 mx-auto" onSubmit={onSubmit}>
                <Fieldset>
                    <Fieldset.Legend>Create Account</Fieldset.Legend>
                    <Description>Fill in the information below to create your account.</Description>
                    <FieldGroup>
                        <TextField isRequired name="name">
                            <Label>Name</Label>
                            <Input placeholder="John Doe" />
                            <FieldError />
                        </TextField>
                        <TextField isRequired name="email" type="email">
                            <Label>Email</Label>
                            <Input placeholder="john@example.com" />
                            <FieldError />
                        </TextField>
                        {/* পাসওয়ার্ড ফিল্ডটি জরুরি */}
                        <TextField isRequired name="password" type="password">
                            <Label>Password</Label>
                            <Input placeholder="********" />
                            <FieldError />
                        </TextField>
                        <TextField name="image">
                            <Label>Image URL</Label>
                            <Input placeholder="https://example.com/image.jpg" />
                            <FieldError />
                        </TextField>
                    </FieldGroup>
                    <Fieldset.Actions>
                        <Button type="submit">
                            <FloppyDisk />
                            Create Account
                        </Button>
                    </Fieldset.Actions>
                </Fieldset>
            </Form>
        </div>
    );
};

export default SignUpPage;