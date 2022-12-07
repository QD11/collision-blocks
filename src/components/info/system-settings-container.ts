import { defaultBoxSetting } from "features/constants";
import { css, html, LitElement, PropertyValues } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("system-settings-container")
export class SystemSettingsContainer extends LitElement {
    @property()
    runSimulation = false;

    @property()
    leftBox = defaultBoxSetting;

    @property()
    rightBox = defaultBoxSetting;

    willUpdate(changedProperties: PropertyValues<this>) {
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
            <div class="which-box-container">
                <div
                    class=${this.runSimulation
                        ? "box-holder-active"
                        : "box-holder-inactive"}
                    @click=${() => (this.runSimulation = true)}
                >
                    <h2 class="box-name">Start</h2>
                </div>
                <div
                    class=${!this.runSimulation
                        ? "box-holder-active"
                        : "box-holder-inactive"}
                    @click=${() => (this.runSimulation = false)}
                >
                    <h2 class="box-name">Stop</h2>
                </div>
            </div>
        `;
    }

    static styles = css`
        :host {
            padding: 1rem;
            width: 50%;
            height: 100%;
            border: 1px solid black;
        }
        .bottom-container {
            height: 100%;
            display: flex;
            justify-content: space-between;
            gap: 1rem;
        }
        .stats-container {
            width: 50%;
            display: flex;
            justify-content: center;
            flex-direction: column;
        }
        .controllerContainer {
            padding-left: 5px;
            padding-right: 5px;
        }
        .boxController {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .which-box-container {
            display: flex;
            height: 100%;
            justify-content: space-around;
            gap: 1rem;
        }
        .box-holder-active {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 50%;
            border: 1px solid black;
            background: #e5e5e5;
            outline: none;
            -webkit-box-shadow: inset 0px 0px 5px #c1c1c1;
            -moz-box-shadow: inset 0px 0px 5px #c1c1c1;
            box-shadow: inset 0px 0px 5px #c1c1c1;
        }
        .box-holder-inactive {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 50%;
            border: 1px solid black;
            background: grey;
            cursor: pointer;
        }
        .box-name {
            margin: 0;
            padding: 1rem;
        }
    `;
}

declare global {
    interface HTMLElementTagNameMap {
        "system-settings-container": SystemSettingsContainer;
    }
}
