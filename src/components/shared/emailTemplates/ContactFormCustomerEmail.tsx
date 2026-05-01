import {
  Body,
  Container,
  Head,
  Html,
  Hr,
  Preview,
  Section,
  Text,
} from "@react-email/components";

const BEIGE = "#ffefe2";
const BLACK = "#15100d";
const BROWN = "#906059";
const WHITE = "#ffffff";
const BEIGE_LIGHT = "#fff4eb";
const BORDER = "rgba(21, 16, 13, 0.12)";

type ContactFormCustomerEmailProps = {
  name?: string;
  phone?: string;
  email: string;
  message?: string;
  date?: string;
};

export function ContactFormCustomerEmail({
  name,
  phone,
  email,
  message,
  date,
}: ContactFormCustomerEmailProps) {
  return (
    <Html lang="da">
      <Head>
        <meta name="color-scheme" content="light" />
        <meta name="supported-color-schemes" content="light" />
      </Head>
      <Preview>Tak for din henvendelse — Boulevard Beauty Salon</Preview>
      <Body style={main}>
        <Container style={outer}>
          <Section style={card}>
            <Text style={brandMark}>✦</Text>
            <Text style={brand}>Boulevard</Text>
            <Text style={tagline}>Beauty Salon · Horsens</Text>

            <Hr style={divider} />

            <Text style={h1}>Tak for din henvendelse</Text>
            <Text style={lead}>
              Vi har modtaget din besked og vender tilbage til dig hurtigst muligt.
            </Text>

            <Section style={infoBox}>
              <Text style={infoTitle}>Dine oplysninger</Text>
              {name ? (
                <Text style={row}>
                  <strong style={labelStrong}>Navn:</strong> {name}
                </Text>
              ) : null}
              {phone ? (
                <Text style={row}>
                  <strong style={labelStrong}>Telefon:</strong> {phone}
                </Text>
              ) : null}
              <Text style={row}>
                <strong style={labelStrong}>E-mail:</strong> {email}
              </Text>
              {message ? (
                <Section style={messageBlock}>
                  <Text style={messageLabel}>Besked</Text>
                  <Text style={messageText}>{message}</Text>
                </Section>
              ) : null}
            </Section>

            {date ? (
              <Text style={meta}>
                Sendt den <span style={metaStrong}>{date}</span>
              </Text>
            ) : null}

            <Hr style={dividerMuted} />

            <Text style={footerNote}>
              Denne e-mail er sendt automatisk. Du behøver ikke svare på den.
            </Text>
            <Text style={footerBrand}>© Boulevard Beauty Salon · Horsens</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const main = {
  margin: 0,
  padding: "40px 20px",
  backgroundColor: BEIGE,
  fontFamily:
    'Montserrat, "Segoe UI", Helvetica, Arial, sans-serif',
  WebkitFontSmoothing: "antialiased" as const,
};

const outer = {
  maxWidth: "560px",
  margin: "0 auto",
};

const card = {
  backgroundColor: WHITE,
  borderRadius: "24px",
  border: `1px solid ${BORDER}`,
  padding: "40px 32px 36px",
  boxShadow: "0 12px 40px rgba(21, 16, 13, 0.06)",
};

const brandMark = {
  margin: "0 0 4px 0",
  fontSize: "14px",
  lineHeight: "1",
  color: BROWN,
  textAlign: "center" as const,
};

const brand = {
  margin: "0",
  fontSize: "22px",
  lineHeight: "120%",
  fontWeight: 400,
  letterSpacing: "0.12em",
  textTransform: "uppercase" as const,
  color: BLACK,
  textAlign: "center" as const,
};

const tagline = {
  margin: "8px 0 0 0",
  fontSize: "11px",
  lineHeight: "140%",
  letterSpacing: "0.08em",
  textTransform: "uppercase" as const,
  color: BROWN,
  textAlign: "center" as const,
};

const divider = {
  border: "none",
  borderTop: `1px solid ${BORDER}`,
  margin: "28px 0 28px 0",
};

const dividerMuted = {
  border: "none",
  borderTop: `1px solid ${BORDER}`,
  margin: "28px 0 20px 0",
};

const h1 = {
  margin: "0 0 12px 0",
  fontSize: "24px",
  lineHeight: "120%",
  fontWeight: 400,
  letterSpacing: "0.06em",
  textTransform: "uppercase" as const,
  color: BLACK,
  textAlign: "center" as const,
};

const lead = {
  margin: "0 0 28px 0",
  fontSize: "15px",
  lineHeight: "160%",
  fontWeight: 300,
  color: BLACK,
  textAlign: "center" as const,
};

const infoBox = {
  backgroundColor: BEIGE_LIGHT,
  borderRadius: "16px",
  border: `1px solid ${BORDER}`,
  padding: "24px 22px",
};

const infoTitle = {
  margin: "0 0 18px 0",
  fontSize: "12px",
  lineHeight: "120%",
  letterSpacing: "0.14em",
  textTransform: "uppercase" as const,
  color: BROWN,
  fontWeight: 500,
};

const row = {
  margin: "0 0 14px 0",
  fontSize: "14px",
  lineHeight: "150%",
  color: BLACK,
};

const labelStrong = {
  color: BROWN,
  fontWeight: 600,
  fontSize: "12px",
  letterSpacing: "0.06em",
  textTransform: "uppercase" as const,
};

const messageBlock = {
  marginTop: "18px",
  paddingTop: "18px",
  borderTop: `1px solid ${BORDER}`,
};

const messageLabel = {
  margin: "0 0 8px 0",
  fontSize: "12px",
  lineHeight: "120%",
  letterSpacing: "0.14em",
  textTransform: "uppercase" as const,
  color: BROWN,
  fontWeight: 500,
};

const messageText = {
  margin: "0",
  fontSize: "14px",
  lineHeight: "168%",
  color: BLACK,
  fontWeight: 300,
  whiteSpace: "pre-wrap" as const,
};

const meta = {
  margin: "24px 0 0 0",
  fontSize: "12px",
  lineHeight: "150%",
  color: BROWN,
  textAlign: "center" as const,
};

const metaStrong = {
  color: BLACK,
  fontWeight: 500,
};

const footerNote = {
  margin: "0 0 12px 0",
  fontSize: "11px",
  lineHeight: "150%",
  color: BROWN,
  textAlign: "center" as const,
};

const footerBrand = {
  margin: "0",
  fontSize: "11px",
  lineHeight: "150%",
  letterSpacing: "0.06em",
  textTransform: "uppercase" as const,
  color: BLACK,
  textAlign: "center" as const,
  opacity: 0.85,
};
