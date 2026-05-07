import { useMDXComponents as getThemeComponents } from 'nextra-theme-docs'
import { Preview } from '@/components/preview'
import { CodeBlock } from '@/components/code-block'

const themeComponents = getThemeComponents()

export function useMDXComponents(components) {
  return {
    ...themeComponents,
    Preview,
    pre: CodeBlock,
    ...components
  }
}
