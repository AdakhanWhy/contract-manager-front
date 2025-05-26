import { Button, Menu } from "@mantine/core";
import type { ContractEntity } from "../types/entities/contract.entity";
import { useState } from "react";
import { useUpdateContract } from "../services/updateContract";
import { ContractStatusRu, type ContractStatus } from "../types/enums";

const statuses: { id: string; value: ContractStatus, label: string }[] = Object.entries(ContractStatusRu).map(([status, ru]) => ({
  id: status,
  value: status as ContractStatus,
  label: ru,
}));

export const ContractStatusMenu = ({ contract }: { contract: ContractEntity }) => {
  const [isOpenFirstMenu, setIsOpenFirstMenu] = useState(false);
  const [updateContract] = useUpdateContract();

  const handleChangeStatus = (id: string, value: ContractStatus) => {
    updateContract({
      id,
      updateContractDto: {
        status: value,
      }
    });
  };
  return (
    <Menu
      // classNames={ruleMenuClasses}
      opened={isOpenFirstMenu}
      onChange={setIsOpenFirstMenu}
      width={172}
    >
      <Menu.Target>
        <Button>
          <p style={{ display: 'flex', justifyContent: 'center' }}>
            {ContractStatusRu[contract.status]}
          </p>
        </Button>
      </Menu.Target>

      <Menu.Dropdown>
        {statuses
          .map((status) =>
            <Menu.Item className='text-center' key={status.id} onClick={() => handleChangeStatus(contract.id, status.value)}>
              {status.label}
            </Menu.Item>
          )
        }
      </Menu.Dropdown>
    </Menu>
  );
};