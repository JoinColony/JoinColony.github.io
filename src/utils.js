export const orderDocs = (a, b) => a.frontmatter.order - b.frontmatter.order;

export const orderSections = (sectionOrder, a, b) => {
  if (sectionOrder) {
    return sectionOrder.indexOf(a.slug) - sectionOrder.indexOf(b.slug);
  }
};
