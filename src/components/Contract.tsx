import { ActionIcon, Button, Group, Paper, ScrollArea, Stack, Text, TextInput, Title } from "@mantine/core";
import { useFetchContracts } from "../services/fetchContract";
import { IconFile, IconPencil, IconSearch } from '@tabler/icons-react';
import { useReactToPrint } from 'react-to-print';
import { openContextModal } from "@mantine/modals";
import { useRef, useState, type RefObject } from "react";
import { ContractTemplate } from "./ContractTemplate";
import { ContractStatusMenu } from "./ContractStatusMenu";
import { useNavigate } from "react-router-dom";
import { useGetMe } from "../services/getMe";

export const Contract = () => {
  const [search, setSearch] = useState<string | undefined>(undefined);
  const [userId, setUserId] = useState<string | undefined>(undefined);
  const componentRef = useRef<HTMLDivElement>(null);
  const [me] = useGetMe();
  const navigate = useNavigate();
  const [contracts] = useFetchContracts({
    name: search,
    userId
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
        <Group>
          <Button onClick={() => {
            setUserId(userId === me?.id ? undefined : me?.id);
          }}>Мои документы</Button>
          <Button onClick={openCreateContractModal}>Добавить документ</Button>
          <Button onClick={() => {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            navigate("/auth");
          }}>Выйти</Button>
        </Group>
      </Group>

      <ScrollArea h="80vh">
        <Group gap='md'>
          {contracts.map((contract) => (
            <Paper key={contract.id} w='25%' p='md' withBorder radius="md" shadow="xs">
              <Stack align="center">
                <Group justify="space-between" w="100%">
                  <div className="flex items-center gap-2">
                    <IconFile color="red" />
                    <Text size="sm">{contract.title}</Text>
                  </div>
                  <ContractStatusMenu contract={contract} />
                  <Group>
                    <ActionIcon onClick={() => {
                      openContextModal({
                        modal: "updateContract",
                        title: "Редактировать документ",
                        size: "lg",
                        innerProps: {
                          contractId: contract.id,
                          title: contract.title,
                          templateId: contract.templateId,
                        }
                      })
                    }}>
                      <IconPencil size={16} />
                    </ActionIcon>
                  </Group>
                </Group>
                <Group>
                  <Button size="xs" variant="default" onClick={handlePrint}>Печать</Button>
                </Group>
              </Stack>
              <div className="hidden">
                <ContractTemplate ref={componentRef} contract={contract} />
              </div>
            </Paper>
          ))}
        </Group>
      </ScrollArea>
    </Stack>
  );
};