import { BOX_PROPERTIES, defaultBoxSetting } from "features/constants";
import { BoxName } from "features/interfaces";
import { css, html, LitElement, PropertyValues } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("box-settings-container")
export class BoxSettingsContainer extends LitElement {
    @property()
    count = 0;

    @property()
    boxSetting = defaultBoxSetting;

    willUpdate(changedProperties: PropertyValues<this>) {
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
            <div class="container">
                <h2>Box Setting</h2>
                <div class="controllerContainer">
                    ${BOX_PROPERTIES.map((property) =>
                        this._renderButtonControl(property.label, property.name)
                    )}
                </div>
            </div>
        `;
    }

    _renderButtonControl = (label: string, name: BoxName) => {
        const performCalculation = (event: Event) => {
            const button = event.target as HTMLButtonElement;
            const modifier = Number(button.value);
            const newValue = this.boxSetting[name] + modifier;
            this.boxSetting = {
                ...this.boxSetting,
                [name]: newValue >= 1 ? newValue : this.boxSetting[name],
            };
        };

        return html`
            <div class="boxController" key="${label}-${name}">
                <div>
                    <button value="-10" @click=${performCalculation}>
                        -10
                    </button>
                    <button value="-1" @click=${performCalculation}>-1</button>
                </div>
                <p>${label}: ${this.boxSetting[name]}</p>
                <div>
                    <button value="+1" @click=${performCalculation}>+1</button>
                    <button value="+10" @click=${performCalculation}>
                        +10
                    </button>
                </div>
            </div>
        `;
    };

    static styles = css`
        :host {
            padding: 1rem;
            width: 50%;
        }
        .container {
            height: 100%;
            border: 1px solid black;
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
    `;
}

declare global {
    interface HTMLElementTagNameMap {
        "box-settings-container": BoxSettingsContainer;
    }
}
