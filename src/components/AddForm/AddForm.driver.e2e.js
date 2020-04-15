import { testIds } from "./testIds";

const combineSelectors = (...selectors) =>
  selectors.map((selector) => `[data-testid="${selector}"]`).join(" ");

const addFocus = async (page, ...selectors) =>
  await page.focus(combineSelectors(...selectors));

const fillInput = async (page, value) =>
  await page.keyboard.type(String(value));

const enterPress = async (page) => await page.keyboard.press("Enter");

export const driver = (page) => ({
  addItem: async (name, amount) => {
    await addFocus(page, testIds.inputName);
    await fillInput(page, name);

    await addFocus(page, testIds.inputAmount);
    await fillInput(page, amount);
  },
  enterPress: async () => enterPress(page),
});
