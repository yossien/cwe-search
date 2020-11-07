import { TextField, makeStyles, createStyles} from "@material-ui/core"
import React, { ChangeEvent } from "react"
import { Autocomplete } from "@material-ui/lab"
import { getCwe , getSelectorList } from "../service/CweService"
import { selectorListType } from "../types"

const useStyles = makeStyles(() =>
  createStyles({
    search_container: {
      alignItems: 'center',
      display: 'table',
      margin: '0px 24px'
    },
    input_container: {
      display: 'table-cell',
      minWidth: '10rem'
    },
    result: {
      fontSize: '1.4em',
      fontWeight: 'bold'
    },
  })
)

interface Props {
  onChangeCweId : (cwe_id: string|null) => void
  cwe_id: string|null
}

const CweSelector = (props: Props) => {

  const classes = useStyles()
  const {cwe_id, onChangeCweId} = props
  const cwe = getCwe(cwe_id)

  const selector = getSelectorList()

  const validate = cwe_id !== null && cwe_id !== ''  && cwe === undefined

  return (
    <>
      <div className={classes.search_container}>
        <div className={classes.input_container}>
          <Autocomplete
            id="cwe_id_input"
            options={selector as selectorListType[]}
            autoHighlight
            getOptionSelected={(option, value) => {
              return option !== null &&
                option.id.startsWith(value.id)
            }}
            getOptionLabel={(option) => option.id}
            onChange={(_e:ChangeEvent<{}>, v:selectorListType | null)=>{
              onChangeCweId(v == null ? null : v.id)
            }}
            renderOption={(option) => (
              <>
                {`${option.id} - ${option.name}`}
              </>
            )}
            renderInput={(params) => (
              <>
              <TextField
                {...params} label="CWE ID"
                variant="outlined"
                error={validate}
                onChange={(_e: ChangeEvent) => {
                  onChangeCweId(_e.target.nodeValue)
                }}
                autoFocus={true}
                fullWidth
                value={cwe_id}
              />
              </>
            )}
          />
        </div>
      </div>
    </>
  )
}

export default CweSelector