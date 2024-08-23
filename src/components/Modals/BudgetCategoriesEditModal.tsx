import { Modal, Button, Image } from "react-bootstrap";

interface BudgetCategoriesEditModalProps {
  show: boolean;
  onHide: () => void;
}

function BudgetCategoriesEditModal(props: BudgetCategoriesEditModalProps) {
  const { show, onHide } = props;

  return (
    <Modal
      show={show}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Modal heading
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Image
          src="https://preview.redd.it/pancake-bunny-bottom-text-v0-rcgkch50s1h81.jpg?auto=webp&s=fe12bf42a5fabfd1018e3ba60b979b9a0ae1c966"
          fluid
        />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default BudgetCategoriesEditModal;
