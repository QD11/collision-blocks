import { LitElement } from "lit";
import "./components/canvas/box-container";
import "./components/info/info-container";
/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
export declare class MyElement extends LitElement {
    /**
     * Copy for the read the docs hint.
     */
    docsHint: string;
    /**
     * The number of times the button has been clicked.
     */
    count: number;
    numberOfBoxes: number;
    envSettings: {
        distance: number;
    };
    increaseCount(): void;
    updateEnvSettings(e: CustomEvent): void;
    render(): import("lit-html").TemplateResult<1>;
    static styles: import("lit").CSSResult;
}
declare global {
    interface HTMLElementTagNameMap {
        "my-element": MyElement;
    }
}
