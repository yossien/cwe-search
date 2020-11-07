import { filterNetWork } from "../service/CweService"
import * as d3 from "d3"
import { Component } from "react";
import { cweNetWorkType, cweNodeType } from "../types";
import React from "react"

interface Props {
  cwe_id: string|null
  onChangeCweId?: (id: string| null) => void
}
export default class CweGraph extends Component<Props,{}> {

  svgRef:SVGSVGElement|null = null
  cweNetwork?: cweNetWorkType
  height: number = 400

  eraseGraph() {
    const context: any = d3.select(this.svgRef)
    context.selectAll('circle')
      .data([])
      .exit().remove()

    context.selectAll('line')
      .data([])
      .exit().remove()

    context.selectAll('text')
      .data([])
      .exit().remove()

    this.cweNetwork = undefined
  }

  drawGraph() {
    const {cwe_id, onChangeCweId} = this.props

    if (cwe_id === null) return

    this.cweNetwork = filterNetWork(cwe_id)

    const context: any = d3.select(this.svgRef)
    const color = d3.scaleOrdinal(d3.schemeCategory10)

    const width = context.node().getBoundingClientRect().width
    const height = context.node().getBoundingClientRect().height

    const g = context.append('g')

    const zoomed = (d3.zoom().on('zoom', (event:any) => {
      g.attr('transform', (event.transform))
    }))
    context.call(zoomed)

    const link = g.append("g")
      .selectAll('line')
      .data(this.cweNetwork.links)
      .enter()
      .append('line')
      .style('stroke', '#aaa')

    const nodeGroup = g.append("g")
      .selectAll('circle')
      .data(this.cweNetwork.nodes)
      .enter()
      .append("g")
    // node circle
    nodeGroup
      .append('circle')
        .attr('cx', function(d: any){return d.x})
        .attr('cy', function(d: any){return d.y})
        .attr("r", 18)
        .attr("fill",function(d: cweNodeType){
          return color(d.id)
        })

    if (onChangeCweId !== undefined){
      nodeGroup
        .on('click', function(d: any){
          console.log(d.target.textContent)
          onChangeCweId(d.target.textContent)
        })
    }
    // node text
    nodeGroup
      .append('text')
        .attr('x', function(d: any){return d.x})
        .attr('y', function(d: any){return d.y + 5})
        .attr("fill", "white")
        .attr("font-size", 12)
        .attr("lengthAdjust", "spacing")
        .attr("text-anchor", "middle")
        .text(function(d: cweNodeType){
          return d.id
        })

    const simulation: any = d3.forceSimulation()
      .force('link', d3.forceLink().id(function(d: any) {
        return d.id
      }))
      .force("charge", d3.forceManyBody().strength(-500))
      .force("center", d3.forceCenter(width / 2 , height / 2))
      //.force("x", d3.forceX().strength(0.0000005).x(width / 2))
      //.force("y", d3.forceY().strength(0.0015).y(height / 2))

    simulation
      .nodes(this.cweNetwork.nodes)
      .on("tick",ticked)

    simulation
      .force("link")
      .links(this.cweNetwork.links)

    function ticked() {
      link
        .attr("x1", function(d: any) { return d.source.x; })
        .attr("y1", function(d: any) { return d.source.y; })
        .attr("x2", function(d: any) { return d.target.x; })
        .attr("y2", function(d: any) { return d.target.y; });
      nodeGroup.select("circle")
        .attr("cx", function(d: any) { return d.x; })
        .attr("cy", function(d: any) { return d.y; });
      nodeGroup.select("text")
        .attr("x", function(d: any) { return d.x; })
        .attr("y", function(d: any) { return d.y + 5; });
    }
  }

  componentDidMount() {
    this.eraseGraph()
    this.drawGraph()
  }

  componentDidUpdate() {
    this.eraseGraph()
    this.drawGraph()
  }

  render() {

    return (
      <>
        <h2 style={{textAlign: 'center', color: '#666'}}> Relation Diagram</h2>
        <div style={{minWidth: '800px',  minHeight: '400px'}}>
          <svg ref={(ref:SVGSVGElement) => this.svgRef = ref} width={'100%'}  height={'400px'}
            style={{
              borderColor: '#666',
              borderWidth: '1px',
              borderStyle: 'solid'
            }}
          >
          </svg>
        </div>
      </>
    )
  }
}
