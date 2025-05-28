import { ActionIcon, Button, Group, Paper, Stack, Text } from "@mantine/core"
import type { ContractEntity } from "../../types/entities/contract.entity"
import { IconFile, IconTrash } from "@tabler/icons-react"
import { ContractStatusMenu } from "./ContractStatusMenu"
import { ContractTemplate } from "../ContractTemplate"
import { useReactToPrint } from "react-to-print"
import { useDeleteContract } from "../../services/deleteContract"
import type { RefObject } from "react"
import { useFetchContractTemplateById } from "../../services/fetchContractTemplateById"

type Props = {
  contract: ContractEntity,
  componentRef: RefObject<HTMLDivElement | null>
}

const ContractItem = ({ contract, componentRef }: Props) => {
  const [deleteContract] = useDeleteContract();
  const handlePrint = useReactToPrint({
    contentRef: componentRef as RefObject<HTMLDivElement>,
    documentTitle: 'Документы',
    pageStyle: '@page {  }',
  });

  const [template] = useFetchContractTemplateById(contract.templateId);
  return (
    <Paper
      key={contract.id}
      w={480}
      h={200}
      p="sm"
      withBorder
      radius="md"
    >
      <Stack justify="space-between" h="100%" gap="xs">
        <Group justify="space-between" w="100%">
          <Group gap={4}>
            <IconFile size={16} color="gray" />
            <Text size="sm" lineClamp={1}>
              {contract.title}
            </Text>
          </Group>
          <ActionIcon variant="subtle" color="red" onClick={() => deleteContract(contract.id)}>
            <IconTrash size={14} />
          </ActionIcon>
        </Group>

        <Stack gap={2}>
          <Text size="sm" fw={500}>
            Шаблон
          </Text>
          <Text size="xs" c="dimmed" lineClamp={1}>
            {template?.name}
          </Text>
        </Stack>

        <Group justify="space-between">
          <ContractStatusMenu contract={contract} />
          <Button
            size="xs"
            variant="light"
            onClick={handlePrint}
            radius="sm"
          >
            Печать
          </Button>
        </Group>
      </Stack>

      <div className="hidden">
        <ContractTemplate ref={componentRef} contract={contract} />
      </div>
    </Paper>

  )
}

export default ContractItem