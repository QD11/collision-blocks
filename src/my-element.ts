import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import "./components/canvas/display-svg";
import "./components/info/info-container";
import { defaultBoxSetting, defaultEnvSettings } from "./features/constants";

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

    /**
     * The number of times the button has been clicked.
     */
    @property()
    count = 5;

    @property()
    envSettings = defaultEnvSettings;

    @property()
    boxSetting = defaultBoxSetting;

    updateEnvSettings(e: CustomEvent) {
        this.envSettings = e.detail;
    }

    updateBoxSetting(e: CustomEvent) {
        this.boxSetting = e.detail;
    }

    render() {
        return html`
            <div class="container">
                <h2>Physics Blocks</h2>
                <display-svg
                    .envSettings=${this.envSettings}
                    .boxSetting=${this.boxSetting}
                ></display-svg>
                <info-container
                    .count=${this.count}
                    .envSettings=${this.envSettings}
                    @new-envSettings=${this.updateEnvSettings}
                    @new-boxSetting=${this.updateBoxSetting}
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
        }
    `;
}

declare global {
    interface HTMLElementTagNameMap {
        "my-element": MyElement;
    }
}
