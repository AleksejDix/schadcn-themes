import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { EmailInput } from "./EmailInput";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect } from "react";

const FormSchema = z.object({
  email: z.string().email("Invalid email address"),
});

type FormSchemaType = z.infer<typeof FormSchema>;

type EmailFormProps = {
  label?: string;
  description?: string;
  className?: string;
  errorMessage?: string;
};

export const EmailForm = (props: EmailFormProps) => {
  const { label, description, className, errorMessage } = props;

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
    },
  });

  // Clear previous errors and set new errors when errorMessage changes
  useEffect(() => {
    form.clearErrors("email");

    if (errorMessage) {
      form.setError("email", {
        type: "manual",
        message: errorMessage,
      });
    }
  }, [errorMessage, form]);

  // Reset the form when any props change to ensure the updated props are used
  useEffect(() => {
    // We only want to reset if already mounted (not on initial render)
    const isInitialRender =
      form.formState.isDirty === false && !form.formState.isSubmitted;

    if (!isInitialRender) {
      form.reset(undefined, { keepValues: true });
    }
  }, [label, description, className, form]);

  const onSubmit = (data: FormSchemaType) => {
    console.log(data);
  };

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <EmailInput
          name="email"
          label={label}
          description={description}
          className={className}
        />
        <div>
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </Form>
  );
};
