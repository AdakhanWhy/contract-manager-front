import type { RefObject } from "react"
import { useFetchContractTemplateById } from "../services/fetchContractTemplateById"
import type { ContractEntity } from "../types/entities/contract.entity"

type Props = {
  ref?: RefObject<HTMLDivElement | null>,
  contract: ContractEntity
}

export const ContractTemplate = ({ ref, contract }: Props) => {
  const [contractTemplate] = useFetchContractTemplateById(contract.templateId);
  if (!contractTemplate) return null;
  return (
    <div ref={ref} className="bg-white p-8 rounded shadow max-w-3xl mx-auto font-serif text-black leading-relaxed">
      <div className="flex justify-between items-start mb-6">
        <div>
          <img src="/path/to/logo.png" alt="Logo" className="h-8" />
        </div>
        <div className="text-sm text-right">
          <p>Приложение №1</p>
          <p>к Общим условиям оказания</p>
          <p>банковских услуг физическим лицам</p>
        </div>
      </div>

      <h1 className="text-center text-lg font-bold mb-4">ПРАВИЛА ПОЛЬЗОВАНИЯ УСЛУГОЙ</h1>
      <p className="text-center italic mb-6">(Приложение)</p>

      <h2 className="font-bold mb-2">{contract.title}</h2>

      <p className="italic mb-6">{contractTemplate.name}</p>

      <p className="mb-6">
        {contractTemplate.content}
      </p>
    </div>
  )
}