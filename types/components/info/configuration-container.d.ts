import { LitElement, PropertyValues } from "lit";
export declare class ConfigurationContainer extends LitElement {
    distance: number;
    envSettings: {
        distance: number;
    };
    willUpdate(changedProperties: PropertyValues<this>): void;
    dispatchInput(e: CustomEvent): void;
    render(): import("lit-html").TemplateResult<1>;
    static styles: import("lit").CSSResult;
}
declare global {
    interface HTMLElementTagNameMap {
        "configuration-container": ConfigurationContainer;
    }
}
