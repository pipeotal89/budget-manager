import { useState } from "react";

import BudgetModal from "./BudgetModals";
import CurrencyInput from "react-currency-input-field";

import "./BudgetModals.css";

interface BudgetProductsAddModalProps {
  showProductsAddModal: boolean;
  onProductsAddHide: () => void;
  onProductsAddSave: (product: object) => void;
}

export interface productsInterface {
  name?: string;
  value?: string;
  vendor?: string;
}

function BudgetProductsAddModal(props: BudgetProductsAddModalProps) {
  const { showProductsAddModal, onProductsAddSave, onProductsAddHide } = props;

  const [product, setProduct] = useState<productsInterface>();

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  return (
    <BudgetModal
      title="Add New Category"
      showModal={showProductsAddModal}
      onHide={onProductsAddHide}
      onSave={() => onProductsAddSave(product!)}
    >
      <div className="modal-field">
        <text className="modal-label">Name:</text>
        <input
          className="modal-input"
          placeholder="Insert..."
          name="name"
          onChange={onInputChange}
        />
      </div>
      <div className="modal-field">
        <text className="modal-label">Value:</text>
        <CurrencyInput
          className="modal-input"
          prefix="$"
          name="value"
          onChange={onInputChange}
          placeholder="Insert..."
        />
      </div>
      <div className="modal-field">
        <text className="modal-label">Vendor:</text>
        <input
          className="modal-input"
          placeholder="Insert..."
          name="vendor"
          onChange={onInputChange}
        />
      </div>
    </BudgetModal>
  );
}

export default BudgetProductsAddModal;
