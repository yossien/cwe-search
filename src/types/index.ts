
export type cweType = {
  id: string,
  name: string,
  description: string,
} | undefined

export type selectorListType = {
  id: string,
  name: string,
  description: string,
}

export type netWorkType = {
  nodes :
    {id: number, name: string}[]
  ,
  links :
    {source: number, target: number}[]
}