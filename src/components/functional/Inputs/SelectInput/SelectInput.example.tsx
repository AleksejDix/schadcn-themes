"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { SelectInput } from "./SelectInput";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const formSchema = z.object({
  country: z.string().min(1, { message: "Please select a country" }),
  fruit: z.string().min(1, { message: "Please select a fruit" }),
  color: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function SelectInputExample() {
  const methods = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      country: "",
      fruit: "apple",
      color: "",
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log("Form submitted:", data);
    alert(JSON.stringify(data, null, 2));
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Select Input Examples</CardTitle>
        <CardDescription>
          Examples of SelectInput component with different configurations
        </CardDescription>
      </CardHeader>
      <CardContent>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
            <SelectInput
              name="country"
              label="Country"
              required
              options={[
                { value: "us", label: "United States" },
                { value: "ca", label: "Canada" },
                { value: "uk", label: "United Kingdom" },
                { value: "au", label: "Australia" },
              ]}
              description="Select your country"
            />

            <SelectInput
              name="fruit"
              label="Favorite Fruit"
              options={[
                { value: "apple", label: "Apple" },
                { value: "banana", label: "Banana" },
                { value: "orange", label: "Orange" },
                { value: "grape", label: "Grape" },
              ]}
            />

            <SelectInput
              name="color"
              label="Preferred Color"
              hideLabel
              placeholder="Choose a color"
              options={[
                { value: "red", label: "Red" },
                { value: "blue", label: "Blue" },
                { value: "green", label: "Green" },
                { value: "yellow", label: "Yellow" },
              ]}
              disabled={methods.watch("country") === ""}
              description="Only available when country is selected"
            />

            <Button type="submit">Submit Form</Button>
          </form>
        </FormProvider>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={() => methods.reset()}>
          Reset Form
        </Button>
      </CardFooter>
    </Card>
  );
}
