import { ChangeEvent, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router';

function SearchOrder() {
  const [query, setQuery] = useState<string>('');
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!query) return;

    navigate(`/order/${query}`);
    setQuery('');
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder='Search order #'
        value={query}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setQuery(e.target.value)
        }
      />
    </form>
  );
}

export default SearchOrder;
