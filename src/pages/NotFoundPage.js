import { Button, Container, Row } from "react-bootstrap";
import { ArrowDown } from "react-bootstrap-icons";
import { Link } from "react-router-dom";

export function NotFoundPage() {
  return (
    <Container className="mb-5 mt-6" style={{ marginTop: "100px" }}>
      <Row className="justify-content-center">
        <h2 style={{ textAlign: "center" }}>Page does not exist</h2>
      </Row>
      <Row className="justify-content-center mt-3">
        <ArrowDown />
      </Row>
      <Row className="justify-content-center">
        <Button
          className="my-4 w-25"
          as={Link}
          to="/"
          variant="outline-secondary"
        >
          Go to the Home Page
        </Button>
      </Row>
    </Container>
  );
}
