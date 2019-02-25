/* @flow */
import { DEFAULT_LOCALE } from '~i18nConfig';
import type { Doc, Project, Section } from '~types';

type ProjectEdge = {|
  node: Project,
|};

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

export const getSectionsForLocale = (
  project: Project,
  locale: string,
): Array<Section> => {
  let { sectionOrder: sectionOrderForLocale } = project;
  if (locale !== DEFAULT_LOCALE && project.sectionTranslations) {
    const localeTranslatedSectionConfig = project.sectionTranslations.find(
      ({ locale: sectionTranslationLocale }) =>
        sectionTranslationLocale === locale,
    );
    if (
      localeTranslatedSectionConfig &&
      localeTranslatedSectionConfig.sectionOrder
    ) {
      sectionOrderForLocale = localeTranslatedSectionConfig.sectionOrder;
    }
  }
  return project.sections
    .filter(({ docs }) =>
      docs.some(({ fields: { locale: docLocale } }) => docLocale === locale),
    )
    .sort(orderSections.bind(null, sectionOrderForLocale));
};

export const getDocsForLocale = (
  docs: Array<Doc>,
  locale: string,
): Array<Doc> =>
  docs.filter(doc => {
    const {
      fields: { locale: docLocale },
    } = doc;
    if (docLocale === locale) {
      return true;
    }
    return false;
  });

export const getProjectEntryPoint = (
  project: Project,
  locale: string,
): string => {
  let docSections = getSectionsForLocale(project, locale);
  if (!docSections || !docSections.length) {
    docSections = getSectionsForLocale(project, DEFAULT_LOCALE);
  }
  const { docs: firstSectionDocs } = docSections[0];
  let docsForLocale = getDocsForLocale(firstSectionDocs, locale);
  if (!docsForLocale || !docsForLocale.length) {
    docsForLocale = getDocsForLocale(firstSectionDocs, DEFAULT_LOCALE);
  }
  const firstDoc = docsForLocale.sort(orderDocs)[0];
  return (firstDoc && firstDoc.fields && firstDoc.fields.slug) || '/';
};

export const transformProjectData = (edge: ProjectEdge, locale: string) => {
  const edgeNode = edge.node;
  edgeNode.entryPoint = getProjectEntryPoint(edge.node, locale);
  return edgeNode;
};
