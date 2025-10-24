const { chromium } = require("playwright");
const dotenv = require("dotenv");
dotenv.config();

const runBotTests = async () => {
  const apiUrl: string = `${process.env.NEXT_PUBLIC_API_URL}/api`;
  const greenLight: string = "\x1b[32m✔\x1b[0m"; // Green checkmark
  const redLight: string = "\x1b[31m✘\x1b[0m"; // Red cross
  let allTestsPassed: boolean = true;
  const token = process.env.TOKEN;
  const bots = [
    {
      userAgent:
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
      viewport: { width: 1710, height: 1107 },
      deviceScaleFactor: 2,
      isMobile: false,
      locale: "en-US",
      timezoneId: "America/New_York",
      plugins: [
        { name: "PDF Viewer" },
        { name: "Chrome PDF Viewer" },
        { name: "Chromium PDF Viewer" },
        { name: "Microsoft Edge PDF Viewer" },
        { name: "WebKit built-in PDF" },
      ],
      hardwareConcurrency: 8,
      deviceMemory: 8,
    },
    {
      userAgent:
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Safari/605.1.15",
      viewport: { width: 1710, height: 1107 },
      deviceScaleFactor: 2,
      isMobile: false,
      locale: "en-US",
      timezoneId: "America/New_York",
      plugins: [
        { name: "PDF Viewer" },
        { name: "Chrome PDF Viewer" },
        { name: "Chromium PDF Viewer" },
        { name: "Microsoft Edge PDF Viewer" },
        { name: "WebKit built-in PDF" },
      ],
      hardwareConcurrency: 8,
      deviceMemory: 8,
    },
    {
      userAgent:
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36 OPR/115.0.0.0",
      viewport: { width: 1710, height: 1107 },
      deviceScaleFactor: 2,
      isMobile: false,
      locale: "en-US",
      timezoneId: "America/New_York",
      plugins: [
        { name: "PDF Viewer" },
        { name: "Chrome PDF Viewer" },
        { name: "Chromium PDF Viewer" },
        { name: "Microsoft Edge PDF Viewer" },
        { name: "WebKit built-in PDF" },
      ],
      hardwareConcurrency: 8,
      deviceMemory: 8,
    },
    {
      userAgent:
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:133.0) Gecko/20100101 Firefox/133.0",
      viewport: { width: 1710, height: 1107 },
      deviceScaleFactor: 2,
      isMobile: false,
      locale: "en-US",
      timezoneId: "America/New_York",
      plugins: [
        { name: "PDF Viewer" },
        { name: "Chrome PDF Viewer" },
        { name: "Chromium PDF Viewer" },
        { name: "Microsoft Edge PDF Viewer" },
        { name: "WebKit built-in PDF" },
      ],
      hardwareConcurrency: 8,
      deviceMemory: 8,
    },
    {
      userAgent:
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Cypress/13.17.0 Chrome/118.0.5993.159 Electron/27.3.10 Safari/537.36",
      viewport: { width: 1710, height: 1107 },
      deviceScaleFactor: 2,
      isMobile: false,
      locale: "en-US",
      timezoneId: "America/New_York",
      plugins: [
        { name: "PDF Viewer" },
        { name: "Chrome PDF Viewer" },
        { name: "Chromium PDF Viewer" },
        { name: "Microsoft Edge PDF Viewer" },
        { name: "WebKit built-in PDF" },
      ],
      hardwareConcurrency: 8,
      deviceMemory: 8,
    },
    {
      userAgent:
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
      viewport: { width: 1710, height: 1107 },
      deviceScaleFactor: 2,
      isMobile: false,
      locale: "en-US",
      timezoneId: "America/New_York",
      plugins: [
        { name: "PDF Viewer" },
        { name: "Chrome PDF Viewer" },
        { name: "Chromium PDF Viewer" },
        { name: "Microsoft Edge PDF Viewer" },
        { name: "WebKit built-in PDF" },
      ],
      hardwareConcurrency: 8,
      deviceMemory: 8,
    },
    {
      userAgent:
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Safari/605.1.15",
      viewport: { width: 1710, height: 1107 },
      deviceScaleFactor: 2,
      isMobile: false,
      locale: "en-US",
      timezoneId: "America/New_York",
      plugins: [
        { name: "PDF Viewer" },
        { name: "Chrome PDF Viewer" },
        { name: "Chromium PDF Viewer" },
        { name: "Microsoft Edge PDF Viewer" },
        { name: "WebKit built-in PDF" },
      ],
      hardwareConcurrency: 8,
      deviceMemory: 8,
    },
    {
      userAgent:
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36 OPR/115.0.0.0",
      viewport: { width: 1710, height: 1107 },
      deviceScaleFactor: 2,
      isMobile: false,
      locale: "en-US",
      timezoneId: "America/New_York",
      plugins: [
        { name: "PDF Viewer" },
        { name: "Chrome PDF Viewer" },
        { name: "Chromium PDF Viewer" },
        { name: "Microsoft Edge PDF Viewer" },
        { name: "WebKit built-in PDF" },
      ],
      hardwareConcurrency: 8,
      deviceMemory: 8,
    },
    {
      userAgent:
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:133.0) Gecko/20100101 Firefox/133.0",
      viewport: { width: 1710, height: 1107 },
      deviceScaleFactor: 2,
      isMobile: false,
      locale: "en-US",
      timezoneId: "America/New_York",
      plugins: [
        { name: "PDF Viewer" },
        { name: "Chrome PDF Viewer" },
        { name: "Chromium PDF Viewer" },
        { name: "Microsoft Edge PDF Viewer" },
        { name: "WebKit built-in PDF" },
      ],
      hardwareConcurrency: 8,
      deviceMemory: 8,
    },
    {
      userAgent:
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Cypress/13.17.0 Chrome/118.0.5993.159 Electron/27.3.10 Safari/537.36",
      viewport: { width: 1710, height: 1107 },
      deviceScaleFactor: 2,
      isMobile: false,
      locale: "en-US",
      timezoneId: "America/New_York",
      plugins: [
        { name: "PDF Viewer" },
        { name: "Chrome PDF Viewer" },
        { name: "Chromium PDF Viewer" },
        { name: "Microsoft Edge PDF Viewer" },
        { name: "WebKit built-in PDF" },
      ],
      hardwareConcurrency: 8,
      deviceMemory: 8,
    },
  ];

  const logResult = (testName: string, passed: boolean): void => {
    console.log(`${passed ? greenLight : redLight} ${testName}`);
    if (!passed) allTestsPassed = false;
  };
  function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  const browser = await chromium.launch({ headless: true });

  try {
    console.log("Running bot tests...");
    // Step 1: Bot Testing
    const runBotTests = async (token: string): Promise<any> => {
      for (const bot of bots) {
        const context = await browser.newContext(bot);
        const page = await context.newPage();
        await page.goto("http://localhost:3000", { waitUntil: "load" });
        const firstButton = page.locator("button").first();
        await firstButton.waitFor({ state: "attached" });
      }
      await sleep(2000); // Wait for the last visit to be sent to the server
      const fingerprints = await fetch(`${apiUrl}/dashboard/fingerprints`, {
        headers: { authorization: `Bearer ${token}` },
      });
      const views = await fetch(`${apiUrl}/dashboard/views/1M`, {
        headers: { authorization: `Bearer ${token}` },
      });
      console.log("views", views.status);
      // return {}
      return {
        fingerprints:
          fingerprints.status !== 200 ? null : await fingerprints.json(),
        views: views.status !== 200 ? null : await views.json(),
      };
    };

    const { fingerprints, views } = await runBotTests(token as string);
    if (fingerprints === null) {
      throw new Error("Failed to fetch fingerprints data");
    }
    // if(views === null) {
    //   throw new Error("Failed to fetch views data");
    // }
    logResult(
      "Test: fingerprints length validation, fingerprints: " +
        fingerprints.length,
      fingerprints.length >= bots.length,
    );
    // logResult("Test: views length validation, views: " + views.length, views.length >= bots.length);
    if (fingerprints.length < bots.length) {
      process.exit(1);
    }
    // if(views.length < bots.length) {
    //   process.exit(1);
    // }

    // Step : Validate Fingerprints
    const validateFingerprints = (fingerprints: any[]): boolean => {
      return fingerprints.every(
        (el) => el.lucia_user_id === fingerprints[0].lucia_user_id,
      );
    };

    const fingerprintValidationPassed: boolean =
      validateFingerprints(fingerprints);
    // logResult("Test: fingerprint consistency test", fingerprintValidationPassed);
    // if (!fingerprintValidationPassed) throw new Error("Fingerprints are inconsistent");

    // All tests passed
    if (allTestsPassed) {
      console.log(`${greenLight} All tests passed!`);
    }
    process.exit(0);
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    console.error(`${redLight} Test suite failed: ${errorMessage}`);
    process.exit(1);
  } finally {
    await browser.close();
  }
};

runBotTests();
