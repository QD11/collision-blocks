import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import "./components/canvas/display-svg";
import "./components/info/info-container";
import { defaultBoxSetting } from "./features/constants";

@customElement("my-element")
export class MyElement extends LitElement {
    @property()
    runSimulation = false;

    @property()
    leftBox = defaultBoxSetting;

    @property()
    rightBox = defaultBoxSetting;

    updateLeftBox(e: CustomEvent) {
        this.leftBox = e.detail;
    }

    updateRightBox(e: CustomEvent) {
        this.rightBox = e.detail;
    }

    updateRunSimulation(e: CustomEvent) {
        this.runSimulation = e.detail;
    }

    render() {
        return html`
            <div class="container">
                <h2>Collision Blocks</h2>
                <display-svg
                    .leftBox=${this.leftBox}
                    .rightBox=${this.rightBox}
                    .runSimulation=${this.runSimulation}
                    @new-runSimulation=${this.updateRunSimulation}
                ></display-svg>
                <info-container
                    .runSimulation=${this.runSimulation}
                    .leftBox=${this.leftBox}
                    .rightBox=${this.rightBox}
                    @new-runSimulation=${this.updateRunSimulation}
                    @new-leftBox=${this.updateLeftBox}
                    @new-rightBox=${this.updateRightBox}
                ></info-container>
            </div>
        `;
    }

    static styles = css`
        :host {
            height: 100%;
            width: 100%;
            text-align: center;
            display: flex;
        }
        .container {
            display: flex;
            flex-direction: column;
            padding: 2rem;
            width: 100%;
            gap: 1rem;
        }
    `;
}

declare global {
    interface HTMLElementTagNameMap {
        "my-element": MyElement;
    }
}
