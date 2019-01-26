import React from 'react'
import Link, { withPrefix } from 'gatsby-link'
import { Location } from '@reach/router'
import { compose, fromRenderProps } from 'recompose'

import styles from './Header.module.css'
import Search from '../Search'

class Header extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isNavExpanded: false,
      isScrolled: false,
    }

    this.handleCloseNavigation = this.handleCloseNavigation.bind(this)
    this.handleToggleNavigation = this.handleToggleNavigation.bind(this)
    this.isProjectActive = this.isProjectActive.bind(this)
  }

  componentDidMount() {
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 0) {
        if (this.state.isScrolled) return
        this.setState({ isScrolled: true })
      } else {
        this.setState({ isScrolled: false })
      }
    })
  }

  isProjectActive(project) {
    return (
      this.props.location.pathname &&
      this.props.location.pathname.split('/').indexOf(project.slug) > -1
    )
  }

  handleCloseNavigation() {
    this.setState({
      isNavExpanded: false,
    })
  }

  handleToggleNavigation() {
    this.setState({
      isNavExpanded: !this.state.isNavExpanded,
    })
  }

  render() {
    const { projects } = this.props

    const activeProject = projects.find(this.isProjectActive)
    const selectedProject = (activeProject && activeProject.name) || ''

    const navLinks = projects.map(project => {
      return (
        <Link
          key={project.slug}
          to={`/${project.slug}/${project.entryPoint}/`}
          className={styles.projectLink}
          activeClassName={styles.projectLinkActive}
          onClick={this.handleCloseNavigation}
          isActive={() =>
            selectedProject && project.slug === activeProject.slug
          }
        >
          {project.name}
        </Link>
      )
    })

    return (
      <div id="header" className={styles.container}>
        <header
          className={styles.header}
          aria-expanded={this.state.isNavExpanded}
          role="navigation"
          style={
            this.state.isScrolled
              ? { boxShadow: '0 0 10px 1px rgb(238, 238, 238)' }
              : null
          }
        >
          <div className={styles.headerContent}>
            <div className={styles.wrapper}>
              <Link
                to="/"
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
                  <button className={styles.navigationButton}>
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
                    <a
                      className={styles.repoLink}
                      href={`https://github.com/JoinColony/${selectedProject}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className={styles.hide} aria-hidden={true}>
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
                            '/img/social_github.svg#social_github'
                          )}
                        />
                      </svg>
                    </a>
                  </li>
                  <li className={styles.secondaryLinkListItem}>
                    <a
                      className={styles.repoLink}
                      href={`https://gitter.im/JoinColony/${selectedProject}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className={styles.hide} aria-hidden={true}>
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
                            '/img/social_gitter.svg#social_gitter'
                          )}
                        />
                      </svg>
                    </a>
                  </li>
                  <li className={styles.secondaryLinkListItem}>
                    <a
                      className={styles.repoLink}
                      href="https://build.colony.io"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className={styles.hide} aria-hidden={true}>
                        {'Colony on Discourse'}
                      </span>
                      <svg
                        className={styles.repoIcon}
                        viewBox="0 0 32 32"
                        role="img"
                        aria-label="Discourse"
                      >
                        <title>{'Colony on Discourse'}</title>
                        <use
                          xlinkHref={withPrefix(
                            '/img/social_discourse.svg#social_discourse'
                          )}
                        />
                      </svg>
                    </a>
                  </li>
                </ul>
                <div className={styles.searchContainer}>
                  <Search />
                </div>
              </div>
              <button
                type="button"
                className={styles.mobileIcon}
                aria-hidden={true}
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
    )
  }
}

const enhance = compose(
  fromRenderProps(Location, locationProps => ({ ...locationProps }))
)

export default enhance(Header)
