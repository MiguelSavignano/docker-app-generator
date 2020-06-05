import React from 'react';
import AppModes from './config';
import { useStateValue, initializeFormData } from './state';

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

const ModeLink = ({ name, label, ...rest }) => {
  const [, dispatch] = useStateValue();

  return (
    <a
      {...rest}
      className="navbar-item"
      onClick={() => {
        const form = initializeFormData(AppModes[name]);
        dispatch({ form, appMode: AppModes[name] });
      }}
    >
      {label}
    </a>
  );
};

const Logo = () => (
  <img
    src="https://1067ec1jtn84131jsj2jmuv3-wpengine.netdna-ssl.com/wp-content/uploads/2017/11/icons-docker-lrg.png"
    width={50}
    height={50}
  />
);

const GithubRibbon = () => (
  <a
    class="github-fork-ribbon"
    href="https://github.com/MiguelSavignano/docker-app-generator"
    data-ribbon="Fork me on GitHub"
    title="Fork me on GitHub"
  >
    Fork me on GitHub
  </a>
);

export const Navbar = () => {
  return (
    <nav
      className="navbar is-fixed-top is-link"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand">
        <a className="navbar-item" href="https://bulma.io">
          <Logo />
        </a>
        <a
          role="button"
          className="navbar-burger burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </a>
      </div>
      <div id="navbarBasicExample" className="navbar-menu">
        <div className="navbar-start">
          {modeLinks.map(({ name, label }) => (
            <ModeLink className="navbar-item">{label}</ModeLink>
          ))}
        </div>
        <div className="navbar-end">
          <div className="navbar-item">
            <GithubRibbon />
          </div>
        </div>
      </div>
    </nav>
  );
};
