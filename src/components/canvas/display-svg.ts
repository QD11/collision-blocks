import { axisBottom, ScaleLinear, select, Selection } from "d3";
import { scaleLinear } from "d3-scale";
import {
    defaultBoxSetting,
    defaultEnvSettings,
    SVG_PADDING,
} from "features/constants";
import { css, html, LitElement, PropertyValueMap } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";

@customElement("display-svg")
export class DisplaySvg extends LitElement {
    @query("#svg")
    svg!: SVGElement;

    @property()
    envSettings = defaultEnvSettings;

    @property()
    boxSetting = defaultBoxSetting;

    @state()
    svgWidth = 0;

    @state()
    svgHeight = 0;

    @property()
    svgg = select(this.svg);

    protected updated() {
        const shadowRoot = this.shadowRoot;
        if (!shadowRoot) {
            return;
        }
        const svg = select(this.svg);
        const xScale = scaleLinear()
            .domain([
                -this.boxSetting.width,
                2 * this.boxSetting.distance + this.boxSetting.width,
            ])
            .range([0, this.svgWidth - 2 * SVG_PADDING]);
        svg.selectAll("*").remove();
        this.buildChart(svg, xScale);
        this.renderBlocks(svg, xScale);
    }

    buildChart(
        svg: Selection<SVGElement, unknown, null, undefined>,
        xScale: ScaleLinear<number, number, never>
    ) {
        const xAxis = axisBottom(xScale).ticks(5);
        svg.append("g")
            .attr(
                "transform",
                `translate(${SVG_PADDING}, ${this.svgHeight - SVG_PADDING})`
            )
            .call(xAxis);
    }

    renderBlocks(
        svg: Selection<SVGElement, unknown, null, undefined>,
        xScale: ScaleLinear<number, number, never>
    ) {
        const blockG = svg
            .append("g")
            .attr(
                "transform",
                `translate(${SVG_PADDING}, ${
                    this.svgHeight -
                    SVG_PADDING -
                    (xScale(this.boxSetting.width) - xScale(0))
                })`
            );

        blockG
            .append("rect")
            .attr("width", xScale(this.boxSetting.width) - xScale(0))
            .attr("height", xScale(this.boxSetting.width) - xScale(0))
            .attr("x", 0)
            .attr("fill", "red");

        blockG
            .append("rect")
            .attr("width", xScale(this.boxSetting.width) - xScale(0))
            .attr("height", xScale(this.boxSetting.width) - xScale(0))
            .attr("x", xScale(this.boxSetting.distance * 2))
            .attr("fill", "blue");
    }

    render() {
        return html` <svg id="svg" width="100%" height="100%"></svg> `;
    }

    connectedCallback() {
        super.connectedCallback();
        window.addEventListener("resize", this._handleResize);
    }
    disconnectedCallback() {
        window.removeEventListener("resize", this._handleResize);
        super.disconnectedCallback();
    }

    protected async firstUpdated(
        _changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>
    ) {
        // The dom will showup but it's not initialized
        // setTimeout() waits for the dom to be initialized first
        // TODO: Find a better way to wait
        setTimeout(() => this._handleResize());
    }

    _handleResize = () => {
        this.svgWidth = this.svg.clientWidth;
        this.svgHeight = this.svg.clientHeight;
    };

    static styles = css`
        :host {
            height: 100%;
            width: 100%;
            border: 2px solid black;
        }
    `;
}

declare global {
    interface HTMLElementTagNameMap {
        "display-svg": DisplaySvg;
    }
}
