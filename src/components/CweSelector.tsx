import { TextField, Box, makeStyles, createStyles} from "@material-ui/core"
import React, { ChangeEvent, useEffect, useState } from "react"
import {Autocomplete } from "@material-ui/lab"
import CweNetwork from "./CweNetwork"
import { getCwe , getSelectorList } from "../service/CweService"
import { cweType , selectorListType } from "../types"

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: 'flex',
      margin: '24px auto',
    },
    search_container: {
      alignItems: 'center',
      display: 'table',
      width: '100%'
    },
    input_container: {
      display: 'table-cell',
      minWidth: '120px',
      width: 'auto'
    },
    result: {
      fontSize: '1.4em',
      fontWeight: 'bold'
    }
  })
)

const CweSelector = () => {

  const classes = useStyles()

  const [cweId, setCweId] = useState<string | null>(null)
  const [cwe, setCwe] = useState<cweType>(undefined)

  useEffect(() => {
    setCwe(getCwe(cweId))
  }, [cweId])

  const selector = getSelectorList()

  return (
    <>
      <Box className={classes.root}>
        <div className={classes.search_container}>
          <div className={classes.input_container}>
            <Autocomplete
              id="cwe_id_input"
              options={selector as selectorListType[]}
              autoHighlight
              getOptionSelected={option => {return option !== null}}
              getOptionLabel={(option) => option.id}
              onChange={(_e:ChangeEvent<{}>, v:selectorListType | null)=>{
                setCweId(v == null ? null : v.id)
              }}
              renderOption={(option) => (
                <>
                  {`${option.id} - ${option.name}`}
                </>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="CWE ID"
                  variant="outlined"
                />
              )}
            />
          </div>
        </div>
      </Box>
      <div>
        <div className={classes.result}>
          {cwe ? `${cwe?.id} - ${cwe.name}` : 'Unknown'}
        </div>
        <div>
          {cwe && `${cwe.description}`}
        </div>
      </div>
      <hr/>
      {cwe && <CweNetwork cwe_id={cwe?.id}/>}
    </>
  )
}

export default CweSelector