import { Box, makeStyles, createStyles} from "@material-ui/core"
import { getCwe } from "../service/CweService"

interface Props {
  cwe_id: string|null
}

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      color: '#666'
    },
    title: {
      textAlign: 'center'
    },
    result: {
      marginTop: '1rem',
      marginLeft: '2rem',
      fontSize: '1.4em',
      fontWeight: 'bold'
    },
    description: {
      margin: '1rem 2rem'
    }

  })
)

const CweInfo = (props: Props) => {

  const {cwe_id} = props
  const cwe = getCwe(cwe_id)
  const classes = useStyles()

  return (
    <Box className={classes.root}>
      <h2 className={classes.title}>Information.</h2>
      <hr/>
      <div className={classes.result}>
        {cwe ? `${cwe?.id} - ${cwe.name}` : 'Unknown'}
      </div>
      <div className={classes.description}>
        {cwe && `${cwe.description}`}
      </div>
      <hr/>
    </Box>
  )
}

export default CweInfo