import { Spinner } from "react-bootstrap";

export function LoadingPage() {
  return (
    <div
      style={{
        position: "fixed",
        width: "100vw",
        height: "100vh",
        zIndex: "10",
        top: 0,
        left: 0,

        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff",
      }}
    >
      <Spinner animation="border" style={{ width: "100px", height: "100px" }} />
    </div>
  );
}
