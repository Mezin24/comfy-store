import { Link } from 'react-router-dom';

export const Header = () => {
  return (
    <header className='bg-neutral text-neutral-content py-2'>
      <div className='align-element flex justify-center items-center sm:justify-end'>
        <div className='flex justify-center items-center gap-x-6'>
          <Link to='/login' className='link link-hover text-xs sm:text-sm'>
            Sign In / Guest
          </Link>
          <Link to='/register' className='link link-hover text-xs sm:text-sm'>
            Create Account
          </Link>
        </div>
      </div>
    </header>
  );
};
