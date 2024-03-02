import { ComponentPropsWithoutRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

type LinkButtonProps = ComponentPropsWithoutRef<typeof Link>;

function LinkButton({ ...props }: LinkButtonProps) {
  const navigate = useNavigate();
  const buttonClasses =
    'text-sm text-blue-500 hover:text-blue-600 hover:underline';

  if (props.to === '-1') {
    return (
      <button className={buttonClasses} onClick={() => navigate(-1)}>
        {props.children}
      </button>
    );
  }
  return (
    <Link {...props} className={buttonClasses}>
      {props.children}
    </Link>
  );
}

export default LinkButton;
