import { Container, Pagination as BPagination } from "react-bootstrap";

export function Pagination({ totalPages, currentPage, filterActions }) {
  const {
    increaseCurrentPageHandler,
    decreaseCurrentPageHandler,
    setCurrentPageHandler,
  } = filterActions;

  if (totalPages === 0) {
    return;
  }

  return (
    <Container className="d-flex justify-content-md-center">
      <BPagination>
        <BPagination.First
          color="light"
          onClick={decreaseCurrentPageHandler}
          disabled={currentPage === 1}
        />

        <BPagination.Item
          active={currentPage === 1 ? true : false}
          onClick={setCurrentPageHandler.bind(null, 1)}
        >
          {1}
        </BPagination.Item>

        {currentPage <= 3 && totalPages > 2 && (
          <BPagination.Item
            active={currentPage === 2}
            onClick={setCurrentPageHandler.bind(null, 2)}
          >
            2
          </BPagination.Item>
        )}

        {currentPage <= 3 && totalPages > 3 && (
          <BPagination.Item
            active={currentPage === 3}
            onClick={setCurrentPageHandler.bind(null, 3)}
          >
            3
          </BPagination.Item>
        )}

        {currentPage > 3 && <BPagination.Ellipsis disabled />}

        {3 < currentPage && currentPage < totalPages - 2 && (
          <BPagination.Item
            active
            onClick={setCurrentPageHandler.bind(null, currentPage)}
          >
            {currentPage}
          </BPagination.Item>
        )}

        {currentPage >= totalPages - 2 && totalPages > 3 && (
          <>
            <BPagination.Item
              active={currentPage === totalPages - 2}
              onClick={setCurrentPageHandler.bind(null, totalPages - 2)}
            >
              {totalPages - 2}
            </BPagination.Item>
            <BPagination.Item
              active={currentPage === totalPages - 1}
              onClick={setCurrentPageHandler.bind(null, totalPages - 1)}
            >
              {totalPages - 1}
            </BPagination.Item>
          </>
        )}

        {currentPage < totalPages - 2 && <BPagination.Ellipsis disabled />}

        {totalPages !== 1 && (
          <BPagination.Item
            active={currentPage === totalPages ? true : false}
            onClick={setCurrentPageHandler.bind(null, totalPages)}
          >
            {totalPages}
          </BPagination.Item>
        )}

        <BPagination.Last
          onClick={increaseCurrentPageHandler}
          disabled={currentPage === totalPages}
        />
      </BPagination>
    </Container>
  );
}
