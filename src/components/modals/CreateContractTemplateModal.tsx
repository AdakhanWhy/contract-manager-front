import { useForm, zodResolver } from "@mantine/form";
import type { ContextModalProps } from "@mantine/modals";
import { z } from "zod";
import { useCreateContractTemplate } from "../../services/createContractTemplate";
import { Button, Textarea, TextInput } from "@mantine/core";

const createContractTemplateSchema = z.object({
  name: z.string(),
  content: z.string()
});

export type CreateContractTemplateForm = z.infer<typeof createContractTemplateSchema>;

type Props = ContextModalProps;

export const CreateContractTemplateModal = ({ context, id }: Props) => {
  const [createContractTemplate] = useCreateContractTemplate();
  const form = useForm<CreateContractTemplateForm>({
    initialValues: {
      name: "",
      content: ""
    },
    validate: zodResolver(createContractTemplateSchema),
  });

  const handleSubmit = (values: CreateContractTemplateForm) => {
    context.closeModal(id);
    createContractTemplate(values);
  };
  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <div className="flex flex-col mt-3 gap-3">
        <TextInput
          size="md"
          label="Название"
          placeholder="Введите название"
          {...form.getInputProps("name")}
          radius={12}
        />

        <Textarea
          size="md"
          label="Содержимое"
          placeholder="Введите содержимое"
          {...form.getInputProps("content")}
          radius={12}
        />
        <div className="flex justify-end">
          <Button
            color="#722CCC"
            size="md"
            mt={9}
            radius={10}
            fullWidth
            type="submit"
          >
            Создать
          </Button>
        </div>
      </div>
    </form>
  );
};