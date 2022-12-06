import { describe, it, expect, vi } from "vitest";

import { mount } from "@vue/test-utils";
import App from "../App.vue";

describe("check if the app properly", () => {
  it("renders properly", () => {
    const wrapper = mount(App);
    expect(wrapper.text()).toContain("CS3 perspective playground");
    expect(wrapper.text()).toContain("perspective : 150 px");
    expect(wrapper.find('input[name="perspective"]')).toBeTruthy();
    expect(wrapper.text()).toContain("rotatex: 0 deg");
    expect(wrapper.find('input[name="rotatex"]')).toBeTruthy();
    expect(wrapper.text()).toContain("rotatey: 0 deg");
    expect(wrapper.find('input[name="rotatey"]')).toBeTruthy();
    expect(wrapper.text()).toContain("rotatez: 0 deg");
    expect(wrapper.find('input[name="rotatez"]')).toBeTruthy();
    expect(wrapper.find('input[type="reset"]')).toBeTruthy();
    expect(wrapper.find('input[type="button"]')).toBeTruthy();
    expect(wrapper.find("#square")).toBeTruthy();
  });
});

describe("check if the app is updated properly when we change input", () => {
  it("updated properly", async () => {
    const wrapper = mount(App);
    const newPerspective = 250;
    const newRotateX = 60;
    const newRotateY = 80;
    const newRotateZ = -75;
    const inputPerspective = wrapper.find('input[name="perspective"]');
    const inputRotateX = wrapper.find('input[name="rotatex"]');
    const inputRotateY = wrapper.find('input[name="rotatey"]');
    const inputRotateZ = wrapper.find('input[name="rotatez"]');
    const inputReset = wrapper.find('input[type="reset"]');

    // perpective input change
    await inputPerspective.setValue(newPerspective);
    expect(wrapper.text()).toContain(`perspective : ${newPerspective} px`);
    expect(wrapper.vm.customStyle).toStrictEqual({
      transform: `perspective(${newPerspective}px) rotateX(0deg) rotateY(0deg) rotateZ(0deg)`,
    });
    expect(wrapper.find("#square").attributes("style")).toStrictEqual(
      `transform: perspective(${newPerspective}px) rotateX(0deg) rotateY(0deg) rotateZ(0deg);`
    );

    // rotatex input change
    await inputRotateX.setValue(newRotateX);
    expect(wrapper.text()).toContain(`rotatex: ${newRotateX} deg`);
    expect(wrapper.vm.customStyle).toStrictEqual({
      transform: `perspective(${newPerspective}px) rotateX(${newRotateX}deg) rotateY(0deg) rotateZ(0deg)`,
    });
    expect(wrapper.find("#square").attributes("style")).toStrictEqual(
      `transform: perspective(${newPerspective}px) rotateX(${newRotateX}deg) rotateY(0deg) rotateZ(0deg);`
    );

    // rotatey input change
    await inputRotateY.setValue(newRotateY);
    expect(wrapper.text()).toContain(`rotatey: ${newRotateY} deg`);
    expect(wrapper.vm.customStyle).toStrictEqual({
      transform: `perspective(${newPerspective}px) rotateX(${newRotateX}deg) rotateY(${newRotateY}deg) rotateZ(0deg)`,
    });
    expect(wrapper.find("#square").attributes("style")).toStrictEqual(
      `transform: perspective(${newPerspective}px) rotateX(${newRotateX}deg) rotateY(${newRotateY}deg) rotateZ(0deg);`
    );

    // rotatez input change
    await inputRotateZ.setValue(newRotateZ);
    expect(wrapper.text()).toContain(`rotatez: ${newRotateZ} deg`);
    expect(wrapper.vm.customStyle).toStrictEqual({
      transform: `perspective(${newPerspective}px) rotateX(${newRotateX}deg) rotateY(${newRotateY}deg) rotateZ(${newRotateZ}deg)`,
    });
    expect(wrapper.find("#square").attributes("style")).toStrictEqual(
      `transform: perspective(${newPerspective}px) rotateX(${newRotateX}deg) rotateY(${newRotateY}deg) rotateZ(${newRotateZ}deg);`
    );

    // reset the form
    await inputReset.trigger("click");
    expect(wrapper.text()).toContain("perspective : 150 px");
    expect(wrapper.text()).toContain("rotatex: 0 deg");
    expect(wrapper.text()).toContain("rotatey: 0 deg");
    expect(wrapper.text()).toContain("rotatez: 0 deg");
    expect(wrapper.vm.customStyle).toStrictEqual({
      transform: `perspective(150px) rotateX(0deg) rotateY(0deg) rotateZ(0deg)`,
    });
    expect(wrapper.find("#square").attributes("style")).toStrictEqual(
      "transform: perspective(150px) rotateX(0deg) rotateY(0deg) rotateZ(0deg);"
    );
  });
});

describe("check if the copy button work properly", () => {
  it("copy properly", async () => {
    window.alert = () => {};
    Object.defineProperty(navigator, "clipboard", {
      value: {
        writeText: () => {},
      },
    });
    vi.spyOn(window, "alert");
    vi.spyOn(navigator.clipboard, "writeText");

    const wrapper = mount(App);
    await wrapper.find('input[type="button"]').trigger("click");
    expect(navigator.clipboard.writeText).toBeCalledWith(
      "transform: perspective(150px) rotateX(0deg) rotateY(0deg) rotateZ(0deg)"
    );
    expect(window.alert).toBeCalledWith(
      "The style as been copied to the Clipboard."
    );
  });
});
