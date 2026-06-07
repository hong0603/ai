export default async function handler(req, res) {

  const { story } = req.body;

  const response = await fetch(
    "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct",
    {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.HF_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        inputs: `
너는 유튜브 쇼츠 작가야.
아래 줄거리를 30~60초 쇼츠 대본으로 만들어줘.

줄거리:
${story}
        `
      })
    }
  );

  const data = await response.json();

  res.status(200).json({
    result: data[0]?.generated_text || "생성 실패"
  });
}