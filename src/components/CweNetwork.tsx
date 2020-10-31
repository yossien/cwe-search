import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@material-ui/core"
import { getCwe, createRelMap } from "../service/CweService"

const relList = createRelMap()

const renderChildren = (children: string[]) => {
  const rows = children.map(child => {

    const cwe = getCwe(child)
    const name = cwe === undefined ? '' : cwe.name

    return (
      <TableRow key={cwe?.id}>
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
      <Table>
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
      </Table>
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
        <h2 style={{textAlign: 'center'}}>Direct Children</h2>
      </div>
      {children !== undefined && renderChildren(children)}
    </>
  )
}

export default CweNetwork