import express from "express";
import AWS from "aws-sdk";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(".")); 

// Cấu hình AWS
AWS.config.update({
  region: "us-east-1",
  accessKeyId: "AKIA6H7KVP7ILJJOXWOW",
  secretAccessKey: "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",
});

const comprehend = new AWS.Comprehend();

// API phân tích cảm xúc
app.post("/analyze", async (req, res) => {
  try {
    const { text } = req.body;
    const params = { LanguageCode: "en", Text: text };
    const result = await comprehend.detectSentiment(params).promise();
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () =>
  console.log("Server running on http://localhost:3000")
);
