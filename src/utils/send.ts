import nodemailer, { Transporter } from "nodemailer";

type MailOptions = {
  from: string;
  to: string;
  subject: string;
  text: string;
  html: string;
};

const mailAddress = process.env.GMAIL;
const mailPassword = process.env.MAIL_PASSWORD;
const customSenderAddress =
  process.env.CUSTOM_SENDER_ADDRESS || "no-reply@medicalecomerce.com";
if (!mailAddress || !mailPassword) {
  throw new Error("Mail address and password must be defined in the config.");
}

const transporter: Transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: mailAddress,
    pass: mailPassword,
  },
});

const sendMail = (
  to: string,
  subject: string,
  text: string,
  html: string
): Promise<nodemailer.SentMessageInfo> => {
  const mailOptions: MailOptions = {
    from: `No Reply <${customSenderAddress}>`, // Use a display name with the custom sender address
    to,
    subject,
    text,
    html,
  };

  return transporter.sendMail(mailOptions);
};

export { sendMail };
