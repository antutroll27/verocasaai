import { Resend } from 'resend';

// Initialize Resend with your API key
const resend = new Resend(process.env.RESEND_API_KEY);

// Email template types
interface SubscriptionEmailProps {
  email: string;
  name: string;
  subscriptionType: string;
  nextBillingDate: Date;
  isRenewal?: boolean;
}

// Send subscription confirmation email
export async function sendSubscriptionEmail({
  email,
  name,
  subscriptionType,
  nextBillingDate,
  isRenewal = false,
}: SubscriptionEmailProps) {
  const formattedDate = nextBillingDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const isYearly = subscriptionType === 'yearly';
  const subscriptionPeriod = isYearly ? 'year' : 'month';
  const price = isYearly ? '$99.99' : '$9.99';

  const subject = isRenewal 
    ? `Your VerocasaAI subscription has been renewed`
    : `Welcome to VerocasaAI Premium!`;

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #0C2D57; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; background-color: #F9F9F9; }
        .footer { text-align: center; margin-top: 20px; font-size: 12px; color: #777; }
        .button { background-color: #FC6736; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px; display: inline-block; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>${isRenewal ? 'Subscription Renewed' : 'Subscription Confirmed'}</h1>
        </div>
        <div class="content">
          <p>Hello ${name},</p>
          
          ${isRenewal 
            ? `<p>Your VerocasaAI ${subscriptionType} subscription has been successfully renewed for another ${subscriptionPeriod}.</p>` 
            : `<p>Thank you for subscribing to VerocasaAI ${subscriptionType}! Your subscription has been successfully activated.</p>`
          }
          
          <p><strong>Subscription details:</strong></p>
          <ul>
            <li>Plan: ${subscriptionType}</li>
            <li>Price: ${price}/${subscriptionPeriod}</li>
            <li>Next billing date: ${formattedDate}</li>
          </ul>
          
          <p>With your premium subscription, you now have access to:</p>
          <ul>
            <li>Unlimited AI room redesigns</li>
            <li>Ad-free experience</li>
            <li>Premium customer support</li>
            <li>Early access to new features</li>
          </ul>
          
          <p style="text-align: center; margin-top: 30px;">
            <a href="https://verocasaai.com/dashboard" class="button">Go to My Dashboard</a>
          </p>
          
          <p>If you have any questions about your subscription or need assistance, please don't hesitate to contact our support team at support@verocasaai.com.</p>
          
          <p>Enjoy redesigning your rooms with VerocasaAI!</p>
          
          <p>Best regards,<br>The VerocasaAI Team</p>
        </div>
        <div class="footer">
          <p>© ${new Date().getFullYear()} VerocasaAI. All rights reserved.</p>
          <p>This email was sent to ${email} regarding your VerocasaAI subscription.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  try {
    const { data, error } = await resend.emails.send({
      from: 'VerocasaAI <noreply@verocasaai.com>',
      to: email,
      subject,
      html: htmlContent,
    });

    if (error) {
      console.error('Error sending email:', error);
      return false;
    }

    console.log('Email sent successfully:', data);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
}