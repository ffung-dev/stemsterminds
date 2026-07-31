import { expect, test } from "@playwright/test";

test.describe("Blog listing", () => {
  test("search filters posts by title", async ({ page }) => {
    await page.goto("/blog");
    await page.getByTestId("blog-search").fill("scholarships");
    await expect(page.getByRole("link", { name: /Top 10 Scholarships for Aspiring Engineers/ }).first()).toBeVisible();
    await expect(page.getByRole("link", { name: /Meet Our 2026 Summer Interns/ })).toHaveCount(0);
  });

  test("category filter narrows results", async ({ page }) => {
    await page.goto("/blog");
    await page.getByTestId("blog-filter-category").selectOption("Organization Updates");
    await expect(page.getByRole("link", { name: /Meet Our 2026 Summer Interns/ }).first()).toBeVisible();
    await expect(page.getByRole("link", { name: /Top 10 Scholarships/ })).toHaveCount(0);
  });

  test("author filter narrows results", async ({ page }) => {
    await page.goto("/blog");
    await page.getByTestId("blog-filter-author").selectOption("Priya Nair");
    await expect(page.getByRole("link", { name: /Why Representation Matters/ }).first()).toBeVisible();
    await expect(page.getByRole("link", { name: /Meet Our 2026 Summer Interns/ })).toHaveCount(0);
  });

  test("combining filters with no matches shows empty state", async ({ page }) => {
    await page.goto("/blog");
    await page.getByTestId("blog-filter-category").selectOption("Opportunities");
    await page.getByTestId("blog-filter-author").selectOption("Priya Nair");
    await expect(page.getByTestId("blog-empty")).toBeVisible();
  });
});

test.describe("Blog post detail", () => {
  test("renders author, date, reading time, body, tags, related posts, and share buttons", async ({ page }) => {
    await page.goto("/blog/5-fun-at-home-science-experiments");

    await expect(page.getByRole("heading", { name: "5 Fun At-Home Science Experiments for Curious Kids" })).toBeVisible();
    await expect(page.getByText("By Ava Chen")).toBeVisible();
    await expect(page.getByText(/min read/)).toBeVisible();
    await expect(page.getByText("elementary", { exact: true })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Related Posts" })).toBeVisible();
    await expect(page.getByText("How to Start a Coding Club at Your School")).toBeVisible();

    await expect(page.getByRole("link", { name: "Share on X" })).toBeVisible();
    await expect(page.getByTestId("copy-link-button")).toBeVisible();
  });

  test("previous/next article navigation and back-to-blog work", async ({ page }) => {
    await page.goto("/blog/why-representation-matters-in-stem-education");

    await expect(page.getByText("Next", { exact: true })).toBeVisible();
    await page.getByText("Meet Our 2026 Summer Interns").click();
    await expect(page).toHaveURL(/\/blog\/meet-our-2026-summer-interns$/);

    await page.getByRole("link", { name: "Back to Blog" }).click();
    await expect(page).toHaveURL(/\/blog$/);
  });

  test("copy link button copies the post URL to the clipboard", async ({ page, context, browserName }) => {
    test.skip(browserName !== "chromium", "clipboard permissions API is chromium-specific");
    await context.grantPermissions(["clipboard-read", "clipboard-write"]);
    await page.goto("/blog/why-representation-matters-in-stem-education");

    await page.getByTestId("copy-link-button").click();
    const clipboardText = await page.evaluate(() => navigator.clipboard.readText());
    expect(clipboardText).toContain("/blog/why-representation-matters-in-stem-education");
  });

  test("unknown blog slug 404s", async ({ page }) => {
    const response = await page.goto("/blog/this-post-does-not-exist");
    expect(response?.status()).toBe(404);
  });
});
