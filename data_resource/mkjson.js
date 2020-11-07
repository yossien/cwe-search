const convert = require('xml-js')
const fs = require('fs')

function getRootElement(xmlFileName) {

  const xml  = fs.readFileSync(xmlFileName, 'utf-8')
  const resultJson = convert.xml2json(xml,{compact: true, spaces: 4})
  const jsonObj = JSON.parse(resultJson)
  const rootElement = jsonObj.Weakness_Catalog
  return rootElement
}

function getAllCaterogies(rootElement) {

  return rootElement.Categories.Category.map(element => {

    const {ID, Name, Status} = element._attributes
    const Relationships = {element}
    return {
      id : ID,
      name : Name,
      status : Status,
      member : Relationships
    }
  });
}

function getAllWeakness(rootElement) {
  return rootElement.Weaknesses.Weakness.reduce((m, element) => {

    const related_weaknesses = element.Related_Weaknesses

    let child = []

    if (related_weaknesses !== undefined) {

      child = related_weaknesses.Related_Weakness instanceof Array ?

        related_weaknesses.Related_Weakness.reduce((acc, element) => {

          if (element._attributes.Nature === 'ChildOf'){
            acc.push(element._attributes)
          }
          return acc

        }, [])
        : related_weaknesses.Related_Weakness !== undefined ? [related_weaknesses.Related_Weakness._attributes] : []
    }

    const description = element.Description._text

    let ex_description = element.Extended_Description
    const extented_description = ex_description === undefined ? ''
      : ex_description._text

    if (element !== null){

      const {ID, Name, Abstraction, Structure, Status} = element._attributes

      m.push({
        id: ID,
        name : Name,
        abstraction: Abstraction,
        structure: Structure,
        status: Status,
        description,
        extented_description,
        child
      })
    }

    return m

  }, [])
}


const rootElement = getRootElement('./data_resource/cwec_v4.2.xml')
const allWkeknesses = getAllWeakness(rootElement)

console.log(JSON.stringify(allWkeknesses,null,2))
// const allCategories = getAllCaterogies(rootElement)

// const weakness = rootElement.elements[0].elements
// const views = rootElement.elements[2].elements

