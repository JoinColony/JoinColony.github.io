/* @flow */
import type { RouteProps } from '@reach/router';

import React from 'react';
import { withPrefix } from 'gatsby';
import { Location } from '@reach/router';
import { compose, fromRenderProps } from 'recompose';

import type { Project } from '../../types';

import styles from './Header.module.css';
import Link from '../Link';
import Search from '../Search';

type Props = RouteProps & {
  projects: Array<Project>,
};

type State = {
  isNavExpanded: boolean,
  isScrolled: boolean,
};

class Header extends React.Component<Props, State> {
  state = {
    isNavExpanded: false,
    isScrolled: false,
  };

  componentDidMount() {
    const { isScrolled } = this.state;
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 0) {
        if (isScrolled) return;
        this.setState({ isScrolled: true });
      } else {
        this.setState({ isScrolled: false });
      }
    });
  }

  isProjectActive = (project: Project) => {
    const { location } = this.props;
    return location && location.pathname.split('/').indexOf(project.slug) > -1;
  };

  handleCloseNavigation = () => {
    this.setState({
      isNavExpanded: false,
    });
  };

  handleToggleNavigation = () => {
    const { isNavExpanded } = this.state;
    this.setState({
      isNavExpanded: !isNavExpanded,
    });
  };

  render() {
    const { projects } = this.props;
    const { isNavExpanded, isScrolled } = this.state;

    const activeProject = projects.find(this.isProjectActive);
    const selectedProject = (activeProject && activeProject.name) || '';

    const navLinks = projects.map(project => (
      <Link
        key={project.slug}
        href={`/${project.slug}/${project.entryPoint}/`}
        className={styles.projectLink}
        activeClassName={styles.projectLinkActive}
        onClick={this.handleCloseNavigation}
        isActive={() =>
          activeProject &&
          selectedProject &&
          project.slug === activeProject.slug
        }
      >
        {project.name}
      </Link>
    ));

    return (
      <div id="header" className={styles.container}>
        <header
          className={styles.header}
          aria-expanded={isNavExpanded}
          role="navigation"
          style={
            isScrolled ? { boxShadow: '0 0 10px 1px rgb(238, 238, 238)' } : null
          }
        >
          <div className={styles.headerContent}>
            <div className={styles.wrapper}>
              <Link
                href="/"
                className={styles.logo}
                onClick={this.handleCloseNavigation}
              >
                <img
                  src={withPrefix('/img/colonyDocs_navy.svg')}
                  alt="Colony Docs"
                />
              </Link>
              <div className={styles.mainNavigation}>
                <div className={styles.emptySpace} />
                <nav className={styles.navigation}>
                  <button className={styles.navigationButton} type="button">
                    {'Products'}
                    <i className={styles.navigationArrow} />
                  </button>
                  <div
                    id="navigationContent"
                    className={styles.navigationContent}
                  >
                    {navLinks}
                  </div>
                </nav>
                <ul className={styles.secondaryLinkList}>
                  <li className={styles.secondaryLinkListItem}>
                    <Link
                      className={styles.repoLink}
                      href={`https://github.com/JoinColony/${selectedProject}`}
                    >
                      <span className={styles.hide} aria-hidden>
                        {selectedProject || 'Colony'} on GitHub
                      </span>
                      <svg
                        className={styles.repoIcon}
                        viewBox="0 0 32 32"
                        role="img"
                        aria-label="GitHub"
                      >
                        <title>{selectedProject || 'Colony'} on GitHub</title>
                        <use
                          xlinkHref={withPrefix(
                            '/img/social_github.svg#social_github',
                          )}
                        />
                      </svg>
                    </Link>
                  </li>
                  <li className={styles.secondaryLinkListItem}>
                    <Link
                      className={styles.repoLink}
                      href={`https://gitter.im/JoinColony/${selectedProject}`}
                    >
                      <span className={styles.hide} aria-hidden>
                        {selectedProject || 'Colony'} on Gitter
                      </span>
                      <svg
                        className={styles.repoIcon}
                        viewBox="0 0 32 32"
                        role="img"
                        aria-label="Gitter"
                      >
                        <title>{selectedProject || 'Colony'} on Gitter</title>
                        <use
                          xlinkHref={withPrefix(
                            '/img/social_gitter.svg#social_gitter',
                          )}
                        />
                      </svg>
                    </Link>
                  </li>
                  <li className={styles.secondaryLinkListItem}>
                    <Link
                      className={styles.repoLink}
                      href="https://build.colony.io"
                    >
                      <span className={styles.hide} aria-hidden>
                        {'Colony on Discourse'}
                      </span>
                      <svg
                        className={styles.repoIcon}
                        viewBox="0 0 32 32"
                        role="img"
                        aria-label="Discourse"
                      >
                        <title>Colony on Discourse</title>
                        <use
                          xlinkHref={withPrefix(
                            '/img/social_discourse.svg#social_discourse',
                          )}
                        />
                      </svg>
                    </Link>
                  </li>
                </ul>
                <div className={styles.searchContainer}>
                  <Search />
                </div>
              </div>
              <button
                type="button"
                className={styles.mobileIcon}
                aria-hidden
                onClick={this.handleToggleNavigation}
              >
                <span className={styles.mobileIconLine} />
                <span className={styles.mobileIconLine} />
                <span className={styles.mobileIconLine} />
                <span className={styles.mobileIconLine} />
              </button>
            </div>
          </div>
        </header>
      </div>
    );
  }
}

const enhance = compose(
  // $FlowFixMe
  fromRenderProps(Location, locationProps => ({ ...locationProps })),
);

export default enhance(Header);
