import { expect, test } from "@playwright/test";

test.describe("Home page", () => {
  test("renders hero, application buttons, team, featured posts, stats, and CTA", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByRole("heading", { name: "STEMsterMinds", level: 1 })).toBeVisible();
    await expect(page.getByText(/Empowering youth/)).toBeVisible();

    await expect(page.getByRole("link", { name: "Volunteer Application" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Leadership Application" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Summer Internship Application" })).toBeVisible();

    await expect(page.getByRole("heading", { name: "Our Leaders" })).toBeVisible();
    await expect(page.getByText("Priya Nair")).toBeVisible();
    await expect(page.getByText("Founder & President")).toBeVisible();

    await expect(page.getByRole("heading", { name: "Featured Posts" })).toBeVisible();
    await expect(page.getByRole("link", { name: /5 Fun At-Home Science Experiments/ }).first()).toBeVisible();

    await expect(page.getByText("Students Reached")).toBeVisible();
    await expect(page.getByText("2,500+")).toBeVisible();

    await expect(page.getByRole("heading", { name: "Ready to Make an Impact?" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Become a Volunteer" })).toBeVisible();
  });

  test("application buttons point to the correct external URL and open in a new tab", async ({ page }) => {
    await page.goto("/");
    const link = page.getByRole("link", { name: "Volunteer Application" });
    await expect(link).toHaveAttribute("href", /stemsterminds-volunteer/);
    await expect(link).toHaveAttribute("target", "_blank");
    await expect(link).toHaveAttribute("rel", /noopener/);
  });

  test("card hover lifts the card (desktop)", async ({ page, isMobile }) => {
    test.skip(isMobile, "hover is a desktop interaction");
    await page.goto("/");
    const teamCard = page.getByRole("heading", { name: "Priya Nair" }).locator("..");
    const before = await teamCard.boundingBox();
    await teamCard.hover();
    await page.waitForTimeout(300);
    const after = await teamCard.boundingBox();
    expect(before).not.toBeNull();
    expect(after).not.toBeNull();
    if (before && after) {
      expect(after.y).toBeLessThan(before.y + 1);
    }
  });
});
