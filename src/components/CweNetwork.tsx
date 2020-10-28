import { TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@material-ui/core"
import { createNetWork, createRelMap, getCwe } from "../service/CweService"

const relList = createRelMap()

const cweNetwork = createNetWork()

const renderChidren = (children: string[]) => {
  const rows = children.map(child => {

    const cwe = getCwe(child)
    const name = cwe === undefined ? '' : cwe.name

    return (
      <TableRow>
        <TableCell>
            {child}
        </TableCell>
        <TableCell>
            {name}
        </TableCell>
      </TableRow>
    )
  })

  return (
    <TableContainer component={Paper}>
      <TableHead>
        <TableRow>
          <TableCell>
            CWE-ID
          </TableCell>
          <TableCell>
            Name
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {rows}
      </TableBody>
    </TableContainer>
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