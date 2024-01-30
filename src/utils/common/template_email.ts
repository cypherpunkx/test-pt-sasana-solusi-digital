function templateVerificationLink(link: string) {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>


          body {
              font-family: Arial, sans-serif;
              background-color: #f4f4f4;
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100vh;
              margin: 0;
          }

          a {
            text-decoration:none
          }
  
          .email-container {
              text-align: center;
              background-color: #fff;
              border-radius: 8px;
              padding: 20px;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
              max-width: 400px;
              width: 100%;
          }
  
          .verification-link {
              display: block;
              margin-top: 20px;
              padding: 10px;
              background-color: #007bff;
              color: #fff;
              text-decoration: none;
              border-radius: 5px;
          }
      </style>
      <title>Email Verification</title>
  </head>
  <body>
      <div class="container">
          <div class="row justify-content-center">
              <div class="col-md-6 email-container">
                  <h2 class="mb-4">Verify Your Email</h2>
                  <p>Thank you for registering! To complete your registration, please click the link below to verify your email:</p>
                  <a class="verification-link" href=${link}>Verify Email</a>
              </div>
          </div>
      </div>
  </body>
  </html>
  
    `;
}

function templateSendOTP(otp: string) {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
          body {
              font-family: Arial, sans-serif;
              background-color: #f4f4f4;
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100vh;
              margin: 0;
          }
  
          .otp-container {
              text-align: center;
              background-color: #fff;
              border-radius: 8px;
              padding: 20px;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
              max-width: 400px;
              width: 100%;
          }
  
          .otp-code {
              font-size: 24px;
              font-weight: bold;
              margin-bottom: 20px;
          }
  
          .note {
              margin-bottom: 20px;
          }
      </style>
      <title>OTP Verification</title>
  </head>
  <body>
      <div class="container">
          <div class="row justify-content-center">
              <div class="col-md-6 otp-container">
                  <h2 class="mb-4">Your OTP Code</h2>
                  <p class="otp-code">${otp}</p>
                  <p class="note">Use the above code to complete your login process. This code will expire in 5 minutes.</p>
              </div>
          </div>
      </div>
  </body>
  </html>
  
  `;
}

function templateForgotPassword(email: string, link: string) {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Forgot Password - Reset Link</title>
  </head>
  <body>
    <p>Dear User, ${email}</p>
    <p>You have requested to reset your password. Click the link below to reset your password:</p>
    <a href=${link} >Reset Password</a>
    <p>If you didn't request this, please ignore this email.</p>
    <p>Best regards,<br>Your App Team</p>
  </body>
  </html>
  `;
}

export { templateVerificationLink, templateSendOTP, templateForgotPassword };
