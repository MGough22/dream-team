import axios from "axios";

const API_URL = "https://m1k3wn-nidra.hf.space";

export async function fetchDreamResponse(userDream, responseType) {
  const MODEL_TYPES = {
    jungianMystic: "nidra-v1",
    balanced: "nidra-v2",
    default: "nidra-v1",
  };

  const modelType = MODEL_TYPES[responseType] || MODEL_TYPES.default;

  try {
    // Test predict endpoint - DEV
    console.log("\nFetching dream response...");
    const predictData = {
      model: modelType,
      inputs: userDream,
    };
    console.log("Sending request with data:", predictData);

    const predictResponse = await axios.post(
      API_URL + "/predict",
      predictData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    // console.log("Predict response:", predictResponse.data);
    return predictResponse.data.generated_text;
  } catch (error) {
    // Verbose debugging error logging
    console.error("Error details:", {
      endpoint: error.config?.url,
      status: error.response?.status,
      statusText: error.response?.statusText,
      message: error.response?.data?.detail || error.message,
      requestData: error.config?.data,
      headers: error.config?.headers,
    });
    throw error;
  }
}

// console.log(fetchDreamResponse(userDream, responseType));
