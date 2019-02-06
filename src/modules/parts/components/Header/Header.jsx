/* @flow */
import type { RouteProps } from '@reach/router';

import React from 'react';
import { withPrefix } from 'gatsby';
import { Location } from '@reach/router';
import { compose, fromRenderProps } from 'recompose';

import type { Project } from '~types';

import Button from '~core/Button';
import Icon from '~core/Icon';
import Link from '~core/Link';
import Search from '~parts/Search';

import styles from './Header.module.css';

type Props = RouteProps & {
  projects: Array<Project>,
};

type State = {
  isNavExpanded: boolean,
  isScrolled: boolean,
};

class Header extends React.Component<Props, State> {
  static displayName = 'parts.Header';

  state = {
    isNavExpanded: false,
    isScrolled: false,
  };

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = () => {
    const { isScrolled } = this.state;
    if (window.pageYOffset > 0) {
      if (isScrolled) return;
      this.setState({ isScrolled: true });
    } else {
      this.setState({ isScrolled: false });
    }
  };

  isProjectActive = (project: Project) => {
    const { location } = this.props;
    return location && location.pathname.startsWith(`/${project.slug}`);
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

    const activeLinkClassNames = `${styles.projectLink} ${
      styles.projectLinkActive
    }`;

    const navLinks = projects.map(project => (
      <Link
        key={project.slug}
        href={`/${project.slug}/${project.entryPoint}/`}
        onClick={this.handleCloseNavigation}
        getProps={() =>
          activeProject &&
          selectedProject &&
          project.slug === activeProject.slug
            ? { className: activeLinkClassNames }
            : { className: styles.projectLink }
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
                  <Button className={styles.navigationButton}>
                    {'Products'}
                    <i className={styles.navigationArrow} />
                  </Button>
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
                      <Icon
                        className={styles.repoIcon}
                        name="social_github"
                        title={`${selectedProject || 'Colony'} on GitHub`}
                      />
                    </Link>
                  </li>
                  <li className={styles.secondaryLinkListItem}>
                    <Link
                      className={styles.repoLink}
                      href={`https://gitter.im/JoinColony/${selectedProject}`}
                    >
                      <Icon
                        className={styles.repoIcon}
                        name="social_gitter"
                        title={`${selectedProject || 'Colony'} on Gitter`}
                      />
                    </Link>
                  </li>
                  <li className={styles.secondaryLinkListItem}>
                    <Link
                      className={styles.repoLink}
                      href="https://build.colony.io"
                    >
                      <Icon
                        className={styles.repoIcon}
                        name="social_discourse"
                        title="Colony on Discourse"
                      />
                    </Link>
                  </li>
                </ul>
                <div className={styles.searchContainer}>
                  <Search />
                </div>
              </div>
              <Button
                className={styles.mobileIcon}
                aria-hidden
                onClick={this.handleToggleNavigation}
              >
                <span className={styles.mobileIconLine} />
                <span className={styles.mobileIconLine} />
                <span className={styles.mobileIconLine} />
                <span className={styles.mobileIconLine} />
              </Button>
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
