import {
  parseAsString,
  parseAsStringEnum,
  parseAsInteger,
  useQueryStates,
} from "nuqs";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const FacetFilters = () => {
  // Always use Swiss time (Europe/Zurich) in yyyy-MM-dd format
  const swissToday = new Date(
    new Date().toLocaleString("de-CH", { timeZone: "Europe/Zurich" })
  )
    .toISOString()
    .split("T")[0]; // Format as yyyy-MM-dd

  // Calculate swiss yesterday (one day before swiss today)
  const swissYesterday = new Date(
    new Date(swissToday).setDate(new Date(swissToday).getDate() - 1)
  )
    .toISOString()
    .split("T")[0]; // Format as yyyy-MM-dd

  console.log("Swiss today (yyyy-MM-dd):", swissToday);
  console.log("Swiss yesterday (yyyy-MM-dd):", swissYesterday);

  // Define the initial/default values for the form
  const initialValues = {
    participantid: null as number | null,
    datefrom: swissYesterday,
    dateto: swissToday,
    status: "TODO" as "TODO" | "DONE",
    correlationreference: null,
    technicalproductname: null,
    transmissiontype: "RECEIVE" as "SEND" | "RECEIVE",
    offset: 0,
    limit: 30,
  };

  // Define the form schema first to use its type
  const FormSchema = z.object({
    participantid: z.number().int().nullable(),
    datefrom: z.string().nullable(),
    dateto: z.string().nullable(),
    status: z.enum(["TODO", "DONE"]).nullable(),
    correlationreference: z.string().nullable(),
    technicalproductname: z.string().nullable(),
    transmissiontype: z.enum(["SEND", "RECEIVE"]).nullable(),
    offset: z.number().int(),
    limit: z.number().int(),
  });

  // Type for our filter values
  type FilterValues = z.infer<typeof FormSchema>;

  // Set up URL state with nuqs, using initialValues as defaults
  const [queryValues, setQueryValues] = useQueryStates(
    {
      participantid: parseAsInteger,
      datefrom: parseAsString.withDefault(initialValues.datefrom),
      dateto: parseAsString.withDefault(initialValues.dateto),
      status: parseAsStringEnum(["TODO", "DONE"]).withDefault(
        initialValues.status
      ),
      correlationreference: parseAsString,
      technicalproductname: parseAsString,
      transmissiontype: parseAsStringEnum(["SEND", "RECEIVE"]).withDefault(
        initialValues.transmissiontype
      ),
      offset: parseAsInteger.withDefault(initialValues.offset),
      limit: parseAsInteger.withDefault(initialValues.limit),
    },
    {
      history: "replace",
      clearOnDefault: false,
    }
  );

  // Initialize form with React Hook Form
  const form = useForm<FilterValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: queryValues as FilterValues,
  });

  // Handle form reset to initial values
  const handleReset = () => {
    form.reset(initialValues);
    setQueryValues(initialValues);
  };

  function onSubmit(data: FilterValues) {
    setQueryValues(data);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full max-w-4xl space-y-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="participantid"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Participant ID</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    value={field.value || ""}
                    onChange={(e) => field.onChange(e.target.valueAsNumber)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="datefrom"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date From</FormLabel>
                <FormControl>
                  <Input type="date" {...field} value={field.value || ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="dateto"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date To</FormLabel>
                <FormControl>
                  <Input type="date" {...field} value={field.value || ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value || ""}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="TODO">TODO</SelectItem>
                    <SelectItem value="DONE">DONE</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="correlationreference"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Correlation Reference</FormLabel>
                <FormControl>
                  <Input {...field} value={field.value || ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="technicalproductname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Technical Product Name</FormLabel>
                <FormControl>
                  <Input {...field} value={field.value || ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="transmissiontype"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Transmission Type</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value || ""}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="SEND">SEND</SelectItem>
                    <SelectItem value="RECEIVE">RECEIVE</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="offset"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Offset</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    value={field.value || ""}
                    onChange={(e) => field.onChange(e.target.valueAsNumber)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="limit"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Limit</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    value={field.value || ""}
                    onChange={(e) => field.onChange(e.target.valueAsNumber)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={handleReset}>
            Reset
          </Button>
          <Button type="submit">Apply Filters</Button>
        </div>
      </form>
    </Form>
  );
};
