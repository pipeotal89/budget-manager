import { Modal, Button } from "react-bootstrap";
import { ReactNode } from "react";

import "./BudgetModals.css";

interface BudgetModalProps {
  showModal: boolean;
  onSave: () => void;
  onHide: () => void;
  title: string;
  children: ReactNode;
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
