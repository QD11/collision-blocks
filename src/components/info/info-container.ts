import {
    defaultBoxSetting,
    defaultEnvSettings,
    DEFAULT_STATS,
} from "features/constants";
import { css, html, LitElement, PropertyValues } from "lit";
import { customElement, property } from "lit/decorators.js";
import "./box-settings-container";
import "./system-settings-container";

@customElement("info-container")
export class InfoContainer extends LitElement {
    @property({ type: Object })
    envSettings = defaultEnvSettings;

    @property()
    runSimulation = false;

    @property()
    leftBox = defaultBoxSetting;

    @property()
    rightBox = defaultBoxSetting;

    @property()
    stats = DEFAULT_STATS;

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

    willUpdate(changedProperties: PropertyValues<this>) {
        if (changedProperties.has("envSettings")) {
            const event = new CustomEvent("new-envSettings", {
                bubbles: true,
                detail: this.envSettings,
            });
            this.dispatchEvent(event);
        }
        if (changedProperties.has("leftBox")) {
            const event = new CustomEvent("new-leftBox", {
                bubbles: true,
                detail: this.leftBox,
            });
            this.dispatchEvent(event);
        }
        if (changedProperties.has("rightBox")) {
            const event = new CustomEvent("new-rightBox", {
                bubbles: true,
                detail: this.rightBox,
            });
            this.dispatchEvent(event);
        }
        if (changedProperties.has("runSimulation")) {
            const event = new CustomEvent("new-runSimulation", {
                bubbles: true,
                detail: this.runSimulation,
            });
            this.dispatchEvent(event);
        }
    }

    render() {
        return html`
            <div class="container">
                <system-settings-container
                    @new-envSettings=${this.updateEnvSettings}
                    .leftBox=${this.leftBox}
                    .rightBox=${this.rightBox}
                    .envSettings=${this.envSettings}
                    .stats=${this.stats}
                    .runSimulation=${this.runSimulation}
                    @new-runSimulation=${this.updateRunSimulation}
                ></system-settings-container>
                <box-settings-container
                    @new-leftBox=${this.updateLeftBox}
                    @new-rightBox=${this.updateRightBox}
                    .leftBox=${this.leftBox}
                    .rightBox=${this.rightBox}
                ></box-settings-container>
            </div>
        `;
    }

    static styles = css`
        :host {
            height: 50%;
            width: 100%;
        }
        .container {
            display: flex;
            flex-direction: row;
            height: 100%;
            gap: 1rem;
        }
    `;
}

declare global {
    interface HTMLElementTagNameMap {
        "info-container": InfoContainer;
    }
}
