import { BOX_PROPERTIES, defaultBoxSetting } from "features/constants";
import { BoxName } from "features/interfaces";
import { css, html, LitElement, PropertyValues } from "lit";
import { customElement, property, state } from "lit/decorators.js";

@customElement("box-settings-container")
export class BoxSettingsContainer extends LitElement {
    @property()
    count = 0;

    @property()
    leftBox = defaultBoxSetting;

    @property()
    rightBox = defaultBoxSetting;

    @state()
    isLeftBox = true;

    willUpdate(changedProperties: PropertyValues<this>) {
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
    }

    render() {
        return html`
            <div class="which-box-container">
                <div
                    class=${this.isLeftBox
                        ? "box-holder-active"
                        : "box-holder-inactive"}
                    @click=${this._chooseLeftBox}
                >
                    <h2 class="box-name">Left Box</h2>
                </div>
                <div
                    class=${!this.isLeftBox
                        ? "box-holder-active"
                        : "box-holder-inactive"}
                    @click=${this._chooseRightBox}
                >
                    <h2 class="box-name">Right Box</h2>
                </div>
            </div>
            <div class="bottom-container">
                <div class="controllerContainer">
                    ${BOX_PROPERTIES.map((property) =>
                        this._renderButtonControl(property.label, property.name)
                    )}
                </div>
            </div>
        `;
    }

    _chooseLeftBox = () => {
        this.isLeftBox = true;
    };

    _chooseRightBox = () => {
        this.isLeftBox = false;
    };

    _renderButtonControl = (label: string, name: BoxName) => {
        const performCalculation = (event: Event) => {
            const button = event.target as HTMLButtonElement;
            const modifier = Number(button.value);
            if (this.isLeftBox) {
                const newValue = this.leftBox[name] + modifier;
                this.leftBox = {
                    ...this.leftBox,
                    [name]: newValue >= 1 ? newValue : this.leftBox[name],
                };
            } else {
                const newValue = this.rightBox[name] + modifier;
                this.rightBox = {
                    ...this.rightBox,
                    [name]: newValue >= 1 ? newValue : this.rightBox[name],
                };
            }
        };

        return html`
            <div class="boxController" key="${label}-${name}">
                <div>
                    <button value="-10" @click=${performCalculation}>
                        -10
                    </button>
                    <button value="-1" @click=${performCalculation}>-1</button>
                </div>
                <p>
                    ${label}:
                    ${this.isLeftBox ? this.leftBox[name] : this.rightBox[name]}
                </p>
                <div>
                    <button value="1" @click=${performCalculation}>+1</button>
                    <button value="10" @click=${performCalculation}>+10</button>
                </div>
            </div>
        `;
    };

    static styles = css`
        :host {
            padding: 1rem;
            width: 50%;
            height: 50vh;
            border: 1px solid black;
        }
        .bottom-container {
            height: 100%;
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
            justify-content: space-around;
            gap: 1rem;
        }
        .box-holder-active {
            width: 50%;
            border: 1px solid black;
            background: #e5e5e5;
            outline: none;
            -webkit-box-shadow: inset 0px 0px 5px #c1c1c1;
            -moz-box-shadow: inset 0px 0px 5px #c1c1c1;
            box-shadow: inset 0px 0px 5px #c1c1c1;
        }
        .box-holder-inactive {
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
        "box-settings-container": BoxSettingsContainer;
    }
}
