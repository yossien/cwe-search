
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

export type cweNodeType = {
  id: string,
  name: string,
}

export type cweLinkType = {
  source: string,
  target: string,
}

export type cweNetWorkType = {
  nodes :
    cweNodeType[]
  ,
  links :
    cweLinkType[]
}