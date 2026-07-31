import { expect, test } from "@playwright/test";

test.describe("Events page", () => {
  test("upcoming tab is selected by default and past tab shows past events", async ({ page }) => {
    await page.goto("/events");

    await expect(page.getByTestId("events-tab-upcoming")).toBeVisible();
    await expect(page.getByRole("link", { name: /Coding for Beginners/ }).first()).toBeVisible();
    await expect(page.getByText(/Intro to Robotics Workshop/)).toHaveCount(0);

    await page.getByTestId("events-tab-past").click();
    await expect(page.getByRole("link", { name: /Intro to Robotics Workshop/ }).first()).toBeVisible();
    await expect(page.getByRole("link", { name: /Coding for Beginners/ })).toHaveCount(0);
  });

  test("registration status badges render correctly", async ({ page }) => {
    await page.goto("/events");
    await expect(page.getByTestId("event-status").filter({ hasText: "Registration Open" }).first()).toBeVisible();
    await expect(page.getByTestId("event-status").filter({ hasText: "Full" }).first()).toBeVisible();

    await page.getByTestId("events-tab-past").click();
    await expect(page.getByTestId("event-status").filter({ hasText: "Cancelled" }).first()).toBeVisible();
  });

  test("search filters events by title", async ({ page }) => {
    await page.goto("/events");
    await page.getByTestId("events-search").fill("python");
    await expect(page.getByRole("link", { name: /Coding for Beginners: Python Workshop/ }).first()).toBeVisible();
    await expect(page.getByRole("link", { name: /STEM Career Panel/ })).toHaveCount(0);

    await page.getByTestId("events-search").fill("no such event zzz");
    await expect(page.getByTestId("events-empty")).toBeVisible();
  });

  test("clicking an event card opens its detail page with full info, then Back to Events works", async ({ page }) => {
    await page.goto("/events");
    await page.getByRole("link", { name: /Coding for Beginners: Python Workshop/ }).first().click();

    await expect(page).toHaveURL(/\/events\/coding-for-beginners-python-workshop$/);
    await expect(page.getByRole("heading", { name: "Coding for Beginners: Python Workshop" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Schedule" })).toBeVisible();
    await expect(page.getByText("Build a Guessing Game")).toBeVisible();
    await expect(page.getByRole("heading", { name: "Speakers" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Register Now" })).toBeVisible();

    await page.getByRole("link", { name: "Back to Events" }).click();
    await expect(page).toHaveURL(/\/events$/);
  });
});
