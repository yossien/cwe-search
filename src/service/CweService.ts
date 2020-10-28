import cwe from "../data/cwe"
import { cweType, netWorkType, selectorListType } from "../types"

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

export const createNetWork = ():netWorkType => {

  const m = new Map<string,{id: number, name: string}>()
  let newNumber = 0

  cwe.forEach(c => {
    m.set(c.id, {id: ++newNumber, name: `${c.id} - ${c.name}`})
  })

  const nodes = cwe.reduce((acc,c) => {
    const v = m.get(c.id)
    if (v !== undefined) {
      acc.push(v)
    }
    return acc
  }, Array<{id:number, name:string}>())

  const relMap = createRelMap()

  const links = Array<{source: number, target: number}>()
  for (const k of relMap.keys()) {
    const v = relMap.get(k)
    if (v !== undefined) {
      v.forEach(c => {

        const s = m.get(k)
        const t = m.get(c)

        if (s !== undefined && t !== undefined) {

          const source = s.id
          const target = t.id

          links.push(
            {source, target}
          )
        }
      })
    }
  }

  return {
    nodes,
    links
  }
}