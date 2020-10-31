import { Box, makeStyles, createStyles} from "@material-ui/core"
import { getCwe } from "../service/CweService"

interface Props {
  cwe_id: string|null
}

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: 'flex',
      margin: '24px auto',
    },
    result: {
      fontSize: '1.4em',
      fontWeight: 'bold'
    }
  })
)

const CweInfo = (props: Props) => {

  const {cwe_id} = props
  const cwe = getCwe(cwe_id)
  const classes = useStyles()

  return (
    <Box>
      <h2>Information.</h2>
      <div className={classes.result}>
        {cwe ? `${cwe?.id} - ${cwe.name}` : 'Unknown'}
      </div>
      <div>
        {cwe && `${cwe.description}`}
      </div>
    </Box>
  )
}

export default CweInfo