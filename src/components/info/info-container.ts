import { defaultBoxSetting, defaultEnvSettings } from "features/constants";
import { css, html, LitElement, PropertyValues } from "lit";
import { customElement, property } from "lit/decorators.js";
import "./box-settings-container";
import "./system-settings-container";

@customElement("info-container")
export class InfoContainer extends LitElement {
    @property()
    count = 0;

    @property({ type: Object })
    envSettings = defaultEnvSettings;

    @property()
    boxSetting = defaultBoxSetting;

    updateEnvSettings(e: CustomEvent) {
        this.envSettings = e.detail;
    }

    updateBoxSetting(e: CustomEvent) {
        this.boxSetting = e.detail;
    }

    willUpdate(changedProperties: PropertyValues<this>) {
        if (changedProperties.has("envSettings")) {
            const event = new CustomEvent("new-envSettings", {
                bubbles: true,
                detail: this.envSettings,
            });
            this.dispatchEvent(event);
        }
        if (changedProperties.has("boxSetting")) {
            const event = new CustomEvent("new-boxSetting", {
                bubbles: true,
                detail: this.boxSetting,
            });
            this.dispatchEvent(event);
        }
    }

    render() {
        return html`
            <p>${this.envSettings.distance}</p>
            <div class="container">
                <system-settings-container
                    @new-envSettings=${this.updateEnvSettings}
                    .envSettings=${this.envSettings}
                ></system-settings-container>
                <box-settings-container
                    @new-boxSetting=${this.updateBoxSetting}
                    .boxSetting=${this.boxSetting}
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
        }
    `;
}

declare global {
    interface HTMLElementTagNameMap {
        "info-container": InfoContainer;
    }
}
