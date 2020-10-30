import cwe from "../data/cwe"
import { cweNetWorkType, cweNodeType, cweLinkType, cweType, selectorListType } from "../types"

export const getCwe = (_id: string | null): cweType =>{

  const r = cwe.filter(e => {
    return e.id === _id
  })

  if (r.length == 0) { return undefined}

  const {id, name, description} = r[0]

  return {
    id,
    name,
    description
  }
}

export const getSelectorList = (): selectorListType[] => {

  return cwe.map(row => {
    const {id, name, description} = row

    return {
      id,
      name,
      description
    }

  }, Array<selectorListType>());
}

export const createRelMap = ():Map<string,string[]> => {

  const r = new Map<string, string[]>()

  cwe.forEach(d => {
    const {id, child} = d
    child.forEach(c => {
      let a = r.get(c.CWE_ID)
      if (a === undefined) {a = []}
      a.push(id)
      r.set(c.CWE_ID, a)
    })
  })
  return r
}

const linkSearch = (id: string, r: Array<cweLinkType> = Array<cweLinkType>()) => {

  const cn = createNetWork()
  const t = cn.links.filter(d => {
    return id === d.source
  })

  if (t.length <= 0) {return r}

  t.forEach(d => {
    r.push(d)
    r = linkSearch(d.target, r)
  })

  return r
}

const nodeSearch = (links: Array<cweLinkType>) => {

  const n = Array<string>()
  links.forEach(({source, target}) => {
    if (n.indexOf(source) < 0) {n.push(source)}
    if (n.indexOf(target) < 0) {n.push(target)}
  })

  const r = Array<cweNodeType>()
  n.forEach(d => {
    const c = getCwe(d)
    if (c !== undefined){
      r.push({
        id: c.id,
        name: c.name
      })
    }
  })

  return r
}

export const filterNetWork = (cwe_id: string): cweNetWorkType => {

  const links = linkSearch(cwe_id)
  const nodes = nodeSearch(links)

  return {
    links,
    nodes
  }
}

export const createNetWork = ():cweNetWorkType => {

  const nodes = cwe.reduce((acc,c) => {
    const {id, name} = c
    acc.push({
      id, name
    })
    return acc
  }, Array<cweNodeType>())

  const relMap = createRelMap()

  const links = Array<cweLinkType>()
  for (const k of relMap.keys()) {
    const v = relMap.get(k)
    if (v !== undefined) {
      v.forEach(c => {

        const source = k
        const target = c

        links.push(
          {source, target}
        )
      })
    }
  }

  return {
    nodes,
    links
  }
}