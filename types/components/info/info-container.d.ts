import { LitElement, PropertyValues } from "lit";
import "./box-settings-container";
import "./configuration-container";
export declare class InfoContainer extends LitElement {
    count: number;
    envSettings: {
        distance: number;
    };
    updateEnvSettings(e: CustomEvent): void;
    willUpdate(changedProperties: PropertyValues<this>): void;
    render(): import("lit-html").TemplateResult<1>;
    static styles: import("lit").CSSResult;
}
declare global {
    interface HTMLElementTagNameMap {
        "info-container": InfoContainer;
    }
}
