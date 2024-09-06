import { useState } from "react";

import BudgetModal from "./BudgetModals";
import CurrencyInput from "react-currency-input-field";
import MoneyFormat from "../MoneyFormat/MoneyFormat";

import "./BudgetModals.css";

interface BudgetProductsPayModalProps {
  showProductsPayModal: boolean;
  _id: string;
  value: number;
  onProductsPayHide: () => void;
  onProductsPaySave: (_id: string, value: number, paid: string) => void;
}

function BudgetProductsPayModal(props: BudgetProductsPayModalProps) {
  const {
    showProductsPayModal,
    _id,
    value,
    onProductsPaySave,
    onProductsPayHide,
  } = props;

  const [paid, setPaid] = useState("");

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPaid(e.target.value);
  };

  return (
    <BudgetModal
      title="Pay Product"
      showModal={showProductsPayModal}
      onHide={onProductsPayHide}
      onSave={() => onProductsPaySave(_id, value, paid)}
    >
      <div className="modal-field">
        <text>
          Value: <MoneyFormat value={value} />
        </text>
      </div>
      <div className="modal-field">
        <text className="modal-label">Paid:</text>
        <CurrencyInput
          className="modal-input"
          placeholder="Insert..."
          prefix="$"
          name="paid"
          onChange={onInputChange}
        />
      </div>
    </BudgetModal>
  );
}

export default BudgetProductsPayModal;
