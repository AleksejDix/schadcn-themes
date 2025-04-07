import {
  parseAsString,
  parseAsStringEnum,
  parseAsInteger,
  useQueryStates,
} from "nuqs";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

// Import custom input components
import { TextInput } from "@/components/functional/inputs/TextInput/TextInput";
import { SelectInput } from "@/components/functional/inputs/SelectInput/SelectInput";
import { IntegerInput } from "@/components/functional/inputs/IntegerInput/IntegerInput";

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

  // Options for select inputs
  const statusOptions = [
    { value: "TODO", label: "TODO" },
    { value: "DONE", label: "DONE" },
  ];

  const transmissionTypeOptions = [
    { value: "SEND", label: "SEND" },
    { value: "RECEIVE", label: "RECEIVE" },
  ];

  return (
    <FormProvider {...form}>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full max-w-4xl space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <IntegerInput
              name="participantid"
              label="Participant ID"
              placeholder="Enter participant ID"
              min={1}
            />

            <TextInput
              name="datefrom"
              label="Date From"
              type="date"
              defaultValue={swissYesterday}
            />

            <TextInput
              name="dateto"
              label="Date To"
              type="date"
              defaultValue={swissToday}
            />

            <SelectInput
              name="status"
              label="Status"
              options={statusOptions}
              placeholder="Select status"
            />

            <TextInput
              name="correlationreference"
              label="Correlation Reference"
              placeholder="Enter correlation reference"
            />

            <TextInput
              name="technicalproductname"
              label="Technical Product Name"
              placeholder="Enter product name"
            />

            <SelectInput
              name="transmissiontype"
              label="Transmission Type"
              options={transmissionTypeOptions}
              placeholder="Select type"
            />

            <IntegerInput
              name="offset"
              label="Offset"
              placeholder="Enter offset"
              min={0}
            />

            <IntegerInput
              name="limit"
              label="Limit"
              placeholder="Enter limit"
              min={1}
              defaultValue={30}
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
    </FormProvider>
  );
};
