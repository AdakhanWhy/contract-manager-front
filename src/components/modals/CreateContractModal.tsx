import { z } from "zod";
import { useForm, zodResolver } from "@mantine/form";
import { openContextModal, type ContextModalProps } from "@mantine/modals";
import { useCreateContract } from "../../services/createContract";
import { ActionIcon, Button, Select, TextInput } from "@mantine/core";
import { useFetchContractTemplates } from "../../services/fetchContractTemplate";
import { IconPlus } from "@tabler/icons-react";

const createContractSchema = z.object({
  title: z.string(),
  templateId: z.string(),
});

export type CreateContractForm = z.infer<typeof createContractSchema>;

type Props = ContextModalProps;

export const CreateContractModal = ({ context, id }: Props) => {
  const [template] = useFetchContractTemplates();
  const [createContract] = useCreateContract();
  const form = useForm<CreateContractForm>({
    initialValues: {
      title: "",
      templateId: ""
    },
    validate: zodResolver(createContractSchema),
  });

  const handleSubmit = (values: CreateContractForm) => {
    createContract(values);
    context.closeModal(id);
  };

  const openCreateContractTemplateModal = () => {
    openContextModal({
      modal: "createContractTemplate",
      title: "Создать шаблон",
      size: "lg",
      zIndex: 1000,
      innerProps: {}
    })
  };
  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <div className="flex flex-col mt-3 gap-3">
        <TextInput
          size="md"
          label="Название"
          placeholder="Введите название"
          {...form.getInputProps("title")}
          radius={12}
        />

        <div className="flex items-end gap-3">
          <Select
            size="md"
            label="Шаблон"
            w='100%'
            placeholder="Выберите Шаблон"
            data={template.map((item) => ({
              value: item.id,
              label: item.name,
            }))}
            {...form.getInputProps("templateId")}
            radius={12}
          />
          <ActionIcon onClick={openCreateContractTemplateModal} className="mb-2">
            <IconPlus size={16} />
          </ActionIcon>
        </div>

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
    </form>
  );
};