"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useFormContext } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";

export type PasswordInputProps = {
  name: string;
  label: string;
  placeholder?: string;
  description?: string;
  required?: boolean;
};

export const PasswordInput = ({
  name,
  label,
  placeholder,
  description,
  required,
}: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const form = useFormContext();

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel
            className={
              required
                ? "after:content-['*'] after:ml-0.5 after:text-red-500"
                : ""
            }
          >
            {label}
          </FormLabel>
          <div className="relative">
            <FormControl>
              <Input
                placeholder={placeholder}
                type={showPassword ? "text" : "password"}
                {...field}
              />
            </FormControl>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? (
                <EyeOff size={16} aria-hidden="true" />
              ) : (
                <Eye size={16} aria-hidden="true" />
              )}
              <span className="sr-only">
                {showPassword ? "Hide password" : "Show password"}
              </span>
            </Button>
          </div>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
