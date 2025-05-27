import { openContextModal, type ContextModalProps } from "@mantine/modals";
import { updateContractSchema, useUpdateContract, type UpdateContractForm } from "../../services/updateContract";
import { useForm, zodResolver } from "@mantine/form";
import { ActionIcon, Button, Select, TextInput } from "@mantine/core";
import { useFetchContractTemplates } from "../../services/fetchContractTemplate";
import { IconPlus } from "@tabler/icons-react";

type Props = ContextModalProps<{
  contractId: string;
  title: string;
  templateId: string;
}>;

const UpdateContractModal = ({ context, id, innerProps: { contractId, templateId, title } }: Props) => {
  const [updateContract] = useUpdateContract();
  const [template] = useFetchContractTemplates();
  const form = useForm<UpdateContractForm>({
    initialValues: {
      title: title,
      templateId: templateId,
    },
    validate: zodResolver(updateContractSchema),
  });

  const handleSubmit = (values: UpdateContractForm) => {
    context.closeModal(id);
    updateContract({
      id: contractId,
      updateContractDto: values,
    });
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
  )
}

export default UpdateContractModal