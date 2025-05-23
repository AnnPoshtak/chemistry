async function balanceEquation() {
    const equation = document.getElementById("equationInput").value;
    const output = document.getElementById("output");

    output.textContent = "Обробка…";

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
            "Authorization": "Bearer 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",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            model: "openai/gpt-3.5-turbo",
            messages: [
                {
                    role: "system",
                    content: "Ти асистент, який урівнює хімічні рівняння. Відповідай лише самим рівнянням, нічого більше."
                },
                {
                    role: "user",
                    content: `Урівняй це рівняння: ${equation}`
                }
            ]
        })
    });

    if (!response.ok) {
        output.textContent = "Помилка: не вдалося звернутися до API";
        return;
    }

    const data = await response.json();
    const result = data.choices?.[0]?.message?.content;

    output.textContent = result || "Помилка: немає відповіді";
}
