import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CardContent, CardFooter } from "@/components/ui/card";
import { useRegisterMutation } from "@/services/queries/auth.queries";
import { Icons } from "../icons";
import { useToast } from "@/hooks/use-toast";

const RegisterForm = () => {
  const { mutateAsync: register, isPending } = useRegisterMutation();
  const { toast } = useToast();

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const passwordConfirmation = formData.get(
      "password_confirmation"
    ) as string;
    if (password !== passwordConfirmation) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      });
    }

    register(
      { name, email, password },
      {
        onSuccess: (data) => {
          toast({
            title: "Success",
            description: "Account created successfully",
          });
          formData.forEach((value, key) => {
            formData.delete(key);
          });
        },
        onError: (error: any) => {
          console.log(error);
          toast({
            title: "Error",
            description: error.message,
            variant: "destructive",
          });
        },
      }
    );
  }
  return (
    <form onSubmit={onSubmit}>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            name="name"
            type="text"
            placeholder="John Smith"
            autoCapitalize="none"
            autoCorrect="off"
            disabled={isPending}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            name="email"
            placeholder="name@example.com"
            autoCapitalize="none"
            autoComplete="email"
            autoCorrect="off"
            disabled={isPending}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            name="password"
            placeholder="Create a password"
            autoComplete="new-password"
            disabled={isPending}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            type="password"
            name="password_confirmation"
            placeholder="Confirm your password"
            autoComplete="new-password"
            disabled={isPending}
          />
        </div>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <Button className="w-full" type="submit" disabled={isPending}>
          {isPending && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
          Create Account
        </Button>
        <p className="px-8 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            href="/login"
            className="underline underline-offset-4 hover:text-primary"
          >
            Sign In
          </Link>
        </p>
      </CardFooter>
    </form>
  );
};

export default RegisterForm;
