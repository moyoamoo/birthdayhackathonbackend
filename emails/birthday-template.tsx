import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "";

export const BirthdayReminderEmail = () => (
  <Html>
    <Head />

    <Preview>Don't forget it's Manzi's Birthday in 360 days! </Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={box}>
          <Img
            src={`https://gcdnb.pbrd.co/images/AOg2axderXPh.png?o=1`}
            width="64"
            height="64"
            alt="cake"
          />
          <Heading style={h1}>You have a birthday coming up!</Heading>
          <Hr style={hr} />
          <Text style={paragraph}>Manzi's Birthday is in 360 days!</Text>
          <Text style={paragraph}>
            Here are some gift ideas they might be interested in:
          </Text>
          <Button style={button} href="#">
            Gift Ideas
          </Button>
          <Hr style={hr} />
          <Text style={paragraph}>
            If you need to make changes to this reminder, you can do so{" "}
            <Link style={anchor} href="#">
              here
            </Link>
            .
          </Text>
          <Text style={paragraph}>— #TeamSZMM</Text>
          <Hr style={hr} />
          <Text style={footer}>AnniverSay</Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

export default BirthdayReminderEmail;

const main = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const h1 = {
  color: "#525f7f",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: "24px",
  fontWeight: "bold",
  margin: "40px 0",
  padding: "0",
};

const container = {
  backgroundColor: "#ADD8E6",
  margin: "0 auto",
  padding: "20px 0 48px",
  marginBottom: "64px",
};

const box = {
  padding: "0 48px",
};

const hr = {
  borderColor: "#e6ebf1",
  margin: "20px 0",
};

const paragraph = {
  color: "#525f7f",

  fontSize: "16px",
  lineHeight: "24px",
  textAlign: "left" as const,
};

const anchor = {
  color: "#556cd6",
};

const button = {
  backgroundColor: "#BA5E00",
  borderRadius: "5px",
  color: "#fff",
  fontSize: "16px",
  fontWeight: "bold",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  width: "100%",
  padding: "10px",
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
  lineHeight: "16px",
};
