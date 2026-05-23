import ResetPasswordEmailTemplate from "@/features/auth/components/reset-password-email-template";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface Options {
  to: string;
  subject: string;
  resetPasswordLink: string;
  userFirstname: string;
}

export async function sendEmail({
  to,
  subject,
  resetPasswordLink,
  userFirstname,
}: Options) {
  try {
    const { data, error } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to,
      subject,
      react: ResetPasswordEmailTemplate({
        userFirstname,
        resetPasswordLink,
      }),
    });

    if (error) {
      throw new Error(error.message);
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }

    throw new Error(String(error));
  }
}
