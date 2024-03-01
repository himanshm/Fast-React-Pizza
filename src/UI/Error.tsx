import {
  useNavigate,
  useRouteError,
  isRouteErrorResponse,
} from 'react-router-dom';

function ErrorPage() {
  const navigate = useNavigate();
  const error = useRouteError();
  console.log(error);
  let errorMessage: string;

  if (isRouteErrorResponse(error)) {
    // error is type `ErrorResponse`
    // errorMessage = error.error?.message || error.statusText;
    errorMessage = error.statusText;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  } else if (typeof error === 'string') {
    errorMessage = error;
  } else {
    console.error(error);
    errorMessage = 'Unknown error';
  }

  return (
    <div>
      <h1>Something went wrong 😢</h1>
      <p>{errorMessage}</p>
      <button onClick={() => navigate(-1)}>&larr; Go back</button>
    </div>
  );
}

export default ErrorPage;
