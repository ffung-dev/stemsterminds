import { expect, test } from "@playwright/test";

test.describe("Contact page", () => {
  test("renders hero, contact info, and social links", async ({ page }) => {
    await page.goto("/contact");
    await expect(page.getByRole("heading", { name: "Contact Us" })).toBeVisible();
    await expect(page.getByRole("link", { name: "stemsterminds@gmail.com" }).first()).toBeVisible();
  });

  test("submitting an empty form shows validation errors for every field", async ({ page }) => {
    await page.goto("/contact");
    const form = page.locator("form");
    await form.getByRole("button", { name: "Send Message" }).click();

    await expect(page.getByTestId("name-error")).toBeVisible();
    await expect(page.getByTestId("email-error")).toBeVisible();
    await expect(page.getByTestId("subject-error")).toBeVisible();
    await expect(page.getByTestId("message-error")).toBeVisible();
  });

  test("an invalid email shows a field-specific error", async ({ page }) => {
    await page.goto("/contact");
    const form = page.locator("form");
    await form.getByLabel("Name").fill("Jamie Rivera");
    await form.getByLabel("Email").fill("not-an-email");
    await form.getByLabel("Subject").fill("Question about volunteering");
    await form.getByLabel("Message").fill("Hello, I would like to learn more.");
    await form.getByRole("button", { name: "Send Message" }).click();

    await expect(page.getByTestId("email-error")).toContainText("valid email");
  });

  test("a valid submission shows a success message", async ({ page }) => {
    await page.goto("/contact");
    const form = page.locator("form");
    await form.getByLabel("Name").fill("Jamie Rivera");
    await form.getByLabel("Email").fill("jamie@example.com");
    await form.getByLabel("Subject").fill("Question about volunteering");
    await form.getByLabel("Message").fill("Hello, I would like to learn more about volunteering opportunities.");
    await form.getByRole("button", { name: "Send Message" }).click();

    await expect(page.getByTestId("contact-success")).toBeVisible({ timeout: 10_000 });
  });

  test("FAQ preview accordion works and links to the Volunteer page", async ({ page }) => {
    await page.goto("/contact");
    const link = page.getByRole("link", { name: "Visit the Volunteer page" });
    await expect(link).toBeVisible();
    await link.click();
    await expect(page).toHaveURL(/\/volunteer$/);
  });
});
