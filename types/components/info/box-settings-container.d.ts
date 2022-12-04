import { LitElement } from "lit";
export declare class BoxSettingsContainer extends LitElement {
    count: number;
    increaseCount(): void;
    render(): import("lit-html").TemplateResult<1>;
    static styles: import("lit").CSSResult;
}
declare global {
    interface HTMLElementTagNameMap {
        "box-settings-container": BoxSettingsContainer;
    }
}
