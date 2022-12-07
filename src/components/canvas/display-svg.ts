import { axisBottom, easeLinear, ScaleLinear, select, Selection } from "d3";
import { scaleLinear } from "d3-scale";
import {
    defaultBoxSetting,
    DEFAULT_STATS,
    SVG_PADDING,
} from "features/constants";
import { InfoCollision } from "features/interfaces";
import { getInfoOnCollision } from "features/utils";
import { css, html, LitElement, PropertyValueMap } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";

@customElement("display-svg")
export class DisplaySvg extends LitElement {
    @query("#svg")
    svg!: SVGElement;

    @property()
    leftBox = defaultBoxSetting;

    @property()
    rightBox = defaultBoxSetting;

    @state()
    svgWidth = 0;

    @state()
    svgHeight = 0;

    @property()
    runSimulation = false;

    @property()
    stats = DEFAULT_STATS;

    willUpdate(
        changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>
    ): void {
        if (changedProperties.has("runSimulation")) {
            const event = new CustomEvent("new-runSimulation", {
                bubbles: true,
                detail: this.runSimulation,
            });
            this.dispatchEvent(event);
        }
        if (changedProperties.has("stats")) {
            const event = new CustomEvent("new-stats", {
                bubbles: true,
                detail: this.stats,
            });
            this.dispatchEvent(event);
        }
    }

    protected updated() {
        const shadowRoot = this.shadowRoot;
        if (!shadowRoot) {
            return;
        }
        const svg = select(this.svg);
        const xScale = scaleLinear()
            .domain([
                -this.leftBox.width,
                this.leftBox.distance +
                    this.rightBox.distance +
                    this.rightBox.width,
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
        const info = getInfoOnCollision(this.leftBox, this.rightBox);
        this._updateBoxPositions(svg, xScale, info);
        this._updateText(svg, xScale, info);
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

    _updateText = (
        svg: Selection<SVGElement, unknown, null, undefined>,
        xScale: ScaleLinear<number, number, never>,
        infoOnCollision: InfoCollision
    ) => {
        svg.selectAll(".g-text").remove();
        const totalDistance = this.leftBox.distance + this.rightBox.distance;

        const textLeftG = svg
            .append("g")
            .attr("class", "g-text")
            .attr(
                "transform",
                `translate(${SVG_PADDING}, ${
                    SVG_PADDING + this.svgHeight / 10
                })`
            );

        textLeftG
            .append("text")
            .text(`Velocity_i: ${this.leftBox.speed.toFixed(2)} (m/s)`)
            .attr("font-size", "1.5rem")
            .attr("x", 0)
            .attr("y", 0);
        textLeftG
            .append("text")
            .text(
                `Velocity_f: ${infoOnCollision.velocity.left.toFixed(2)} (m/s)`
            )
            .attr("font-size", "1.5rem")
            .attr("x", 0)
            .attr("y", 40);

        const textRightG = svg
            .append("g")
            .attr("class", "g-text")
            .attr(
                "transform",
                `translate(${SVG_PADDING + xScale(totalDistance)}, ${
                    SVG_PADDING + this.svgHeight / 10
                })`
            );

        textRightG
            .append("text")
            .text(`Velocity_i: ${-this.rightBox.speed.toFixed(2)} (m/s)`)
            .attr("text-anchor", "end")
            .attr("font-size", "1.5rem")
            .attr("x", 0)
            .attr("y", 0);

        textRightG
            .append("text")
            .text(
                `Velocity_f: ${infoOnCollision.velocity.right.toFixed(2)} (m/s)`
            )
            .attr("text-anchor", "end")
            .attr("font-size", "1.5rem")
            .attr("x", 0)
            .attr("y", 30);

        const textMiddleG = svg
            .append("g")
            .attr("class", "g-text")
            .attr(
                "transform",
                `translate(${
                    SVG_PADDING +
                    xScale(
                        (totalDistance -
                            this.leftBox.width +
                            this.rightBox.width) /
                            2
                    )
                }, ${SVG_PADDING + this.svgHeight / 10})`
            );

        textMiddleG
            .append("text")
            .text(`time_collision: ${infoOnCollision.time.toFixed(2)} (s)`)
            .attr("text-anchor", "middle")
            .attr("font-size", "1.5rem")
            .attr("x", 0)
            .attr("y", 0);

        textMiddleG
            .append("text")
            .text(`x_collision: ${infoOnCollision.x.toFixed(2)} (m)`)
            .attr("text-anchor", "middle")
            .attr("font-size", "1.5rem")
            .attr("x", 0)
            .attr("y", 40);
    };

    _updateBoxPositions = (
        svg: Selection<SVGElement, unknown, null, undefined>,
        xScale: ScaleLinear<number, number, never>,
        infoOnCollision: InfoCollision
    ) => {
        svg.selectAll(".g-block").remove();

        const totalDistance = this.leftBox.distance + this.rightBox.distance;

        const blockLeftG = svg
            .append("g")
            .attr("class", "g-block")
            .attr(
                "transform",
                `translate(${SVG_PADDING}, ${
                    this.svgHeight -
                    SVG_PADDING -
                    (xScale(this.leftBox.width) - xScale(0))
                })`
            );

        blockLeftG
            .append("rect")
            .attr("width", xScale(this.leftBox.width) - xScale(0))
            .attr("height", xScale(this.leftBox.width) - xScale(0))
            .attr("x", 0)
            .attr("fill", "red");

        const blockRightG = svg
            .append("g")
            .attr("class", "g-block")
            .attr(
                "transform",
                `translate(${SVG_PADDING + xScale(totalDistance)}, ${
                    this.svgHeight -
                    SVG_PADDING -
                    (xScale(this.rightBox.width) - xScale(0))
                })`
            );

        blockRightG
            .append("rect")
            .attr("width", xScale(this.rightBox.width) - xScale(0))
            .attr("height", xScale(this.rightBox.width) - xScale(0))
            .attr("x", 0)
            .attr("fill", "blue");

        if (this.runSimulation) {
            const collisionMilliSec = infoOnCollision.time * 1000;
            const xLeftAfter =
                infoOnCollision.x +
                infoOnCollision.velocity.left * infoOnCollision.time;
            const xRightAfter =
                infoOnCollision.x +
                infoOnCollision.velocity.right * infoOnCollision.time;

            setTimeout(() => {
                this.runSimulation = false;
            }, collisionMilliSec * 2);

            blockLeftG
                .transition()
                .ease(easeLinear)
                .duration(collisionMilliSec)
                .attr(
                    "transform",
                    `translate(${
                        SVG_PADDING + xScale(infoOnCollision.x) - xScale(0)
                    }, ${
                        this.svgHeight -
                        SVG_PADDING -
                        (xScale(this.leftBox.width) - xScale(0))
                    })`
                )
                .transition()
                .ease(easeLinear)
                .duration(collisionMilliSec)
                .attr(
                    "transform",
                    `translate(${
                        SVG_PADDING + xScale(xLeftAfter) - xScale(0)
                    }, ${
                        this.svgHeight -
                        SVG_PADDING -
                        (xScale(this.leftBox.width) - xScale(0))
                    })`
                );

            blockRightG
                .transition()
                .ease(easeLinear)
                .duration(collisionMilliSec)
                .attr(
                    "transform",
                    `translate(${SVG_PADDING + xScale(infoOnCollision.x)}, ${
                        this.svgHeight -
                        SVG_PADDING -
                        (xScale(this.rightBox.width) - xScale(0))
                    })`
                )
                .transition()
                .ease(easeLinear)
                .duration(collisionMilliSec)
                .attr(
                    "transform",
                    `translate(${SVG_PADDING + xScale(xRightAfter)}, ${
                        this.svgHeight -
                        SVG_PADDING -
                        (xScale(this.rightBox.width) - xScale(0))
                    })`
                );
        }
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
