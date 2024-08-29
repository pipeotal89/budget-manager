import { useState } from "react";

import BudgetModal from "./BudgetModals";

import "./BudgetModals.css";

interface BudgetCategoriesAddModalProps {
  showCategoriesAddModal: boolean;
  onCategoriesAddHide: () => void;
  onCategoriesAddSave: (value: string) => void;
}

function BudgetCategoriesAddModal(props: BudgetCategoriesAddModalProps) {
  const { showCategoriesAddModal, onCategoriesAddSave, onCategoriesAddHide } =
    props;

  const [categoryName, setCategoryName] = useState("");

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategoryName(e.target.value);
  };

  return (
    <BudgetModal
      title="Add New Category"
      showModal={showCategoriesAddModal}
      onHide={onCategoriesAddHide}
      onSave={() => onCategoriesAddSave(categoryName)}
    >
      <text className="modal-label">Name:</text>
      <input
        className="modal-input"
        placeholder="Insert..."
        name="categoryName"
        onChange={onInputChange}
      />
    </BudgetModal>
  );
}

export default BudgetCategoriesAddModal;
