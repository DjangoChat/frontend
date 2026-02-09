import { Box, Button, Container, Stack, Typography } from "@mui/joy"
import { useIntlayer } from "react-intlayer"
import { Link } from "react-router"
import { ROUTES_KEYS } from "../../../constants"

export const CallToAction = () => {
  const { title, description, signUpNow } = useIntlayer("cta")

  return (
    <Box
      sx={theme => ({
        py: { xs: 8, md: 10 },
        bgcolor: "background.level1",
        [theme.getColorSchemeSelector("dark")]: {
          bgcolor: "background.surface",
        },
      })}
    >
      <Container maxWidth="sm">
        <Stack sx={{ gap: 2, alignItems: "center", textAlign: "center" }}>
          <Typography
            component="h2"
            level="h3"
            sx={{
              fontWeight: 700,
              lineHeight: 1.2,
              fontSize: { xs: "1.25rem", sm: "1.5rem", md: "1.75rem" },
            }}
          >
            {title as unknown as string}
          </Typography>
          <Typography
            level="body-sm"
            sx={{
              color: "text.secondary",
              maxWidth: { xs: "100%", sm: 400 },
              lineHeight: 1.7,
            }}
          >
            {description as unknown as string}
          </Typography>
          <Button
            component={Link}
            to={ROUTES_KEYS.REGISTER}
            size="md"
            sx={{
              bgcolor: "#25D366",
              "&:hover": { bgcolor: "#128C7E" },
              px: 4,
              fontWeight: 600,
              borderRadius: "sm",
              mt: 1,
            }}
          >
            {signUpNow as unknown as string}
          </Button>
        </Stack>
      </Container>
    </Box>
  )
}
