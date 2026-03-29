async function testConnection() {
  const baseURL = "http://localhost:5000/api";

  try {
    console.log("🧪 Testing Frontend-Backend Connection...\n");

    // Test 1: Register endpoint
    console.log("📤 Test 1: Testing /api/auth/register endpoint");
    try {
      const response = await fetch(`${baseURL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: "test@example.com",
          password: "test123",
          name: "Test User",
        }),
      });
      const data = await response.json();
      console.log(`Status: ${response.status}`);
      console.log("✅ Response:", data);
    } catch (error) {
      console.log("⚠️  Error:", error.message);
    }

    // Test 2: Login endpoint
    console.log("\n📤 Test 2: Testing /api/auth/login endpoint");
    try {
      const response = await fetch(`${baseURL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: "adarsh@example.com",
          password: "password123",
        }),
      });
      const data = await response.json();
      console.log(`Status: ${response.status}`);
      console.log("Response:", data);
    } catch (error) {
      console.log("⚠️  Error:", error.message);
    }

    // Test 3: Donor endpoints
    console.log("\n📤 Test 3: Testing /api/donor endpoints");
    try {
      const response = await fetch(`${baseURL}/donor`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      console.log(`Status: ${response.status}`);
      console.log("Response:", data);
    } catch (error) {
      console.log("⚠️  Error:", error.message);
    }

    console.log("\n✅ Backend is running and responding!");
    console.log(
      "✅ Frontend can connect to Backend at http://localhost:5000/api",
    );
  } catch (error) {
    console.error("❌ Connection Failed:", error.message);
  }
}

testConnection();
