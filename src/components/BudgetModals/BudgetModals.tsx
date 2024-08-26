import { Modal, Button } from "react-bootstrap";
import { ReactNode, useState } from "react";

import "./BudgetModals.css";

interface BudgetModalProps {
  showModal: boolean;
  onSave: () => void;
  onHide: () => void;
  title: string;
  children: ReactNode;
}

interface BudgetCategoriesAddModalProps {
  showCategoriesAddModal: boolean;
  onCategoriesAddHide: () => void;
  onCategoriesAddSave: (value: string) => void;
}

interface BudgetCategoriesEditModalProps {
  categoriesEditTitle: string;
  showCategoriesEditModal: boolean;
  onCategoriesEditHide: () => void;
  onCategoriesEditSave: (value: string) => void;
}

function BudgetModal(props: BudgetModalProps) {
  const { showModal, onSave, onHide, title, children } = props;

  return (
    <Modal
      show={showModal}
      aria-labelledby="budget-categories-edit-modal-title"
      centered
    >
      <Modal.Header id="budget-categories-edit-modal-header">
        <Modal.Title id="budget-categories-edit-modal-title">
          {title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
      <Modal.Footer>
        <Button variant="custom-green" onClick={onSave}>
          Save
        </Button>
        <Button variant="custom-green" onClick={onHide}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default BudgetModal;

export function BudgetCategoriesAddModal(props: BudgetCategoriesAddModalProps) {
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

export function BudgetCategoriesEditModal(
  props: BudgetCategoriesEditModalProps
) {
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
