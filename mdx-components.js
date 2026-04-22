import { useMDXComponents as getThemeComponents } from 'nextra-theme-docs'
import { Preview } from '@/components/preview'

const themeComponents = getThemeComponents()

export function useMDXComponents(components) {
  return {
    ...themeComponents,
    Preview,
    ...components
  }
}
