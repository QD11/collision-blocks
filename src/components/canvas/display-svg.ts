import { axisBottom, select, Selection } from "d3";
import { scaleLinear } from "d3-scale";
import { defaultBoxSetting, defaultEnvSettings } from "features/constants";
import { css, html, LitElement } from "lit";
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

    // willUpdate(changedProperties: PropertyValues<this>) {
    //     const xScale = scaleLinear()
    //         .domain([0, this.boxSetting.distance])
    //         .range([0, 100]);
    // }

    protected updated() {
        const shadowRoot = this.shadowRoot;
        if (!shadowRoot) {
            return;
        }

        let svg = select(shadowRoot.querySelector("#svg"));
        svg.selectAll("*").remove();
        this.buildChart(svg, shadowRoot);
    }

    buildChart(
        svg: Selection<Element | null, unknown, null, undefined>,
        shadowRoot: ShadowRoot
    ) {
        const svgWidth = svg.node()?.clientWidth ?? 0;

        const xScale = scaleLinear()
            .domain([0, this.boxSetting.distance])
            .range([0, svgWidth]);

        const xAxis = axisBottom(xScale).ticks(5);
        svg.append("g").call(xAxis);
    }

    connectedCallback() {
        super.connectedCallback();
        window.addEventListener("resize", this._handleResize);
    }
    disconnectedCallback() {
        window.removeEventListener("resize", this._handleResize);
        super.disconnectedCallback();
    }

    _handleResize = () => {
        this.svgWidth = this.svg.clientWidth;
        this.svgHeight = this.svg.clientHeight;
    };

    render() {
        return html`
            <svg
                id="svg"
                width="100%"
                height="100%"
                preserveAspectRatio="xMinYMin meet"
            >
                <!-- <text font-size="24px" dominant-baseline="hanging">
                    ${this.boxSetting.distance}
                </text> -->
            </svg>
        `;
    }

    static styles = css`
        :host {
            height: 100%;
            border: 2px solid black;
        }
    `;
}

declare global {
    interface HTMLElementTagNameMap {
        "display-svg": DisplaySvg;
    }
}
