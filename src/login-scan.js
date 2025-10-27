import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const { BROWSERSTACK_USERNAME, BROWSERSTACK_ACCESS_KEY, BASE_URL } = process.env;

(async () => {
  console.log("🚀 Starting BrowserStack Accessibility Login Scan...");

  try {
    const payload = {
      name: "Login Protected Scan - BrowserStack",
      urlList: ["https://www.browserstack.com/users/sign_in"],
      authentication: {
        type: "form",
        formDetails: {
          url: "https://www.browserstack.com/users/sign_in",
          method: "POST",
          usernameField: "user[email]",
          passwordField: "user[password]",
          username: "<your_test_username>",
          password: "<your_test_password>"
        }
      }
    };

    const response = await axios.post(BASE_URL, payload, {
      auth: {
        username: BROWSERSTACK_USERNAME,
        password: BROWSERSTACK_ACCESS_KEY,
      },
      headers: { "Content-Type": "application/json" },
    });

    console.log("✅ Login-based scan started successfully!");
    console.log("Scan ID:", response.data.data.id);
  } catch (err) {
    if (err.response) {
      console.error("❌ Scan failed:");
      console.error("Status:", err.response.status);
      console.error("Data:", err.response.data);
    } else {
      console.error("❌ Network/Other Error:", err.message);
    }
  }
})();
