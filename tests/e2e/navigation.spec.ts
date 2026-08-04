import { expect, test } from "@playwright/test";

test.describe("Global navigation", () => {
  test("desktop nav links navigate to the right pages", async ({ page, isMobile }) => {
    test.skip(isMobile, "desktop-only nav bar");
    await page.goto("/");

    const nav = page.getByRole("navigation", { name: "Primary" });
    await expect(nav.getByRole("link", { name: "About" })).toBeVisible();

    await nav.getByRole("link", { name: "About" }).click();
    await expect(page).toHaveURL(/\/about$/);

    await nav.getByRole("link", { name: "Volunteer" }).click();
    await expect(page).toHaveURL(/\/volunteer$/);

    await nav.getByRole("link", { name: "Events" }).click();
    await expect(page).toHaveURL(/\/events$/);

    await nav.getByRole("link", { name: "Research", exact: true }).click();
    await expect(page).toHaveURL(/\/blog$/);

    await nav.getByRole("link", { name: "Contact" }).click();
    await expect(page).toHaveURL(/\/contact$/);
  });

  test("mobile menu opens and closes with animation, and closes on navigation", async ({ page, isMobile }) => {
    test.skip(!isMobile, "mobile-only menu");
    await page.goto("/");

    const menuButton = page.getByTestId("mobile-menu-button");
    const menu = page.getByTestId("mobile-menu");

    await expect(menu).toBeHidden();
    await menuButton.click();
    await expect(menu).toBeVisible();

    await menu.getByRole("link", { name: "About" }).click();
    await expect(page).toHaveURL(/\/about$/);
    await expect(menu).toBeHidden();
  });

  test("mobile menu closes on Escape and outside click", async ({ page, isMobile }) => {
    test.skip(!isMobile, "mobile-only menu");
    await page.goto("/");

    const menuButton = page.getByTestId("mobile-menu-button");
    const menu = page.getByTestId("mobile-menu");

    await menuButton.click();
    await expect(menu).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(menu).toBeHidden();

    await menuButton.click();
    await expect(menu).toBeVisible();
    await page.mouse.click(5, 5);
    await expect(menu).toBeHidden();
  });

  test("dark mode toggle switches theme and persists across reload", async ({ page }) => {
    await page.goto("/");
    const toggle = page.getByTestId("theme-toggle");
    const html = page.locator("html");

    await expect(html).not.toHaveClass(/dark/);
    await toggle.click();
    await expect(html).toHaveClass(/dark/);

    await page.reload();
    await expect(html).toHaveClass(/dark/);

    await page.getByTestId("theme-toggle").click();
    await expect(html).not.toHaveClass(/dark/);
  });

  test("fun fact panel is collapsed by default and expands/collapses on toggle", async ({ page, isMobile }) => {
    test.skip(isMobile, "fun fact panel is desktop-only");
    await page.goto("/");

    const toggle = page.getByTestId("fun-fact-toggle");
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
    await expect(page.getByText("Did You Know?")).toBeHidden();

    await toggle.click();
    await expect(toggle).toHaveAttribute("aria-expanded", "true");
    await expect(page.getByText("Did You Know?")).toBeVisible();

    await toggle.click();
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
  });

  test("scroll-to-top button appears after scrolling and returns to top", async ({ page }) => {
    await page.goto("/blog");
    const scrollButton = page.getByTestId("scroll-to-top");
    await expect(scrollButton).toBeHidden();

    await page.mouse.wheel(0, 1200);
    await expect(scrollButton).toBeVisible();

    await scrollButton.click();
    await expect(async () => {
      const scrollY = await page.evaluate(() => window.scrollY);
      expect(scrollY).toBeLessThan(50);
    }).toPass();
  });

  test("unknown route renders the custom 404 page", async ({ page }) => {
    const response = await page.goto("/this-page-does-not-exist");
    expect(response?.status()).toBe(404);
    await expect(page.getByRole("heading", { name: "404" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Back to Home" })).toBeVisible();
  });

  test("footer renders organization info and quick links", async ({ page }) => {
    await page.goto("/");
    const footer = page.locator("footer");
    await expect(footer.getByText("STEMsterMinds").first()).toBeVisible();
    await expect(footer.getByRole("link", { name: "Research", exact: true })).toBeVisible();
  });
});
