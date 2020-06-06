import React, { useState } from 'react';
import AppModes from './config';
import { useStateValue, initializeFormData } from './state';
import classNames from 'classnames';
import './gh-fork-ribbon.css';
import logoImage from './docker-logo.png';

const modeLinks = [
  {
    name: 'react-create-app',
    label: 'React',
  },
  {
    name: 'rails',
    label: 'Rails',
  },
];

const Logo = () => (
  <img src={logoImage} alt="docker-logo" width={50} height={50} />
);

const Burger = (props) => (
  <a
    role="button"
    aria-label="menu"
    aria-expanded="false"
    data-target="navbarBasicExample"
    {...props}
  >
    <span aria-hidden="true" />
    <span aria-hidden="true" />
    <span aria-hidden="true" />
  </a>
);

const GithubRibbon = () => (
  <a
    className="github-fork-ribbon is-hidden-touch"
    href="https://github.com/MiguelSavignano/docker-app-generator"
    data-ribbon="Fork me on GitHub"
    title="Fork me on GitHub"
  >
    Fork me on GitHub
  </a>
);

export const Navbar = () => {
  const [active, toogleNavbar] = useState(false);
  const [, dispatch] = useStateValue();

  const onClickNavbatItem = ({ name }) => () => {
    const form = initializeFormData(AppModes[name]);
    dispatch({ form, appMode: AppModes[name] });
  };

  return (
    <nav
      className="navbar is-fixed-top is-link"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand">
        <a className="navbar-item" href="/">
          <Logo />
        </a>
        <Burger
          className={classNames('navbar-burger burger', {
            'is-active': active,
          })}
          onClick={() => toogleNavbar(!active)}
        />
      </div>
      <div
        id="navbarBasicExample"
        className={classNames('navbar-menu', {
          'is-active': active,
        })}
      >
        <div className="navbar-start">
          {modeLinks.map(({ name, label }) => (
            <a
              key={label}
              role="link"
              className="navbar-item"
              onClick={onClickNavbatItem({ name })}
            >
              {label}
            </a>
          ))}
        </div>
      </div>
      <div className="navbar-end">
        <div className="navbar-item">
          <GithubRibbon />
        </div>
      </div>
    </nav>
  );
};
