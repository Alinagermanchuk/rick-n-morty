import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSigninCheck } from "reactfire";
import { PROJECT_NAME } from "../constants";
import { signOutFirebaseUser } from "../services/firebase";
import { useAuth } from "reactfire";

export function Header() {
  const { data, status } = useSigninCheck();
  const auth = useAuth();
  const isLoggedIn = status === "success" && data.signedIn;

  async function logoutHandler() {
    await signOutFirebaseUser(auth);
  }

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          {PROJECT_NAME}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/profile" disabled={!isLoggedIn}>
              Profile
            </Nav.Link>
          </Nav>
          <Nav>
            {!isLoggedIn ? (
              <>
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/register">
                  Register
                </Nav.Link>
              </>
            ) : (
              <Nav.Link onClick={logoutHandler}>Logout</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
