/* @flow */
import type { Doc, Project, Section } from '~types';

type ProjectEdge = {
  node: Project,
};

export const orderDocs = (a: Doc, b: Doc): number =>
  a.frontmatter.order - b.frontmatter.order;

export const orderSections = (
  sectionOrder: Array<string>,
  a: Section,
  b: Section,
): number =>
  sectionOrder
    ? sectionOrder.indexOf(a.slug) - sectionOrder.indexOf(b.slug)
    : 0;

/*
 * Given a user's locale, get docs for said locale. If a doc doesn't exist for a locale,
 * a doc in the default locale (english) will be used instead.
 */
export const getDocsForLocale = (
  docs: Array<Doc>,
  locale: string,
): Array<Doc> => {
  return docs.filter(doc => {
    const {
      frontmatter: { locale: docLocale, order: docOrder, section: docSection },
    } = doc;
    // doc locale matches user locale
    if (docLocale === locale) {
      return true;
    }
    /* if the doc has no locale, see if any other docs exist that match the locale, section &
     * order (signifying same doc, different language). If none do, return default doc.
     */
    if (
      !docLocale &&
      !docs.some(someDoc => {
        const {
          frontmatter: {
            locale: someDocLocale,
            order: someDocOrder,
            section: someDocSection,
          },
        } = someDoc;
        return (
          someDocLocale === locale &&
          someDocOrder === docOrder &&
          someDocSection === docSection
        );
      })
    ) {
      return true;
    }
    return false;
  });
};

export const getProjectEntryPoint = (project: Project, locale: string) => {
  const firstSection = project.sections.sort((a, b) =>
    orderSections(project.sectionOrder, a, b),
  )[0];
  const firstDoc = getDocsForLocale(firstSection.docs, locale).sort(
    orderDocs,
  )[0];
  return firstDoc.fields.slug;
};

export const transformProjectData = (edge: ProjectEdge, locale: string) => {
  const edgeNode = edge.node;
  edgeNode.entryPoint = getProjectEntryPoint(edge.node, locale);
  return edgeNode;
};
