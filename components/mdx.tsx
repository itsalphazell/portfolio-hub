import type { MDXComponents } from "mdx/types";

export const mdxComponents: MDXComponents = {
  h2: (props) => <h2 {...props} />,
  p: (props) => <p {...props} />,
  ul: (props) => <ul {...props} />,
  li: (props) => <li {...props} />,
  a: (props) => <a {...props} rel="noreferrer" target="_blank" />,
  strong: (props) => <strong className="font-semibold text-ink" {...props} />,
};
