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
    Separator,
    TextField,
} from "@heroui/react";
import { Icon } from "@iconify/react";
import { router } from "next/client";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";

const SignUpPage = () => {
    const router = useRouter();
    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const user = Object.fromEntries(formData.entries());

        const { data, error } = await authClient.signUp.email({
            email: user.email,
            password: user.password,
            name: user.name,
            image: user.image,
        });

        if (error) {
            console.error("Signup Error:", error.message);
        } else {
            router.push('/');
        }
    };

    const handeGoolgeSign = async () => {
        await authClient.signIn.social({
            provider: "google"
        })
    }

    return (
        <div className="container mx-auto my-20 max-sm:p-4">
            <Form className="w-full max-w-96 mx-auto" onSubmit={onSubmit}>
                <Fieldset>
                    <Fieldset.Legend>Create Account</Fieldset.Legend>
                    <Description>Fill in the information below to create your account.</Description>
                    <FieldGroup>
                        <TextField isRequired name="name">
                            <Label>Name</Label>
                            <Input placeholder="John Doe" className={'w-full'} />
                            <FieldError />
                        </TextField>
                        <TextField isRequired name="email" type="email">
                            <Label>Email</Label>
                            <Input placeholder="john@example.com" className={'w-full'} />
                            <FieldError />
                        </TextField>
                        <TextField isRequired name="password" type="password">
                            <Label>Password</Label>
                            <Input placeholder="********" className={'w-full'} />
                            <FieldError />
                        </TextField>
                        <TextField name="image">
                            <Label>Image URL</Label>
                            <Input placeholder="https://example.com/image.jpg" className={'w-full'} />
                            <FieldError />
                        </TextField>
                    </FieldGroup>
                    <Fieldset.Actions>
                        <Button type="submit" className={"w-full rounded-none"}>
                            <FloppyDisk />
                            Create Account
                        </Button>
                    </Fieldset.Actions>
                    <Separator className="my-4" />
                    <Button onClick={handeGoolgeSign} className="w-full rounded-none" variant="secondary">
                        <Icon icon="devicon:google" />
                        Sign in with Google
                    </Button>
                </Fieldset>
            </Form>

        </div>
    );
};

export default SignUpPage;