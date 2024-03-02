import { ChangeEvent, FormEvent, useState } from 'react';
import Button from '../../UI/Button';
import { useAppDispatch } from '../../store/hooks';
import { updateName } from './userSlice.ts';
import { useNavigate } from 'react-router-dom';

function CreateUser() {
  const [username, setUsername] = useState<string>('');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!username) return;

    dispatch(updateName(username));
    navigate('/menu');
  }

  return (
    <form onSubmit={handleSubmit}>
      <p className='mb-4 text-sm text-stone-600 md:text-base'>
        👋 Welcome! Please start by telling us your name:
      </p>

      <input
        type='text'
        placeholder='Your full name'
        value={username}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setUsername(e.target.value)
        }
        className='w-72 input mb-8'
      />

      {username !== '' && (
        <div>
          <Button btntype='primary'>Start ordering</Button>
        </div>
      )}
    </form>
  );
}

export default CreateUser;
