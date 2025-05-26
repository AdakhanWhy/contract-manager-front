import { Button, Group, Paper, ScrollArea, Stack, Text, TextInput, Title } from "@mantine/core";
import { useFetchContracts } from "../services/fetchContract";
import { IconFile, IconSearch } from '@tabler/icons-react';
import { useReactToPrint } from 'react-to-print';
import { openContextModal } from "@mantine/modals";
import { useRef, useState, type RefObject } from "react";
import { ContractTemplate } from "./ContractTemplate";
import { ContractStatusMenu } from "./ContractStatusMenu";

export const Contract = () => {
  const [search, setSearch] = useState<string | undefined>(undefined);
  const componentRef = useRef<HTMLDivElement>(null);
  const [contracts] = useFetchContracts({
    name: search,
  });

  const openCreateContractModal = () => {
    openContextModal({
      modal: "createContract",
      title: "Создать документ",
      size: "lg",
      innerProps: {}
    })
  };

  const handlePrint = useReactToPrint({
    contentRef: componentRef as RefObject<HTMLDivElement>,
    documentTitle: 'Документы',
    pageStyle: '@page {  }',
  });

  return (
    <Stack w="100%" h="100%" p="md">
      <Group justify="space-between" align="center">
        <Title order={2}>Документы</Title>
        <TextInput
          value={search}
          onChange={(e) => setSearch(e.target.value ?? undefined)}
          placeholder="Поиск"
          leftSection={<IconSearch size={16} />}
        />
        <Button onClick={openCreateContractModal}>Добавить документ</Button>
      </Group>

      <ScrollArea h="80vh">
        <Stack gap="xs">
          {contracts.map((contract) => (
            <Paper key={contract.id} p="md" withBorder radius="md" shadow="xs">
              <Group justify="space-between" align="center">
                <Group>
                  <IconFile color="red" />
                  <Text size="sm">{contract.title}</Text>
                  <ContractStatusMenu contract={contract} />
                </Group>
                <Group>
                  <Button size="xs" variant="default" onClick={handlePrint}>Печать</Button>
                </Group>
              </Group>
              <div className="hidden">
                <ContractTemplate ref={componentRef} contract={contract} />
              </div>
            </Paper>
          ))}
        </Stack>
      </ScrollArea>
    </Stack>
  );
};