import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const { BROWSERSTACK_USERNAME, BROWSERSTACK_ACCESS_KEY, BASE_URL } = process.env;

(async () => {
  console.log("🚀 Starting BrowserStack Accessibility Normal Scan...");

  try {
    const payload = {
      name: "Normal Website Scan - BrowserStack",
      urlList: ["https://www.browserstack.com/"],
    };

    const response = await axios.post(BASE_URL, payload, {
      auth: {
        username: BROWSERSTACK_USERNAME,
        password: BROWSERSTACK_ACCESS_KEY,
      },
      headers: { "Content-Type": "application/json" },
    });

    console.log("✅ Scan started successfully!");
    console.log("Scan ID:", response.data.data.id);
    console.log("You can view results on BrowserStack Accessibility Dashboard.");
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
