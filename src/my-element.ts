import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import "./components/canvas/display-svg";
import "./components/info/info-container";
import {
    defaultBoxSetting,
    defaultEnvSettings,
    DEFAULT_STATS,
} from "./features/constants";

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement("my-element")
export class MyElement extends LitElement {
    /**
     * Copy for the read the docs hint.
     */
    @property()
    docsHint = "Click on the Vite and Lit logos to learn more";

    @property()
    envSettings = defaultEnvSettings;

    @property()
    runSimulation = false;

    @property()
    stats = DEFAULT_STATS;

    @property()
    leftBox = defaultBoxSetting;

    @property()
    rightBox = defaultBoxSetting;

    updateEnvSettings(e: CustomEvent) {
        this.envSettings = e.detail;
    }

    updateLeftBox(e: CustomEvent) {
        this.leftBox = e.detail;
    }

    updateRightBox(e: CustomEvent) {
        this.rightBox = e.detail;
    }

    updateRunSimulation(e: CustomEvent) {
        this.runSimulation = e.detail;
    }

    updateStats(e: CustomEvent) {
        this.stats = e.detail;
    }

    render() {
        console.log(this.runSimulation);

        return html`
            <div class="container">
                <h2>Physics Blocks</h2>
                <display-svg
                    .envSettings=${this.envSettings}
                    .leftBox=${this.leftBox}
                    .rightBox=${this.rightBox}
                    .runSimulation=${this.runSimulation}
                    @new-runSimulation=${this.updateRunSimulation}
                    @new-stats=${this.updateStats}
                ></display-svg>
                <info-container
                    .runSimulation=${this.runSimulation}
                    .stats=${this.stats}
                    .envSettings=${this.envSettings}
                    .leftBox=${this.leftBox}
                    .rightBox=${this.rightBox}
                    @new-runSimulation=${this.updateRunSimulation}
                    @new-envSettings=${this.updateEnvSettings}
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
