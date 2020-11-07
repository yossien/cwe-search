import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@material-ui/core"
import { makeStyles, createStyles} from "@material-ui/core"
import { getCwe, createRelMap } from "../service/CweService"

const relList = createRelMap()

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      color: '#666'
    },
    title: {
      textAlign: 'center'
    },
    message: {
      textAlign: 'center'
    }
  })
)

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
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <h2 className={classes.title}>Direct Children</h2>
      {children !== undefined && renderChildren(children)}
      {children === undefined && <p className={classes.message}>It does not have any children.</p>}
    </div>
  )
}

export default CweNetwork