import { readFile, writeFile, stat } from 'node:fs/promises'
import { join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = fileURLToPath(new URL('..', import.meta.url))
const CONTENT_DIR = join(ROOT, 'content')
const OUTPUT = join(ROOT, 'llms.txt')
const SITE_URL = process.env.SITE_URL?.replace(/\/$/, '') ?? ''

const parseFrontmatter = (source) => {
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---/)
  if (!match) return {}
  const data = {}
  for (const line of match[1].split(/\r?\n/)) {
    const kv = line.match(/^(\w+):\s*(.*)$/)
    if (!kv) continue
    data[kv[1]] = kv[2].replace(/^['"]|['"]$/g, '').trim()
  }
  return data
}

const parseMeta = (source) => {
  const body = source.match(/\{([\s\S]*)\}/)?.[1] ?? ''
  const entries = []
  const re = /['"]?([\w-]+)['"]?\s*:\s*(['"])((?:\\.|(?!\2).)*)\2/g
  let m
  while ((m = re.exec(body)) !== null) entries.push([m[1], m[3]])
  return entries
}

const readMeta = async (dir) => {
  try {
    return parseMeta(await readFile(join(dir, '_meta.ts'), 'utf8'))
  } catch {
    return []
  }
}

const readPage = async (file) => {
  try {
    return parseFrontmatter(await readFile(file, 'utf8'))
  } catch {
    return {}
  }
}

const isDir = (p) => stat(p).then((s) => s.isDirectory()).catch(() => false)
const isFile = (p) => stat(p).then((s) => s.isFile()).catch(() => false)

const urlFor = (slug) => {
  const path = slug ? `/${slug}` : '/'
  return `${SITE_URL}${path}`
}

const pageLine = async (dir, key, label, prefix) => {
  const fm = await readPage(join(dir, `${key}.mdx`))
  const slug = key === 'index' ? prefix.replace(/\/$/, '') : `${prefix}${key}`
  const title = fm.title || label
  const desc = fm.description ? `: ${fm.description}` : ''
  return `- [${title}](${urlFor(slug)})${desc}`
}

const collectSection = async (dir, prefix) => {
  const meta = await readMeta(dir)
  const lines = []
  for (const [key, label] of meta) {
    if (await isFile(join(dir, `${key}.mdx`))) {
      lines.push(await pageLine(dir, key, label, prefix))
    }
  }
  return lines
}

const main = async () => {
  const rootFm = await readPage(join(CONTENT_DIR, 'index.mdx'))
  const rootMeta = await readMeta(CONTENT_DIR)

  const topPages = []
  const sections = []

  for (const [key, label] of rootMeta) {
    if (await isFile(join(CONTENT_DIR, `${key}.mdx`))) {
      topPages.push(await pageLine(CONTENT_DIR, key, label, ''))
    } else if (await isDir(join(CONTENT_DIR, key))) {
      const items = await collectSection(join(CONTENT_DIR, key), `${key}/`)
      if (items.length) sections.push({ label, items })
    }
  }

  const out = [`# ${rootFm.title === 'Overview' ? 'Design System' : rootFm.title || 'Design System'}`, '']
  if (rootFm.description) out.push(`> ${rootFm.description}`, '')
  if (topPages.length) out.push('## Overview', '', ...topPages, '')
  for (const { label, items } of sections) out.push(`## ${label}`, '', ...items, '')

  const totalPages = topPages.length + sections.reduce((n, s) => n + s.items.length, 0)
  await writeFile(OUTPUT, out.join('\n'))
  console.log(`✓ wrote ${relative(ROOT, OUTPUT)} (${totalPages} pages)`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
