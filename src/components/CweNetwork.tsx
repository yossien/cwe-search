import cweList from "../cwelist.json"

const createRelMap = ():Map<string,string[]> => {

  const r = new Map<string, string[]>()
  for (const[k,v] of Object.entries(cweList)){
    v.child.forEach(d => {
      const id = d.CWE_ID
      let a = r.get(id)
      if (a === undefined) {a = []}
      a.push(k)
      r.set(id,a)
    })
  }
  return r
}

const relList = createRelMap()

const getCwe = (_id: string):any => {
  for (const [k,v] of Object.entries(cweList)){
    if (k === _id){ return v}
  }
  return undefined
}

const renderChidren = (children: string[]) => {
  const rows = children.map(child => {

    const {name} = getCwe(child)

    return (
      <tr>
        <td>
          {child} - {name}
        </td>
      </tr>
    )
  })

  return (
    <table>
      {rows}
    </table>
  )
}

interface Props {
  cwe_id: string
}

const CweNetwork = (props: Props) => {

  const {cwe_id} = props
  const children = relList.get(cwe_id)

  return (
    <>
      <div>
        <h2>Direct Children</h2>
      </div>
      {children && renderChidren(children)}
    </>
  )
}

export default CweNetwork