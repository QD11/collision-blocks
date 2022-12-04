import { defaultEnvSettings } from "features/constants";
import { css, html, LitElement, PropertyValues } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("system-settings-container")
export class SystemSettingsContainer extends LitElement {
    @property()
    distance = 20;

    @property()
    envSettings = defaultEnvSettings;

    willUpdate(changedProperties: PropertyValues<this>) {
        if (changedProperties.has("envSettings")) {
            const event = new CustomEvent("new-envSettings", {
                bubbles: true,
                detail: this.envSettings,
            });
            this.dispatchEvent(event);
        }
    }

    dispatchInput(e: CustomEvent) {
        const target = e.target as HTMLInputElement;
        this.envSettings = {
            ...this.envSettings,
            [target.name]: target.value,
        };
    }

    render() {
        return html`
            <div class="container">
                <h2 class="title">System Settings</h2>
                <div class="controls">
                    <div class="control">
                        <label class="label">Distance</label>
                        <input
                            type="range"
                            class="modifier"
                            name="distance"
                            min="20"
                            max="100"
                            value=${this.envSettings.distance}
                            @input=${this.dispatchInput}
                        />
                        <output>${this.envSettings.distance}m</output>
                    </div>
                </div>
            </div>
        `;
    }

    static styles = css`
        :host {
            padding: 1rem;
            width: 50%;
        }
        .container {
            height: 100%;
            border: 1px solid black;
        }
        .title {
            margin-top: 1rem;
            margin-bottom: 1rem;
        }
        .controls {
            padding: 1rem;
        }
        .control {
            display: flex;
        }
        .label {
            flex: 1;
        }
        .modifier {
            flex: 3;
        }
    `;
}

declare global {
    interface HTMLElementTagNameMap {
        "system-settings-container": SystemSettingsContainer;
    }
}
