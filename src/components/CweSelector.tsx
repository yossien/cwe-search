import { TextField, Box, Button, makeStyles, createStyles} from "@material-ui/core"
import { Search, } from "@material-ui/icons"
import React, { ChangeEvent, useEffect, useState } from "react"
import cweList from "../cwelist.json"
import {Autocomplete} from "@material-ui/lab"

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: 'flex',
      margin: '24px auto',
    },
    search_container: {
      alignItems: 'center',
      display: 'table',
    },
    input_container: {
      display: 'table-cell',
      minWidth: '120px',
      width: 'auto'
    },
    button_container: {
      display: 'table-cell',
      height: '100%',
      position: 'relative',
    },
    button: {
      position: 'absolute',
      top: '50%',
      transform: "TranslateY(-50%)",
      margin: "auto 12px",
    },
    result: {
      fontSize: '1.4em',
      fontWeight: 'bold'
    }
  })
)

type cweType = {
  id: string,
  name: string,
} | undefined

type selectorListType = {
  id: string,
  name: string
}

const selectorList = ():selectorListType[] => {
  const r = []
  for (const [k,v] of Object.entries(cweList)){

    const {name} = v
    r.push({
      id : k,
      name
    })
  }
  return r
}

const getCweById = (_id: string|null): cweType => {

  for (const [k,v] of Object.entries(cweList)) {
    if (_id === k){

      const {name} = v
      return {
        id: _id,
        name
      }
    }
  }
  return undefined
}

const CweSelector = () => {

  const classes = useStyles()

  const [cweId, setCweId] = useState<string | null>(null)
  const [cwe, setCwe] = useState<cweType>(undefined)

  useEffect(() => {
    setCwe(getCweById(cweId))
  }, [cweId])

  const selector = selectorList()

  return (
    <>
      <Box className={classes.root}>
        <div className={classes.search_container}>
          <div className={classes.input_container}>
            <Autocomplete
              id="cwe_id_input"
              options={selector as selectorListType[]}
              autoHighlight
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
          <div className={classes.button_container}>
            <Button
              color="primary"
              variant="contained"
              startIcon={<Search/>}
              size="large"
              className={classes.button}
            >Search</Button>
          </div>
        </div>
      </Box>
      <div className={classes.result}>
        {cwe ? `${cwe?.id} - ${cwe.name}` : 'Unknown'}
      </div>
    </>
  )
}

export default CweSelector