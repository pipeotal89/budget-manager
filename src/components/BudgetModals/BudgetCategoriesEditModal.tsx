import { useState } from "react";

import BudgetModal from "./BudgetModals";

import "./BudgetModals.css";

interface BudgetCategoriesEditModalProps {
  categoriesEditTitle: string;
  showCategoriesEditModal: boolean;
  onCategoriesEditHide: () => void;
  onCategoriesEditSave: (categoryName: string) => void;
}

function BudgetCategoriesEditModal(props: BudgetCategoriesEditModalProps) {
  const {
    categoriesEditTitle,
    showCategoriesEditModal,
    onCategoriesEditSave,
    onCategoriesEditHide,
  } = props;

  const [categoryName, setCategoryName] = useState("");

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategoryName(e.target.value);
  };

  return (
    <BudgetModal
      title="Edit Category"
      showModal={showCategoriesEditModal}
      onHide={onCategoriesEditHide}
      onSave={() => onCategoriesEditSave(categoryName)}
    >
      <text className="modal-label">Name:</text>
      <input
        className="modal-input"
        placeholder="Insert..."
        name="categoryName"
        onChange={onInputChange}
        defaultValue={categoriesEditTitle}
      />
    </BudgetModal>
  );
}

export default BudgetCategoriesEditModal;
