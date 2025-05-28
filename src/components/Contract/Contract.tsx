import { Button, Group, ScrollArea, Stack, TextInput, Title } from "@mantine/core";
import { useFetchContracts } from "../../services/fetchContract";
import { IconSearch } from '@tabler/icons-react';
import { openContextModal } from "@mantine/modals";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetMe } from "../../services/getMe";
import ContractItem from "./ContractItem";

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
          }}>{userId ? 'Документы' : 'Мои Документы'}</Button>
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
            <ContractItem key={contract.id} contract={contract} componentRef={componentRef} />
          ))}
        </Group>
      </ScrollArea>
    </Stack>
  );
};