import { readFile, writeFile, stat } from 'node:fs/promises'
import { join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = fileURLToPath(new URL('..', import.meta.url))
const CONTENT_DIR = join(ROOT, 'content')
const OUTPUT = join(ROOT, 'public', 'llms.txt')
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

const readString = (src, i) => {
  const quote = src[i++]
  const start = i
  while (i < src.length && src[i] !== quote) {
    if (src[i] === '\\') i++
    i++
  }
  return [src.slice(start, i), i + 1]
}

const readBalanced = (src, i) => {
  const start = i
  let depth = 0
  for (; i < src.length; i++) {
    const c = src[i]
    if (c === "'" || c === '"') {
      [, i] = readString(src, i)
      i--
    } else if (c === '{') depth++
    else if (c === '}') {
      depth--
      if (depth === 0) return [src.slice(start + 1, i), i + 1]
    }
  }
  return ['', i]
}

const parseMeta = (source) => {
  const open = source.indexOf('{', source.indexOf('='))
  if (open === -1) return []
  const [body] = readBalanced(source, open)
  const entries = []
  let i = 0
  while (i < body.length) {
    while (i < body.length && /[\s,]/.test(body[i])) i++
    if (i >= body.length) break

    let key
    if (body[i] === "'" || body[i] === '"') [key, i] = readString(body, i)
    else {
      const s = i
      while (i < body.length && /[\w-]/.test(body[i])) i++
      key = body.slice(s, i)
    }
    if (!key) { i++; continue }

    while (i < body.length && /\s/.test(body[i])) i++
    if (body[i] !== ':') continue
    i++
    while (i < body.length && /\s/.test(body[i])) i++

    let label = key
    let hidden = false
    if (body[i] === "'" || body[i] === '"') {
      [label, i] = readString(body, i)
    } else if (body[i] === '{') {
      let obj
      [obj, i] = readBalanced(body, i)
      const t = obj.match(/\btitle\s*:\s*(['"])((?:\\.|(?!\1).)*)\1/)
      if (t) label = t[2]
      const d = obj.match(/\bdisplay\s*:\s*(['"])((?:\\.|(?!\1).)*)\1/)
      if (d && d[2] === 'hidden') hidden = true
    } else {
      while (i < body.length && body[i] !== ',') i++
      continue
    }

    if (!hidden) entries.push([key, label])
  }
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

const collectSection = async (dir, prefix, headingLevel = 3) => {
  const meta = await readMeta(dir)
  const pageLines = []
  const subSections = []
  for (const [key, label] of meta) {
    const mdxPath = join(dir, `${key}.mdx`)
    const subDir = join(dir, key)
    if (await isFile(mdxPath)) {
      pageLines.push(await pageLine(dir, key, label, prefix))
    } else if (await isDir(subDir)) {
      const subLines = await collectSection(subDir, `${prefix}${key}/`, headingLevel + 1)
      if (subLines.length) subSections.push({ label, subLines })
    }
  }
  const lines = [...pageLines]
  for (const { label, subLines } of subSections) {
    lines.push('', `${'#'.repeat(headingLevel)} ${label}`, '', ...subLines)
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

  const out = [`# ${rootFm.title === 'Overview' ? 'Standards' : rootFm.title || 'Standards'}`, '']
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
