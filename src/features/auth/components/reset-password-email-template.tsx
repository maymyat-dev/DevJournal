import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from 'react-email';

interface ResetPasswordEmailTemplateProps {
  userFirstname?: string;
  resetPasswordLink?: string;
}

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : process.env.BETTER_AUTH_URL;

export const ResetPasswordEmailTemplate = ({
  userFirstname,
  resetPasswordLink,
}: ResetPasswordEmailTemplateProps) => {
  return (
    <Html>
      <Head />
        <Body className="bg-[#f6f9fc] py-2.5">
          <Preview>Reset your password</Preview>
          <Container className="bg-white border border-solid border-[#f0f0f0] p-[45px]">

            <Section>
              <Text className="text-base font- font-light text-[#404040] leading-[26px]">
                Hi {userFirstname},
              </Text>
              <Text className="text-base font- font-light text-[#404040] leading-[26px]">
                Someone recently requested a password change for your
                account. If this was you, you can set a new password here:
              </Text>
              <Button
                className="bg-[#007ee6] rounded text-white text-[15px] no-underline text-center font--sans block w-52.5 py-3.5 px-1.75"
                href={resetPasswordLink}
              >
                Reset password
              </Button>
              <Text className="text-base font- font-light text-[#404040] leading-[26px]">
                If you don&apos;t want to change your password or didn&apos;t
                request this, just ignore and delete this message.
              </Text>
            </Section>
          </Container>
        </Body>
    </Html>
  );
};

ResetPasswordEmailTemplate.PreviewProps = {
  userFirstname: 'Alan',
  resetPasswordLink: 'https://www..com',
} as ResetPasswordEmailTemplateProps;


export default ResetPasswordEmailTemplate;
