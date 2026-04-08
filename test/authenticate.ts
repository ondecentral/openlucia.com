const firstName: string = "tester";
const lastName: string = "tester";
const email: string = "seeduser@openlucia.com";
const password: string = process.env.TEST_CLIENT_PASSWORD || "!Password1";

const greenLight: string = "\x1b[32m✔\x1b[0m"; // Green checkmark
const redLight: string = "\x1b[31m✘\x1b[0m"; // Red cross
const logResult = (testName: string, passed: boolean): void => {
  console.log(`${passed ? greenLight : redLight} ${testName}`);
};

const authenticate = async () => {
  const dotenv = require("dotenv");
  dotenv.config();
  try {
    // console.log("Running authenticate...");
    // Signup
    const apiUrl: string = `${process.env.NEXT_PUBLIC_API_URL}/api`;

    // Login
    const loginResponse = await fetch(`${apiUrl}/oauth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (loginResponse.status !== 200) {
      console.error(`${redLight} Login failed`);
      process.exit(1);
    }
    const loginData = await loginResponse.json();
    const token = loginData?.result?.token;
    // console.log(`${greenLight} Login success`);
    if (!token) {
      console.error(`${redLight} Failed to retrieve token`);
      process.exit(1);
    }
    console.log(token);
    return token;
  } catch (error: any) {
    console.error(`${redLight} Error during authentication:`, error.message);
    process.exit(1);
  }
};

authenticate();
