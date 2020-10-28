interface CweData {
  id: string,
  name: string,
  abstraction: string,
  structure: string,
  status: string,
  description: string,
  child: [
    {
      Nature: string,
      CWE_ID: string,
      View_ID: string,
      Ordinal: string
    }
  ]
}

declare const data: CweData[]

export default data