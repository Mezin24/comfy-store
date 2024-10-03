import { BsCart3, BsMoonFill, BsSunFill } from 'react-icons/bs';
import { FaBarsStaggered } from 'react-icons/fa6';
import { NavLink } from 'react-router-dom';
import { NavLinks } from './NavLinks';
import { useEffect, useState } from 'react';

const themes = {
  coffee: 'coffee',
  winter: 'winter',
};

const LS_THEME_KEY = 'comfy-theme';

const getInitialTheme = () =>
  localStorage.getItem(LS_THEME_KEY) || themes.coffee;

export const Navbar = () => {
  const [theme, setTheme] = useState(() => getInitialTheme());

  const handleChange = () => {
    const newTheme = theme === themes.coffee ? themes.winter : themes.coffee;
    setTheme(newTheme);
  };

  useEffect(() => {
    document.querySelector('html').setAttribute('data-theme', theme);
    localStorage.setItem(LS_THEME_KEY, theme);
  }, [theme]);

  return (
    <nav className='bg-base-200 '>
      <div className='navbar align-element'>
        <div className='navbar-start'>
          {/* TITLE */}
          <NavLink
            to='/'
            className='hidden lg:flex btn btn-primary text-3xl items-center'
          >
            C
          </NavLink>
          {/* DROPDOWN */}
          <details className='dropdown'>
            <summary tabIndex={0} className='btn btn-ghost lg:hidden'>
              <FaBarsStaggered className='h-6 w-6' />
            </summary>
            <ul
              tabIndex={0}
              className='menu menu-sm dropdown-content bg-base-200 rounded-box z-[1]  p-2 shadow mt-3 w-52'
            >
              <NavLinks />
            </ul>
          </details>
        </div>
        <div className='navbar-center hidden lg:flex'>
          <ul className='menu menu-horizontal'>
            <NavLinks />
          </ul>
        </div>
        <div className='navbar-end'>
          <label className='swap swap-rotate'>
            <input type='checkbox' onChange={handleChange} />
            <BsSunFill className='swap-on h-4 w-4 fill-current' />
            <BsMoonFill className='swap-off h-4 w-4 fill-current' />
          </label>

          <NavLink to='/cart' className='btn btn-ghost btn-circle btn-md ml-4'>
            <div className='indicator'>
              <BsCart3 className='h-6 w-6' />
              <span className='badge badge-sm badge-primary indicator-item'>
                8
              </span>
            </div>
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
