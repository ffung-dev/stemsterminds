import { expect, test } from "@playwright/test";

test.describe("About page", () => {
  test("renders mission, vision, and values", async ({ page }) => {
    await page.goto("/about");
    await expect(page.getByRole("heading", { name: "About STEMsterMinds" })).toBeVisible();
    await expect(page.getByText(/youth-led nonprofit organization/)).toBeVisible();
    await expect(page.getByRole("heading", { name: "Our Vision" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "We Value..." })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Accessibility" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Inclusion" })).toBeVisible();
  });
});

test.describe("Volunteer page", () => {
  test("renders opportunities, benefits, application CTA, and FAQ accordion", async ({ page }) => {
    await page.goto("/volunteer");

    await expect(page.getByRole("heading", { name: "Volunteer With STEMsterMinds" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Volunteer Opportunities" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Teaching" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Curriculum Development" })).toBeVisible();

    await expect(page.getByRole("heading", { name: "What You'll Gain" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Real Impact" })).toBeVisible();

    const applyButton = page.getByRole("link", { name: "Apply Now" });
    await expect(applyButton).toBeVisible();
    await expect(applyButton).toHaveAttribute("href", /stemsterminds-volunteer/);

    // FAQ accordion: closed by default, opens on click, only one entry visible at a time.
    const question = page.getByRole("button", { name: /How much time do I need to commit/ });
    const answerText = page.getByText(/Most roles require 2–4 hours/);
    await expect(answerText).toBeHidden();
    await question.click();
    await expect(answerText).toBeVisible();
    await expect(question).toHaveAttribute("aria-expanded", "true");
    await question.click();
    await expect(answerText).toBeHidden();
  });
});
